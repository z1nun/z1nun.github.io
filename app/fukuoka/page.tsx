import type { Metadata } from "next";
import styles from "./fukuoka.module.css";
import {
  AIRLINES,
  SCENARIOS,
  GROUND,
  RENT_VERDICT,
  TIMELINE,
  FERRY_FACTS,
  PLAN_B,
} from "@/lib/fukuoka-data";

export const metadata: Metadata = {
  title: "후쿠오카 여행 계획 · 1/12 – 1/15",
  description: "후쿠오카 3박4일 — 교통편(비행기 vs 배) 예매 전략",
  openGraph: {
    title: "후쿠오카 여행 계획 🏯 1/12 – 1/15",
    description: "후쿠오카 3박4일 — 교통편(비행기 vs 배) 예매 전략",
  },
};

const VERDICT_CLASS: Record<string, string> = {
  추천: styles.vGood,
  조건부: styles.vMid,
  제외: styles.vBad,
};

export default function FukuokaPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.torii}>⛩⛩⛩</div>
        <h1>후쿠오카 여행 계획 🏯</h1>
        <div className={styles.sub}>
          2027년 1월 12일(화) → 1월 15일(금) · 3박 4일 · 춘천 출발
        </div>
      </header>

      <div className={styles.wrap}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>🧭 추천 전략 (한눈에)</div>
          <div className={styles.summaryBody}>
            <b>가는 편</b> 1/12 밤 부산발 카멜리아호 (선내 1박, 1/13 아침 하카타
            도착) · <b>오는 편</b> 1/15 저녁 비행기 후쿠오카 → 인천 ·{" "}
            <b>육로</b> 춘천→부산 기차, 인천공항→춘천 리무진.
            제주항공만 피하면 가격 순으로 골라도 안전 이력 문제 없음.
          </div>
        </div>

        <section>
          <h2>✈️ 항공사 고르기 — 안전 이력 기준</h2>
          <p className={styles.note}>
            기준: 인명피해(사망) 사고 이력. 조사일 2026-10-02.
          </p>
          <div className={styles.airlines}>
            {AIRLINES.map((a) => (
              <div key={a.name} className={styles.airline}>
                <div className={styles.airlineHead}>
                  <b>{a.name}</b>
                  <span className={`${styles.verdict} ${VERDICT_CLASS[a.verdict]}`}>
                    {a.verdict}
                  </span>
                </div>
                <div className={styles.airlineRoutes}>{a.routes}</div>
                <div className={styles.airlineSafety}>{a.safety}</div>
                <div className={styles.airlineNote}>{a.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>🚢 배편 팩트 체크</h2>
          <div className={styles.facts}>
            {FERRY_FACTS.map((f) => (
              <div key={f.title} className={styles.fact}>
                <b>{f.title}</b>
                {f.body}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>🗺 경로 시나리오 비교</h2>
          <div className={styles.scenarios}>
            {SCENARIOS.map((s) => (
              <div
                key={s.id}
                className={`${styles.scenario} ${s.badge ? styles.scenarioBest : ""}`}
              >
                <div className={styles.scenarioHead}>
                  <b>{s.title}</b>
                  {s.badge && <span className={styles.badge}>{s.badge}</span>}
                </div>
                <ol className={styles.legs}>
                  {s.legs.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ol>
                <div className={styles.cost}>{s.cost}</div>
                <div className={styles.prosCons}>
                  <div>
                    {s.pros.map((p) => (
                      <div key={p} className={styles.pro}>
                        + {p}
                      </div>
                    ))}
                  </div>
                  <div>
                    {s.cons.map((c) => (
                      <div key={c} className={styles.con}>
                        − {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>🚄 춘천에서 어떻게 가나</h2>
          <div className={styles.grounds}>
            {GROUND.map((g) => (
              <div key={g.route} className={styles.ground}>
                <div className={styles.groundHead}>
                  <b>{g.route}</b>
                  <span className={styles.groundMeta}>
                    {g.time} · {g.cost}
                  </span>
                </div>
                <div className={styles.groundNote}>{g.note}</div>
              </div>
            ))}
          </div>
          <div className={styles.warn}>
            <b>🚗 {RENT_VERDICT.title}</b>
            <ul>
              {RENT_VERDICT.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2>📅 예매 타임라인</h2>
          <div className={styles.timeline}>
            {TIMELINE.map((t) => (
              <div key={t.period} className={styles.step}>
                <div className={styles.stepPeriod}>{t.period}</div>
                <div className={styles.stepBody}>
                  <b>{t.title}</b>
                  <ul>
                    {t.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>⚠️ 겨울 결항 대비 (플랜 B)</h2>
          <ul className={styles.planB}>
            {PLAN_B.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>🗓 여행 일정</h2>
          <div className={styles.placeholder}>
            교통편 확정 후 날짜별 일정 + 코스 빌더가 여기에 들어갈 예정 ✍️
          </div>
        </section>

        <footer className={styles.footer}>
          가격·시간표는 조사일(2026-10-02) 기준 — 예매 시점에 다시 확인하기 🧡
        </footer>
      </div>
    </>
  );
}
