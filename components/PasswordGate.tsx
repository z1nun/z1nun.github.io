"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();

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

  // M6 cross-fade: children render on authed===true and fade in (mount ONCE,
  // no key change — AC-6). The gate overlay exits via AnimatePresence when
  // authed flips true. The fixed overlay (z-index 9999) stays above the content
  // during the ~0.3s overlap, so content cross-fades in beneath the exiting gate.
  // NO AnimatePresence mode="wait" (would serialize into an instant swap) — NIT-4.
  // null = nothing rendered (pre-localStorage check) — 3-state preserved.
  return (
    <>
      {authed === true &&
        (reduce ? (
          <>{children}</>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            {children}
          </motion.div>
        ))}

      <AnimatePresence>
        {authed === false && (
          <motion.div
            key="gate-overlay"
            className={styles.overlay}
            initial={false}
            exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* .card keeps its base translate(-50%,-50%) + shake keyframes.
                exit is opacity-only (no scale) so it never fights the centering. */}
            <motion.div
              className={`${styles.card} ${shaking ? styles.shake : ""}`}
              onAnimationEnd={() => setShaking(false)}
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.25 } }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
