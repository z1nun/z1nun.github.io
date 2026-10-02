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
  // null = 아직 localStorage 확인 전 (SSR/hydration 동안 콘텐츠 숨김 유지) — 3-state preserved
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  // 해제 직후 오버레이가 CSS 페이드아웃된 뒤 onAnimationEnd로 언마운트되도록 추적
  const [overlayLeaving, setOverlayLeaving] = useState(false);
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
      // reduced-motion: no fade-out animation → onAnimationEnd would never fire,
      // so skip the leaving state entirely (overlay unmounts at once).
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      setOverlayLeaving(!reduced);
      setAuthed(true);
    } else {
      setError("비밀번호가 달라요");
      setShaking(false);
      requestAnimationFrame(() => setShaking(true));
    }
  }

  // 3-state:
  //   null  → render NOTHING (pre-localStorage check; SSR/hydration guard)
  //   true  → children fade in (CSS @keyframes fadeIn, reduced-motion → instant)
  //   false → gate overlay (+ shake on wrong pw). On unlock, overlay fades out
  //           (overlayLeaving) then unmounts via onAnimationEnd.
  // The overlay (z-index 9999) stays above the content during the ~0.3s overlap,
  // so content cross-fades in beneath the exiting gate. No framer-motion.
  if (authed === null) return null;

  return (
    <>
      {authed === true && <div className={styles.fadeIn}>{children}</div>}

      {(authed === false || overlayLeaving) && (
        <div
          className={`${styles.overlay} ${
            overlayLeaving ? styles.overlayLeaving : ""
          }`}
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget && overlayLeaving)
              setOverlayLeaving(false);
          }}
        >
          {/* .card keeps its base translate(-50%,-50%) + shake keyframes. */}
          <div
            className={`${styles.card} ${shaking ? styles.shake : ""}`}
            onAnimationEnd={() => setShaking(false)}
          >
            <input
              ref={inputRef}
              type="password"
              aria-label="비밀번호"
              inputMode="numeric"
              maxLength={12}
              autoComplete="off"
              placeholder="····"
              onKeyDown={(e) => e.key === "Enter" && tryPassword()}
            />
            <button onClick={tryPassword}>열기</button>
            <div className={styles.error}>{error}</div>
          </div>
        </div>
      )}
    </>
  );
}
