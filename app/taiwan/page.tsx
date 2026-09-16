import type { Metadata } from "next";
import TaiwanPlanner from "@/components/TaiwanPlanner";
import styles from "./taiwan.module.css";

export const metadata: Metadata = {
  title: "대만 여행 계획 · 10/30 – 11/3",
  description: "타이베이 4박5일 — 날짜별 일정 + 스팟 골라서 내 코스 만들기",
  openGraph: {
    title: "대만 여행 계획 🇹🇼 10/30 – 11/3",
    description: "타이베이 4박5일 — 날짜별 일정 + 스팟 골라서 내 코스 만들기",
  },
};

const TIPS: { title: string; body: string }[] = [
  { title: "🚈 공항 ↔ 시내", body: "타오위안 공항철도(MRT) 직달차로 타이베이역까지 약 37분. 이지카드(悠遊卡)를 공항 편의점에서 사서 충전하면 MRT·버스 전부 해결." },
  { title: "🔌 콘센트 주의", body: "대만은 110V·A타입(11자 플러그). 한국 제품은 돼지코 어댑터 필수 — 다이소에서 미리 준비." },
  { title: "🌤 날씨 (10월 말~11월 초)", body: "대략 20~27℃로 걷기 좋은 시즌. 다만 비가 잦은 편이라 접이식 우산 필수. 지우펀은 안개·비가 특히 잦아요." },
  { title: "📶 유심/이심", body: "공항 도착층에서 유심 구매 가능(중화텔레콤 등), eSIM은 출발 전 미리 사두면 도착하자마자 개통." },
  { title: "💵 환전", body: "대만달러(TWD). 야시장·소규모 식당은 현금만 받는 곳 많음. 시내 ATM 트래블카드 출금도 편리." },
  { title: "🚌 근교 가는 법 (Day 3)", body: "예류→스펀→지우펀은 대중교통 환승이 번거로워서 당일 셔틀투어나 택시 대절이 효율적. 지우펀 홍등은 해질녘(17시 전후) 점등 — 오후 늦게 도착하도록 동선 짜기." },
];

export default function TaiwanPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.lanterns}>🏮🏮🏮</div>
        <h1>대만 여행 계획 🇹🇼</h1>
        <div className={styles.sub}>
          10월 30일(금) → 11월 3일(화) · 타이베이 4박 5일
        </div>
      </header>

      <div className={styles.wrap}>
        <div className={styles.flightCard}>
          <div className={styles.leg}>
            <div className={styles.legLabel}>✈️ 출국 · 10/30(금)</div>
            <div className={styles.legTime}>16:20 인천 → 18:10 타이베이</div>
            <div className={styles.legRoute}>도착 후 공항철도로 시내까지 약 40분</div>
          </div>
          <div className={styles.leg}>
            <div className={styles.legLabel}>🛬 귀국 · 11/3(화)</div>
            <div className={styles.legTime}>12:25 타이베이 → 15:50 인천</div>
            <div className={styles.legRoute}>늦어도 10:00에는 공항 도착</div>
          </div>
        </div>

        <TaiwanPlanner />

        <section>
          <h2>💡 여행 메모</h2>
          <div className={styles.tips}>
            {TIPS.map((t) => (
              <div key={t.title} className={styles.tip}>
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
    </>
  );
}
