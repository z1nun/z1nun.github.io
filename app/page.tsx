import LandingView, { type Plan } from "@/components/LandingView";

// Server component: holds the data, delegates all animated UI to the
// "use client" LandingView. No own metadata (inherits from layout.tsx).
const PLANS: Plan[] = [
  {
    href: "/fukuoka",
    emoji: "🏯",
    title: "후쿠오카 여행",
    desc: "3박 4일 — 교통편(비행기 vs 배) 예매 전략",
    date: "2027.01.12 – 01.15",
    startDate: "2027-01-12", // NON-RENDERED — only used to compute D-day
  },
  {
    href: "/taiwan",
    emoji: "🇹🇼",
    title: "대만 여행",
    desc: "타이베이 4박 5일 — 날짜별 일정 + 코스 빌더",
    date: "2026.10.30 – 11.03",
    startDate: "2026-10-30", // NON-RENDERED — only used to compute D-day
  },
  {
    href: "/wonju.html",
    emoji: "🏞",
    title: "원주 데이트",
    desc: "맛집 · 카페 · 놀거리 코스 만들기",
    date: "2026.09",
    legacy: true,
    // no startDate → legacy/past → renders no D-day
  },
];

export default function Home() {
  return <LandingView plans={PLANS} />;
}
