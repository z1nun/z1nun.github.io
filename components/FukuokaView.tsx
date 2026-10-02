"use client";

import styles from "@/app/fukuoka/fukuoka.module.css";
import {
  COST_ROWS,
  COST_TOTAL,
  OUTBOUND,
  OUT_FLIGHTS,
  RETURN_FLIGHTS,
  RETURN_STEPS,
  CAUTIONS,
  VJW,
  SPOT_CATEGORIES,
  SEASON_TIPS,
  type Flight,
  type Step,
} from "@/lib/fukuoka-data";
import ScrollFx from "@/components/ScrollFx";

// Left scroll-spy nav items (desktop) — order matches section ids s1..s6.
const NAV = [
  { id: "s1", n: "01", t: "총비용" },
  { id: "s2", n: "02", t: "가는 날" },
  { id: "s3", n: "03", t: "오는 날" },
  { id: "s4", n: "04", t: "주의사항" },
  { id: "s5", n: "05", t: "입국준비" },
  { id: "s6", n: "06", t: "갈만한 곳" },
  { id: "s7", n: "07", t: "일정" },
] as const;

// Single-left-rail vertical timeline (shared by 가는 날 / 오는 날).
function Timeline({ steps }: { steps: readonly Step[] }) {
  return (
    <ul className={`${styles.timeline} rv`}>
      {steps.map((s) => (
        <li key={s.title} className={styles.tItem}>
          <span className={styles.tNode} aria-hidden />
          <div className={styles.tContent}>
            <div className={styles.stepTime}>{s.time}</div>
            <div className={styles.stepBody}>
              <b>{s.title}</b>
              {s.body}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function FlightCards({ flights }: { flights: readonly Flight[] }) {
  return (
    <div className={styles.flights}>
      {flights.map((f) => (
        <div key={f.flight} className={styles.flight}>
          <div className={styles.flightHead}>
            <b>
              {f.airline} {f.flight}
            </b>
            {f.price1 && <span className={styles.flightPrice}>{f.price1}</span>}
          </div>
          <div className={styles.flightTime}>
            {f.dep} → {f.arr}
          </div>
          {f.note && <div className={styles.flightNote}>{f.note}</div>}
        </div>
      ))}
    </div>
  );
}

export default function FukuokaView() {
  return (
    <div className={styles.page}>
      <div id="pbar" className={`${styles.pbar} pbar`} aria-hidden />

      {/* left scroll-spy spine (desktop only; display:none < 1024px) */}
      <nav id="fukNav" className="nav" aria-label="섹션">
        {NAV.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            <span className="n">{item.n}</span>
            <span className="t">{item.t}</span>
          </a>
        ))}
      </nav>

      <header data-hero className={styles.hero}>
        <div className={styles.kicker}>FUKUOKA · 2027.01.12 — 01.15</div>
        <h1>후쿠오카 여행 계획 🏯</h1>
        <div className={styles.lead}>왕복 비행기로 가볍게 다녀오는 3박 4일</div>
      </header>

      <div className={styles.wrap}>
        <div className={`${styles.summaryCard} rv`}>
          <div className={styles.summaryLabel}>🧭 이동 루트</div>
          <div className={styles.summaryBody}>
            <b>춘천 ↔ 인천공항</b> 공항리무진 (첫차 04:00 / 귀가 17~18시 차편) ·{" "}
            <b>인천 ↔ 후쿠오카</b> 왕복 비행기 (가는 날 오전편 · 오는 날
            오후편) — 운전 없이 끝까지 대중교통
          </div>
        </div>

        <section id="s1" className="rv">
          <div className="sechead">
            <div className="secno">01</div>
            <div>
              <h2>💰 총 교통비 (1인)</h2>
              <div className="why">리무진 + 왕복 비행기 — 전부 더한 실비용.</div>
            </div>
          </div>
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

        <section id="s2" className="rv">
          <div className="sechead">
            <div className="secno">02</div>
            <div>
              <h2>🛫 1/12(화) — 가는 날</h2>
              <div className="why">첫차 리무진 → 오전 비행기 → 점심부터 Day 1.</div>
            </div>
          </div>
          <Timeline steps={OUTBOUND} />
          <p className={styles.note} style={{ marginTop: 12 }}>
            아침 출발편 후보 — 가격은 왕복 총액 기준으로 01 섹션 참고
          </p>
          <FlightCards flights={OUT_FLIGHTS} />
        </section>

        <section id="s3" className="rv">
          <div className="sechead">
            <div className="secno">03</div>
            <div>
              <h2>🛬 1/15(금) — 오는 날</h2>
              <div className="why">오후편 귀국 → 당일 춘천 귀가. 저녁편은 공항 1박 전제.</div>
            </div>
          </div>
          <Timeline steps={RETURN_STEPS} />
          <p className={styles.note} style={{ marginTop: 12 }}>
            귀국편 후보 — 당일 귀가 기준은 LJ456 (리무진 막차 ~22:30)
          </p>
          <FlightCards flights={RETURN_FLIGHTS} />
        </section>

        <section id="s4" className="rv">
          <div className="sechead">
            <div className="secno">04</div>
            <div>
              <h2>⚠️ 주의사항</h2>
              <div className="why">예매 전 꼭 확인할 것들.</div>
            </div>
          </div>
          <div className={styles.facts}>
            {CAUTIONS.map((c) => (
              <div key={c.title} className={styles.fact}>
                <b>{c.title}</b>
                {c.body}
              </div>
            ))}
          </div>
        </section>

        <section id="s5" className="rv">
          <div className="sechead">
            <div className="secno">05</div>
            <div>
              <h2>📱 입국 준비 — Visit Japan Web</h2>
              <div className="why">출발 전 미리 등록하면 입국이 빨라져요.</div>
            </div>
          </div>
          <div className={styles.vjw}>
            <div className={styles.vjwQrBox}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/vjw-qr.png"
                alt="Visit Japan Web 공식 사이트 QR"
                width={116}
                height={116}
                className={styles.vjwQr}
              />
              <div className={styles.vjwQrLabel}>폰 카메라로 스캔 → 바로 등록</div>
            </div>
            <div className={styles.vjwBody}>
              <ul className={styles.vjwPoints}>
                {VJW.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className={styles.vjwLinks}>
                {VJW.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </div>
              <div className={styles.vjwBlogs}>
                참고 글:{" "}
                {VJW.blogs.map((b, i) => (
                  <span key={b.url}>
                    {i > 0 && " · "}
                    <a href={b.url} target="_blank" rel="noreferrer">
                      {b.label}
                    </a>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="s6" className="rv">
          <div className="sechead">
            <div className="secno">06</div>
            <div>
              <h2>📍 갈만한 곳</h2>
              <div className="why">
                하카타 숙소 기준 — 이름을 누르면 구글맵이 열려요.
              </div>
            </div>
          </div>

          <div className={styles.facts} style={{ marginBottom: 20 }}>
            {SEASON_TIPS.map((t) => (
              <div key={t.title} className={styles.fact}>
                <b>{t.title}</b>
                {t.body}
              </div>
            ))}
          </div>

          {SPOT_CATEGORIES.map((cat) => (
            <div key={cat.key} className={styles.spotCat}>
              <h3 className={styles.spotCatTitle}>
                {cat.emoji} {cat.title}
                <span className={styles.spotCount}>{cat.spots.length}</span>
              </h3>
              {cat.tip && <p className={styles.spotTip}>{cat.tip}</p>}
              <div className={styles.spots}>
                {cat.spots.map((sp) => (
                  <div key={sp.name} className={`${styles.spot} rv`}>
                    <div className={styles.spotHead}>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sp.q)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {sp.name} ↗
                      </a>
                      <span className={styles.spotArea}>{sp.area}</span>
                    </div>
                    <div className={styles.spotDesc}>{sp.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section id="s7" className="rv">
          <div className="sechead">
            <div className="secno">07</div>
            <div>
              <h2>🗓 여행 일정</h2>
              <div className="why">항공권 확정 후 날짜별 코스가 들어갈 자리.</div>
            </div>
          </div>
          <div className={styles.placeholder}>
            항공권 확정 후 날짜별 일정 + 코스 빌더가 여기에 들어갈 예정 ✍️
          </div>
        </section>

        <footer className={styles.footer}>
          가격은 2026-10-02 조사 기준 — 예매 시점에 다시 확인하기 🧡
        </footer>
      </div>

      <ScrollFx
        barSelector="#pbar"
        navSelector="#fukNav a"
        sectionSelector="section[id]"
      />
    </div>
  );
}
