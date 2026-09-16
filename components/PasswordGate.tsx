"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PasswordGate.module.css";

// SHA-256("0602") — 소스에 평문 비밀번호를 남기지 않기 위해 해시로만 비교
const HASH = "32625be384ed05129315617a65f0b070e7b35a4257bdd11e0d98185c6f0cecfe";
// legacy 단일 HTML 페이지(wonju.html)와 인증을 공유하는 키
const KEY = "plan-auth-v1";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  // null = 아직 localStorage 확인 전 (SSR/hydration 동안 콘텐츠 숨김 유지)
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      setAuthed(localStorage.getItem(KEY) === HASH);
    } catch {
      setAuthed(false);
    }
  }, []);

  async function tryPassword() {
    const value = inputRef.current?.value.trim();
    if (!value) return;
    const hash = await sha256(value);
    if (hash === HASH) {
      try {
        localStorage.setItem(KEY, HASH);
      } catch {}
      setAuthed(true);
    } else {
      setError("비밀번호가 달라요");
      setShaking(false);
      requestAnimationFrame(() => setShaking(true));
    }
  }

  if (authed) return <>{children}</>;

  return (
    <div className={styles.overlay}>
      {authed === false && (
        <div
          className={`${styles.card} ${shaking ? styles.shake : ""}`}
          onAnimationEnd={() => setShaking(false)}
        >
          <div className={styles.emoji}>🏮</div>
          <h3>우리만 보는 페이지예요</h3>
          <p>비밀번호를 입력해 주세요</p>
          <input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            maxLength={12}
            autoComplete="off"
            placeholder="····"
            onKeyDown={(e) => e.key === "Enter" && tryPassword()}
          />
          <button onClick={tryPassword}>열기</button>
          <div className={styles.error}>{error}</div>
        </div>
      )}
    </div>
  );
}
