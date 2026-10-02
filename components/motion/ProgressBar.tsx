"use client";

import { useEffect, useRef } from "react";

/**
 * 상단 스크롤 진행바 — 페이지 테마색을 color로 받는다.
 * passive scroll 핸들러만 쓰는 3px fixed 바라서 레이아웃에 영향 없음.
 */
export default function ProgressBar({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      el.style.width = (p * 100).toFixed(2) + "%";
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: "0%",
        background: color,
        zIndex: 60,
        pointerEvents: "none",
      }}
    />
  );
}
