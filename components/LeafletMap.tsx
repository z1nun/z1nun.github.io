"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CATS, SPOTS, googleMapsUrl } from "@/lib/taiwan-data";

interface Props {
  /** 표시할 스팟 id 목록 (순서 = 방문 순서) */
  spotIds: string[];
}

// 타일 서버 체인: 오류가 잦으면 자동으로 다음 서버로 전환
const PROVIDERS = [
  { url: "https://tile.openstreetmap.de/{z}/{x}/{y}.png", attr: "&copy; OpenStreetMap" },
  { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", attr: "Tiles &copy; Esri" },
];

export default function LeafletMap({ spotIds }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const lineLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!boxRef.current || mapRef.current) return;
    const map = L.map(boxRef.current, { tap: true } as L.MapOptions).setView(
      [25.06, 121.55],
      12
    );
    let pi = 0;
    let tileErrs = 0;
    let tiles: L.TileLayer | null = null;
    function addTiles() {
      if (tiles) map.removeLayer(tiles);
      tileErrs = 0;
      const p = PROVIDERS[pi];
      tiles = L.tileLayer(p.url, { maxZoom: 19, attribution: p.attr });
      tiles.on("tileerror", () => {
        tileErrs++;
        if (tileErrs > 4 && pi < PROVIDERS.length - 1) {
          pi++;
          addTiles();
        }
      });
      tiles.addTo(map);
    }
    addTiles();
    markerLayerRef.current = L.layerGroup().addTo(map);
    lineLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const markerLayer = markerLayerRef.current;
    const lineLayer = lineLayerRef.current;
    if (!map || !markerLayer || !lineLayer) return;
    markerLayer.clearLayers();
    lineLayer.clearLayers();

    const pts: [number, number][] = [];
    spotIds.forEach((id, idx) => {
      const s = SPOTS[id];
      if (!s) return;
      pts.push(s.ll);
      const icon = L.divIcon({
        className: "",
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        html: `<div class="nmark" style="background:${CATS[s.cat].color}">${idx + 1}</div>`,
      });
      L.marker(s.ll, { icon })
        .bindPopup(
          `<strong>${s.name}</strong><br>${s.desc}<br><a href="${googleMapsUrl(s)}" target="_blank" rel="noopener">구글맵 길찾기</a>`
        )
        .bindTooltip(s.label, {
          permanent: true,
          direction: "top",
          offset: [0, -13],
          className: "spot-label",
        })
        .addTo(markerLayer);
    });

    if (pts.length >= 2) {
      L.polyline(pts, {
        color: "#c0392b",
        weight: 3,
        opacity: 0.65,
        dashArray: "6 8",
      }).addTo(lineLayer);
    }
    if (pts.length === 1) {
      map.setView(pts[0], 14);
    } else if (pts.length > 1) {
      map.fitBounds(L.latLngBounds(pts).pad(0.25));
    }
  }, [spotIds]);

  return <div ref={boxRef} style={{ height: 380, background: "#e9e4dc" }} />;
}
