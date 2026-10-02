"use client";

import { useEffect, useState } from "react";
import TaiwanPlanner from "@/components/TaiwanPlanner";
import styles from "@/app/taiwan/taiwan.module.css";
import { SPOTS } from "@/lib/taiwan-data";
import ScrollFx from "@/components/ScrollFx";

/* CRITICAL STRUCTURE PRESERVATION (AC-3 / AC-7):
   - .hero and .wrap are SIBLINGS in a fragment, each carrying the --tw-* block
     (declared on BOTH in taiwan.module.css). Do NOT collapse them.
   - <TaiwanPlanner/> renders BARE INSIDE .wrap (between .flightCard and TIPS).
     It inherits --tw-* ONLY via .wrap. No wrapper, no key change → mount-stable.
   - The #s2 scroll-spy marker is a zero-box SIBLING immediately BEFORE the
     planner (never a wrapper) so nav item 02 lights at the planner's scroll pos. */

// Hero-stat number EXTRACTED in the view (no new copy in lib): # of spots to see.
const SPOTS_COUNT = Object.keys(SPOTS).length; // 38

// Taiwan departure date — D-day computed POST-MOUNT (hydration-safe, no baked number).
const DEPART = "2026-10-30";

// Left scroll-spy nav items (desktop) — order matches spy targets s1 → s2 → s3.
const NAV = [
  { id: "s1", n: "01", t: "항공편" },
  { id: "s2", n: "02", t: "코스 짜기" },
  { id: "s3", n: "03", t: "여행 메모" },
] as const;

export default function TaiwanView({
  tips,
}: {
  tips: { title: string; body: string }[];
}) {
  // D-day as a static big number set post-mount (no count-up — protects the
  // hydration-safe guarantee; the big-number treatment comes from CSS size/weight).
  const [dday, setDday] = useState<number | null>(null);
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(DEPART + "T00:00:00");
    setDday(Math.ceil((start.getTime() - today.getTime()) / 86400000));
  }, []);

  const ddayText =
    dday === null ? "" : dday > 0 ? String(dday) : dday === 0 ? "DAY" : "출발";

  return (
    <>
      <div id="pbar" className={`${styles.pbar} pbar`} aria-hidden />

      {/* left scroll-spy spine (desktop only; display:none < 1024px) */}
      <nav id="twNav" className={`${styles.nav} nav`} aria-label="섹션">
        {NAV.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            <span className="n">{item.n}</span>
            <span className="t">{item.t}</span>
          </a>
        ))}
      </nav>

      {/* hero: above-the-fold. data-hero → ScrollFx fires its count-up on mount.
          className preserved → --tw-* applies. */}
      <header data-hero className={styles.hero}>
        <div className={styles.lanterns}>🏮🏮🏮</div>
        <div className={styles.kicker}>TAIPEI · 2026.10.30 — 11.03</div>
        <h1>대만 여행 계획 🇹🇼</h1>
        <div className={styles.lead}>
          10월 30일(금) → 11월 3일(화) · 타이베이 4박 5일
        </div>
        <div className="stats">
          <div>
            {/* D-day: static post-mount number, NO count-up (hydration-safe) */}
            <span className="statNum">
              {dday !== null && dday > 0 && <em>D-</em>}
              {ddayText || " "}
            </span>
            <div className="statCap">출발까지</div>
          </div>
          <div>
            <span className="statNum">
              <span className="statNum" data-count={String(SPOTS_COUNT)}>
                0
              </span>
            </span>
            <div className="statCap">둘러볼 스팟</div>
          </div>
          <div>
            <span className="statNum">
              <span className="statNum" data-count="5">
                0
              </span>
            </span>
            <div className="statCap">4박 5일</div>
          </div>
        </div>
      </header>

      <div className={styles.wrap}>
        {/* two-leg flight visual: departure → connector → arrival. -16px tuck preserved. */}
        <section id="s1" data-spy className={`${styles.flightCardSection} rv`}>
          <div className="sechead">
            <div className="secno">01</div>
            <div>
              <h2>✈️ 항공편</h2>
              <div className="why">
                인천 ↔ 타이베이 · 출국/귀국 시간 한눈에.
              </div>
            </div>
          </div>
          <div className={styles.flightCard}>
            <div className={styles.leg}>
              <div className={styles.legLabel}>✈️ 출국 · 10/30(금)</div>
              <div className={styles.legTime}>16:20 인천 → 18:10 타이베이</div>
              <div className={styles.legRoute}>도착 후 공항철도로 시내까지 약 40분</div>
            </div>
            <span className={styles.legConnector} aria-hidden>
              →
            </span>
            <div className={styles.leg}>
              <div className={styles.legLabel}>🛬 귀국 · 11/3(화)</div>
              <div className={styles.legTime}>12:25 타이베이 → 15:50 인천</div>
              <div className={styles.legRoute}>늦어도 10:00에는 공항 도착</div>
            </div>
          </div>
        </section>

        {/* zero-box scroll-spy marker — SIBLING before the planner (never a wrapper, AC-7) */}
        <div id="s2" data-spy aria-hidden />

        {/* INVIOLABLE — inside .wrap, bare, unchanged (AC-7) */}
        <TaiwanPlanner />

        <section id="s3" className="rv" data-spy>
          <div className="sechead">
            <div className="secno">03</div>
            <div>
              <h2>💡 여행 메모</h2>
              <div className="why">
                콘센트·교통·환전 — 챙겨두면 편한 것들.
              </div>
            </div>
          </div>
          <div className={styles.tips}>
            {tips.map((t, i) => (
              <div
                key={t.title}
                className={`${styles.tip} rv`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <b>{t.title}</b>
                {t.body}
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          대만 여행 계획 · 영업시간·교통편은 출발 전 다시 확인하기 🧡
        </footer>
      </div>

      {/* spy targets: #s1 (flight), #s2 (planner marker), #s3 (tips) — all carry
          data-spy in document order, matching nav 01/02/03 (NIT-9). The spy loop
          takes the LAST target with top<40%vh, so scrolling past the zero-box #s2
          correctly advances to #s3. */}
      <ScrollFx
        barSelector="#pbar"
        navSelector="#twNav a"
        sectionSelector="[data-spy]"
      />
    </>
  );
}
