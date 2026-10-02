import type { Metadata } from "next";
import TaiwanView from "@/components/TaiwanView";

// Server component: keeps metadata + the TIPS literal, delegates the animated
// body to the "use client" TaiwanView.
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
  return <TaiwanView tips={TIPS} />;
}
