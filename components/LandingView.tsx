"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/app/home.module.css";
import { Reveal, RevealGroup, RevealItem, MotionCard } from "@/components/motion/Reveal";
import ProgressBar from "@/components/motion/ProgressBar";

export interface Plan {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  date: string;
  /** Next 라우트가 아닌 정적 파일(legacy 단일 HTML) 여부 */
  legacy?: boolean;
  /** NON-RENDERED ISO "YYYY-MM-DD" — used only to compute D-day, never shown as text. */
  startDate?: string;
}

// href → per-trip theme-band modifier class (keeps band color in CSS).
function bandClass(href: string): string {
  switch (href) {
    case "/fukuoka":
      return styles.bandFukuoka;
    case "/taiwan":
      return styles.bandTaiwan;
    case "/wonju.html":
      return styles.bandWonju;
    default:
      return styles.bandWonju;
  }
}

// D-day number → chip label. undefined (pre-mount) / null (no startDate) / <0 (past)
// all render nothing; >0 → "D-{n}"; 0 → "D-DAY".
function ddayLabel(n: number | null | undefined): string | null {
  if (n === undefined || n === null) return null;
  if (n < 0) return null;
  if (n === 0) return "D-DAY";
  return `D-${n}`;
}

export default function LandingView({ plans }: { plans: Plan[] }) {
  // D-day computed POST-MOUNT only (useEffect) so the static-export HTML bakes
  // no stale number and there is no hydration mismatch (AC-14). Empty record at
  // first paint → ddayLabel(undefined) → nothing rendered in the reserved slot.
  const [ddays, setDdays] = useState<Record<string, number | null>>({});

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const next: Record<string, number | null> = {};
    for (const p of plans) {
      if (!p.startDate) {
        next[p.href] = null; // legacy/past → no D-day
        continue;
      }
      const start = new Date(p.startDate + "T00:00:00");
      const diff = Math.ceil((start.getTime() - today.getTime()) / 86400000);
      next[p.href] = diff; // may be <= 0 for past trips (ddayLabel guards it)
    }
    setDdays(next);
  }, [plans]);

  return (
    <main className={styles.main}>
      <ProgressBar color="#b5623a" />
      <Reveal immediate as="header" className={styles.hero}>
        <div className={styles.kicker}>TRIP INDEX · 2026 — 2027</div>
        <h1>계획 🗂</h1>
      </Reveal>

      {/* first card group is above-the-fold → immediate (mount entrance), staggered */}
      <RevealGroup immediate as="ul" className={styles.list}>
        {plans.map((p) => (
          <RevealItem as="li" key={p.href} className={styles.listItem}>
            <MotionCard>
              {p.legacy ? (
                // legacy 단일 HTML은 Next 라우터를 거치지 않는 정적 파일
                <a href={p.href} className={styles.card}>
                  <CardInner plan={p} label={ddayLabel(ddays[p.href])} />
                </a>
              ) : (
                <Link href={p.href} className={styles.card}>
                  <CardInner plan={p} label={ddayLabel(ddays[p.href])} />
                </Link>
              )}
            </MotionCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </main>
  );
}

function CardInner({ plan, label }: { plan: Plan; label: string | null }) {
  return (
    <>
      <span className={`${styles.band} ${bandClass(plan.href)}`} aria-hidden />
      <div className={styles.content}>
        <div className={styles.emoji}>{plan.emoji}</div>
        <div className={styles.title}>{plan.title}</div>
        <div className={styles.desc}>{plan.desc}</div>
        <div className={styles.meta}>
          <span className={styles.date}>{plan.date}</span>
          <span className={styles.dday}>
            {label && <span className={styles.ddayVal}>{label}</span>}
          </span>
        </div>
      </div>
      <span className={styles.arrow}>›</span>
    </>
  );
}
