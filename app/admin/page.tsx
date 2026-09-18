"use client";

import { useState } from "react";
import styles from "./admin.module.css";

interface Endpoint {
  path: string;
  emoji: string;
  title: string;
  desc: string;
  /** 접근 보호 방식 */
  access: "password" | "secret";
  /** Next 라우트가 아닌 정적 파일 여부 */
  legacy?: boolean;
}

const ENDPOINTS: Endpoint[] = [
  {
    path: "/",
    emoji: "🗂",
    title: "홈",
    desc: "여행·데이트 계획 모음",
    access: "password",
  },
  {
    path: "/taiwan",
    emoji: "🇹🇼",
    title: "대만 여행",
    desc: "타이베이 4박 5일 — 날짜별 일정 + 코스 빌더",
    access: "password",
  },
  {
    path: "/wonju.html",
    emoji: "🏞",
    title: "원주 데이트",
    desc: "맛집 · 카페 · 놀거리 코스",
    access: "password",
    legacy: true,
  },
  {
    path: "/skin",
    emoji: "🧴",
    title: "스킨케어 루틴",
    desc: "주간 루틴표 + 사용 제품 선반",
    access: "secret",
    legacy: true,
  },
  {
    path: "/admin",
    emoji: "🛠",
    title: "관리자 (현재 페이지)",
    desc: "전체 엔드포인트 목록",
    access: "password",
  },
];

export default function Admin() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyUrl(path: string) {
    const url = window.location.origin + path;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(path);
      setTimeout(() => setCopied((c) => (c === path ? null : c)), 1600);
    } catch {
      prompt("복사해서 사용하세요:", url);
    }
  }

  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <h1>🛠 관리자</h1>
        <p>배포된 전체 페이지 목록 — 이 페이지는 어디에도 링크돼 있지 않아요</p>
      </header>

      <div className={styles.legend}>
        <span className={styles.badgePw}>🔒 비밀번호</span> 게이트 통과 필요 ·{" "}
        <span className={styles.badgeSecret}>🔗 시크릿</span> 주소를 아는 사람만
      </div>

      <div className={styles.list}>
        {ENDPOINTS.map((ep) => (
          <div key={ep.path} className={styles.card}>
            <div className={styles.emoji}>{ep.emoji}</div>
            <div className={styles.body}>
              <div className={styles.titleRow}>
                <span className={styles.title}>{ep.title}</span>
                <span
                  className={
                    ep.access === "password"
                      ? styles.badgePw
                      : styles.badgeSecret
                  }
                >
                  {ep.access === "password" ? "🔒 비밀번호" : "🔗 시크릿"}
                </span>
              </div>
              <div className={styles.desc}>{ep.desc}</div>
              <code className={styles.path}>{ep.path}</code>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.copyBtn}
                onClick={() => copyUrl(ep.path)}
              >
                {copied === ep.path ? "복사됨 ✓" : "링크 복사"}
              </button>
              <a className={styles.openBtn} href={ep.path}>
                열기
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className={styles.note}>
        이 사이트는 공개 배포지만 홈·대만·원주는 비밀번호 게이트, 나머지는
        비공개 주소로만 접근돼요. 새 페이지를 추가하면 이 목록도 함께
        업데이트하세요.
      </p>
    </main>
  );
}
