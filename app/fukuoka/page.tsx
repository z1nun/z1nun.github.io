import type { Metadata } from "next";
import styles from "./fukuoka.module.css";
import {
  COST_ROWS,
  COST_TOTAL,
  OUTBOUND,
  ARRIVAL,
  FLIGHTS,
  RETURN_STEPS,
  CAUTIONS,
} from "@/lib/fukuoka-data";

export const metadata: Metadata = {
  title: "후쿠오카 여행 계획 · 1/12 – 1/15",
  description: "후쿠오카 3박4일 — 페리 + 비행기 교통 가이드",
  openGraph: {
    title: "후쿠오카 여행 계획 🏯 1/12 – 1/15",
    description: "후쿠오카 3박4일 — 페리 + 비행기 교통 가이드",
  },
};

export default function FukuokaPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.torii}>⛩⛩⛩</div>
        <h1>후쿠오카 여행 계획 🏯</h1>
        <div className={styles.sub}>
          2027년 1월 12일(화) → 1월 15일(금) · 3박 4일
        </div>
      </header>

      <div className={styles.wrap}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>🧭 이동 루트</div>
          <div className={styles.summaryBody}>
            <b>가는 편</b> 1/12 밤 부산발 카멜리아 페리 (선내 1박 → 13일 아침
            하카타 도착) · <b>오는 편</b> 1/15 저녁 비행기 인천행 → 리무진
            귀가
          </div>
        </div>

        <section>
          <h2>💰 총 교통비 (1인)</h2>
          <div className={styles.costCard}>
            {COST_ROWS.map((r) => (
              <div key={r.item} className={styles.costRow}>
                <div className={styles.costItem}>
                  <b>{r.item}</b>
                  <span className={styles.costDetail}>{r.detail}</span>
                </div>
                <div className={styles.costRight}>
                  <div className={styles.costPrice}>{r.cost}</div>
                  <div className={styles.costTime}>⏱ {r.time}</div>
                </div>
              </div>
            ))}
            <div className={styles.costTotal}>
              <span>합계</span>
              <div className={styles.costRight}>
                <b>{COST_TOTAL.total}</b>
                <div className={styles.costTime}>⏱ {COST_TOTAL.time}</div>
              </div>
            </div>
            <div className={styles.costTimeTotal}>⏱ {COST_TOTAL.totalTime}</div>
            <div className={styles.costNote}>{COST_TOTAL.note}</div>
          </div>
        </section>

        <section>
          <h2>🚄 1/12(화) — 가는 길</h2>
          <div className={styles.steps}>
            {OUTBOUND.map((s) => (
              <div key={s.title} className={styles.step}>
                <div className={styles.stepTime}>{s.time}</div>
                <div className={styles.stepBody}>
                  <b>{s.title}</b>
                  {s.body}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>⛴ 1/13(수) — 하카타항 도착 후</h2>
          <div className={styles.steps}>
            {ARRIVAL.map((s) => (
              <div key={s.title} className={styles.step}>
                <div className={styles.stepTime}>{s.time}</div>
                <div className={styles.stepBody}>
                  <b>{s.title}</b>
                  {s.body}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>✈️ 1/15(금) — 오는 길</h2>
          <p className={styles.note}>
            이코노미 성인 1인 총액 (제주항공 제외) · 2026-10-02 검색 최저가 약 16만원 · 2인은 ×2
          </p>
          <div className={styles.flights}>
            {FLIGHTS.map((f) => (
              <div key={f.flight} className={styles.flight}>
                <div className={styles.flightHead}>
                  <b>
                    {f.airline} {f.flight}
                  </b>
                  <span className={styles.flightPrice}>{f.price1}</span>
                </div>
                <div className={styles.flightTime}>
                  {f.dep} → {f.arr}
                </div>
                {f.note && <div className={styles.flightNote}>{f.note}</div>}
              </div>
            ))}
          </div>
          <div className={styles.steps}>
            {RETURN_STEPS.map((s) => (
              <div key={s.title} className={styles.step}>
                <div className={styles.stepTime}>{s.time}</div>
                <div className={styles.stepBody}>
                  <b>{s.title}</b>
                  {s.body}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>⚠️ 주의사항</h2>
          <div className={styles.facts}>
            {CAUTIONS.map((c) => (
              <div key={c.title} className={styles.fact}>
                <b>{c.title}</b>
                {c.body}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>🗓 여행 일정</h2>
          <div className={styles.placeholder}>
            교통편 확정 후 날짜별 일정 + 코스 빌더가 여기에 들어갈 예정 ✍️
          </div>
        </section>

        <footer className={styles.footer}>
          가격은 2026-10-02 조사 기준 — 예매 시점에 다시 확인하기 🧡
        </footer>
      </div>
    </>
  );
}
