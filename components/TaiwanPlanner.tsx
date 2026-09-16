"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./TaiwanPlanner.module.css";
import {
  CATS,
  SPOTS,
  DAY_META,
  DEFAULT_DAYS,
  STORAGE_KEY,
  googleMapsUrl,
  encodeDays,
  decodeDays,
  type CategoryKey,
} from "@/lib/taiwan-data";

// Leaflet은 window에 의존 → 클라이언트에서만 로드
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className={styles.mapLoading}>
      📍 지도를 불러오는 중… (카카오톡 미리보기에서는 지도가 안 떠요 — 아래
      표의 구글맵 링크를 이용하세요)
    </div>
  ),
});

function haversine(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a[0] * Math.PI) / 180) *
      Math.cos((b[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function loadDays(): string[][] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (Array.isArray(saved) && saved.length === 5) {
      return saved.map((arr: string[]) => arr.filter((id) => SPOTS[id]));
    }
  } catch {}
  return DEFAULT_DAYS.map((a) => [...a]);
}

export default function TaiwanPlanner() {
  const [days, setDays] = useState<string[][]>(() =>
    DEFAULT_DAYS.map((a) => [...a])
  );
  const [activeDay, setActiveDay] = useState(0);
  const [resetArmed, setResetArmed] = useState(false);
  // 공유 링크(?c=)로 열었을 때: 내 저장 일정을 덮어쓰지 않고 보기 모드로
  const [sharedView, setSharedView] = useState(false);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // localStorage·URL은 클라이언트 전용 → 마운트 후 복원
  useEffect(() => {
    const c = new URLSearchParams(location.search).get("c");
    const shared = c ? decodeDays(c) : null;
    if (shared) {
      setDays(shared);
      setSharedView(true);
    } else {
      setDays(loadDays());
    }
  }, []);

  function clearShareParam() {
    history.replaceState(null, "", location.pathname);
  }

  function update(next: string[][]) {
    setDays(next);
    // 공유 보기 모드에서는 메모리만 — [내 일정으로 저장]을 눌러야 저장됨
    if (sharedView) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function saveSharedAsMine() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
    } catch {}
    setSharedView(false);
    clearShareParam();
  }

  function viewMyPlan() {
    setDays(loadDays());
    setSharedView(false);
    clearShareParam();
  }

  function copyShareLink() {
    const url =
      location.origin + location.pathname + "?c=" + encodeDays(days);
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
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

  const dayArr = days[activeDay];

  function toggleSpot(id: string) {
    const next = days.map((a) => [...a]);
    const arr = next[activeDay];
    const i = arr.indexOf(id);
    if (i === -1) arr.push(id);
    else arr.splice(i, 1);
    update(next);
  }

  function move(idx: number, dir: -1 | 1) {
    const next = days.map((a) => [...a]);
    const arr = next[activeDay];
    const [item] = arr.splice(idx, 1);
    arr.splice(idx + dir, 0, item);
    update(next);
  }

  function remove(idx: number) {
    const next = days.map((a) => [...a]);
    next[activeDay].splice(idx, 1);
    update(next);
  }

  function reset() {
    if (resetArmed) {
      update(DEFAULT_DAYS.map((a) => [...a]));
      setResetArmed(false);
    } else {
      setResetArmed(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setResetArmed(false), 2500);
    }
  }

  const stats = useMemo(() => {
    if (dayArr.length < 2) {
      return dayArr.length === 1 ? "스팟을 하나 더 추가하면 동선이 그려져요" : "";
    }
    const pts = dayArr.map((id) => SPOTS[id].ll);
    let dist = 0;
    for (let i = 1; i < pts.length; i++) dist += haversine(pts[i - 1], pts[i]);
    return `${DAY_META[activeDay].d} · ${dayArr.length}곳 · 직선거리 합 약 ${dist.toFixed(1)}km`;
  }, [dayArr, activeDay]);

  return (
    <>
      {sharedView && (
        <div className={styles.sharedBanner}>
          <span>
            🔗 <b>공유받은 일정</b>을 보는 중이에요 — 저장하기 전엔 내 일정을
            건드리지 않아요
          </span>
          <div className={styles.sharedBtns}>
            <button className={styles.sharedSave} onClick={saveSharedAsMine}>
              내 일정으로 저장
            </button>
            <button className={styles.sharedMine} onClick={viewMyPlan}>
              내 일정 보기
            </button>
          </div>
        </div>
      )}

      {/* ===== 날짜별 일정 ===== */}
      <section>
        <h2>🗓 날짜별 일정</h2>
        <p className={styles.hint}>
          날짜를 고르고, 아래 <b>스팟 키워드</b>를 누르면 그 날 일정에 추가돼요.
          ▲▼로 순서 변경, ×로 제거.
        </p>
        <div className={styles.dayTabs}>
          {DAY_META.map((m, i) => (
            <div
              key={m.d}
              className={`${styles.dayTab} ${i === activeDay ? styles.on : ""}`}
              onClick={() => setActiveDay(i)}
            >
              <div className={styles.dayTabD}>{m.d}</div>
              <div className={styles.dayTabDt}>
                {m.dt} · {days[i].length}곳
              </div>
            </div>
          ))}
        </div>
        <div className={styles.dayNote}>{DAY_META[activeDay].note}</div>
        {dayArr.length === 0 ? (
          <div className={styles.emptyDay}>
            아직 비어 있어요 — 아래 스팟 키워드를 눌러 채워보세요
          </div>
        ) : (
          <ul className={styles.dayList}>
            {dayArr.map((id, idx) => {
              const s = SPOTS[id];
              return (
                <li key={id}>
                  <div
                    className={styles.num}
                    style={{ background: CATS[s.cat].color }}
                  >
                    {idx + 1}
                  </div>
                  <div className={styles.itemBody}>
                    <div className={styles.itemName}>{s.name}</div>
                    <div className={styles.itemDesc}>
                      {s.desc} ·{" "}
                      <a href={googleMapsUrl(s)} target="_blank" rel="noopener noreferrer">
                        구글맵
                      </a>
                    </div>
                  </div>
                  <div className={styles.ctl}>
                    <button disabled={idx === 0} onClick={() => move(idx, -1)}>▲</button>
                    <button disabled={idx === dayArr.length - 1} onClick={() => move(idx, 1)}>▼</button>
                    <button className={styles.rm} onClick={() => remove(idx)}>×</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* ===== 스팟 풀 ===== */}
      <section>
        <h2>🧩 스팟 고르기</h2>
        {(Object.keys(CATS) as CategoryKey[]).map((catKey) => (
          <div key={catKey} className={styles.chipGroup}>
            <div className={styles.chipGroupTitle}>{CATS[catKey].title}</div>
            <div className={styles.chips}>
              {Object.entries(SPOTS)
                .filter(([, s]) => s.cat === catKey)
                .map(([id, s]) => {
                  const on = dayArr.includes(id);
                  return (
                    <div
                      key={id}
                      className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                      style={
                        on
                          ? {
                              background: CATS[catKey].color,
                              borderColor: CATS[catKey].color,
                            }
                          : undefined
                      }
                      onClick={() => toggleSpot(id)}
                    >
                      {s.label}
                      {on && <span className={styles.check}> ✓</span>}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
        <div className={styles.resetRow}>
          <button className={styles.shareBtn} onClick={copyShareLink}>
            {copied ? "복사됨! 카톡에 붙여넣으세요" : "🔗 일정 공유 링크 복사"}
          </button>
          <button
            className={`${styles.resetBtn} ${resetArmed ? styles.resetArmed : ""}`}
            onClick={reset}
          >
            {resetArmed ? "한 번 더 누르면 초기화돼요" : "전체 초기화"}
          </button>
        </div>
      </section>

      {/* ===== 지도 ===== */}
      <section>
        <h2>🗺 오늘의 동선</h2>
        <div className={styles.mapBox}>
          <LeafletMap spotIds={dayArr} />
        </div>
        <div className={styles.courseStats}>{stats}</div>
        <p className={styles.mapNote}>
          마커 위치는 대략적이에요 — 정확한 길찾기는 마커 팝업이나 아래 표의{" "}
          <b>구글맵</b> 링크로.
        </p>
      </section>

      {/* ===== 스팟 정리 ===== */}
      <section>
        <h2>📍 스팟 정리</h2>
        <p className={styles.hint}>
          영업시간은 변동될 수 있어요 — 방문 전 구글맵에서 당일 확인 추천.
        </p>
        <div className={styles.tblWrap}>
          <table>
            <thead>
              <tr>
                <th>구분</th><th>이름</th><th>위치</th><th>포인트</th><th>링크</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(CATS) as CategoryKey[]).flatMap((catKey) =>
                Object.entries(SPOTS)
                  .filter(([, s]) => s.cat === catKey)
                  .map(([id, s]) => (
                    <tr key={id}>
                      <td className={styles.catCell}>
                        {CATS[catKey].title.split(" ")[0]}
                      </td>
                      <td>
                        <b>{s.name}</b>
                        <div className={styles.zh}>{s.zh}</div>
                      </td>
                      <td>{s.area}</td>
                      <td>{s.desc}</td>
                      <td>
                        <a href={googleMapsUrl(s)} target="_blank" rel="noopener noreferrer">
                          구글맵
                        </a>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
