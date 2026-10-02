"use client";

import TaiwanPlanner from "@/components/TaiwanPlanner";
import styles from "@/app/taiwan/taiwan.module.css";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import ProgressBar from "@/components/motion/ProgressBar";

/* CRITICAL STRUCTURE PRESERVATION (AC-3 / AC-7):
   - .hero and .wrap are SIBLINGS in a fragment, each carrying the --tw-* block
     (declared on BOTH in taiwan.module.css). Do NOT collapse them.
   - <TaiwanPlanner/> renders BARE INSIDE .wrap (between .flightCard and TIPS).
     It inherits --tw-* ONLY via .wrap. No wrapper, no key change, no
     AnimatePresence around it → mount-stable (course/?c=/localStorage intact).
   - .wrap stays a plain <div> (NOT a motion container); only its children get Reveal. */
export default function TaiwanView({
  tips,
}: {
  tips: { title: string; body: string }[];
}) {
  return (
    <>
      {/* hero: above-the-fold → mount entrance (M2). className preserved → --tw-* applies. */}
      <ProgressBar color="#c0392b" />
      <Reveal immediate as="header" className={styles.hero}>
        <div className={styles.lanterns}>🏮🏮🏮</div>
        <div className={styles.kicker}>TAIPEI · 2026.10.30 — 11.03</div>
        <h1>대만 여행 계획 🇹🇼</h1>
        <div className={styles.sub}>
          10월 30일(금) → 11월 3일(화) · 타이베이 4박 5일
        </div>
      </Reveal>

      <div className={styles.wrap}>
        {/* two-leg flight visual: departure → connector → arrival. -16px tuck preserved. */}
        <Reveal className={styles.flightCard}>
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
        </Reveal>

        {/* INVIOLABLE — inside .wrap, bare, unchanged (AC-7) */}
        <TaiwanPlanner />

        <Reveal as="section">
          <h2>💡 여행 메모</h2>
          <RevealGroup className={styles.tips}>
            {tips.map((t) => (
              <RevealItem key={t.title} className={styles.tip}>
                <b>{t.title}</b>
                {t.body}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <footer className={styles.footer}>
          대만 여행 계획 · 영업시간·교통편은 출발 전 다시 확인하기 🧡
        </footer>
      </div>
    </>
  );
}
