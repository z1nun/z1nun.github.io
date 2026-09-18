import Link from "next/link";
import styles from "./home.module.css";

interface Plan {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  date: string;
  /** Next 라우트가 아닌 정적 파일(legacy 단일 HTML) 여부 */
  legacy?: boolean;
}

const PLANS: Plan[] = [
  {
    href: "/taiwan",
    emoji: "🇹🇼",
    title: "대만 여행",
    desc: "타이베이 4박 5일 — 날짜별 일정 + 코스 빌더",
    date: "2026.10.30 – 11.03",
  },
  {
    href: "/wonju.html",
    emoji: "🏞",
    title: "원주 데이트",
    desc: "맛집 · 카페 · 놀거리 코스 만들기",
    date: "2026.09",
    legacy: true,
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <h1>계획 🗂</h1>
        <p>우리의 여행·데이트 계획 모음</p>
      </header>
      <div className={styles.list}>
        {PLANS.map((p) =>
          p.legacy ? (
            // legacy 단일 HTML은 Next 라우터를 거치지 않는 정적 파일
            <a key={p.href} href={p.href} className={styles.card}>
              <PlanCardBody plan={p} />
            </a>
          ) : (
            <Link key={p.href} href={p.href} className={styles.card}>
              <PlanCardBody plan={p} />
            </Link>
          )
        )}
      </div>
    </main>
  );
}

function PlanCardBody({ plan }: { plan: Plan }) {
  return (
    <>
      <div className={styles.emoji}>{plan.emoji}</div>
      <div className={styles.body}>
        <div className={styles.title}>{plan.title}</div>
        <div className={styles.desc}>{plan.desc}</div>
        <div className={styles.date}>{plan.date}</div>
      </div>
      <div className={styles.arrow}>›</div>
    </>
  );
}
