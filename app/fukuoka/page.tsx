import type { Metadata } from "next";
import FukuokaView from "@/components/FukuokaView";

// Server component: keeps metadata + delegates the animated body to the
// "use client" FukuokaView (which carries the styles.page theme wrapper).
export const metadata: Metadata = {
  title: "후쿠오카 여행 계획 · 1/12 – 1/15",
  description: "후쿠오카 3박4일 — 페리 + 비행기 교통 가이드",
  openGraph: {
    title: "후쿠오카 여행 계획 🏯 1/12 – 1/15",
    description: "후쿠오카 3박4일 — 페리 + 비행기 교통 가이드",
  },
};

export default function FukuokaPage() {
  return <FukuokaView />;
}
