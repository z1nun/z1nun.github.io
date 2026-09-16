"use client";

import { useEffect, useState } from "react";

// 카카오톡 인앱 브라우저 → 기본 브라우저 전환 (자동 시도 + 버튼 배너)
export default function KakaoEscape() {
  const [inKakao, setInKakao] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (!/KAKAOTALK/i.test(ua) || location.protocol === "file:") return;
    setInKakao(true);
    setIsIOS(/iphone|ipad|ipod/i.test(ua));
    // 자동 전환 시도 (최신 카톡은 막힐 수 있음 → 배너가 폴백)
    const t = setTimeout(escapeNow, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function target() {
    return location.href.split("#")[0];
  }

  function escapeNow() {
    const url = target();
    if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      location.href = "kakaotalk://web/openExternal?url=" + encodeURIComponent(url);
    } else {
      location.href =
        "intent://" + location.host + location.pathname + location.search +
        "#Intent;scheme=https;S.browser_fallback_url=" + encodeURIComponent(url) + ";end";
    }
  }

  function copyLink() {
    const url = target();
    const done = () => setCopied(true);
    const fallback = () => {
      const inp = document.createElement("input");
      inp.value = url;
      document.body.appendChild(inp);
      inp.select();
      try {
        document.execCommand("copy");
        done();
      } catch {}
      document.body.removeChild(inp);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  if (!inKakao) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
        background: "#1f3329",
        color: "#fff",
        padding: "10px 14px",
        fontSize: 13,
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexWrap: "wrap",
        boxShadow: "0 2px 8px rgba(0,0,0,.25)",
      }}
    >
      <span style={{ flex: 1, minWidth: 150, lineHeight: 1.4 }}>
        카톡 브라우저예요 — 지도는 기본 브라우저에서 더 잘 돼요
      </span>
      <button
        onClick={escapeNow}
        style={{
          background: "#fff",
          color: "#1f3329",
          border: "none",
          borderRadius: 8,
          padding: "9px 14px",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        {isIOS ? "Safari로 열기" : "브라우저로 열기"}
      </button>
      <button
        onClick={copyLink}
        style={{
          background: "rgba(255,255,255,.18)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "9px 12px",
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        {copied ? "복사됨!" : "링크 복사"}
      </button>
    </div>
  );
}
