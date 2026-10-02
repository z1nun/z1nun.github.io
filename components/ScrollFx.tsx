"use client";

import { useEffect } from "react";
import "./scrollfx.css";

/* ============================================================
   ScrollFx — the ONE vanilla-JS engine porting the reference's
   <script> IIFE (감리대비_기술설명.html L674-839):
     1. #pbar width = scrollTop / (scrollHeight - clientHeight)
     2. #nav scroll-spy (.on toggle) — single passive scroll handler
     3. IntersectionObserver reveal (.rv → .inview, once)
     4. count-up for [data-count] (ease-out cubic, 1100ms)
   Replaces all framer-motion. Static-export safe: every
   window/document/IntersectionObserver/matchMedia access is
   INSIDE useEffect (post-mount). Renders nothing — the Views
   render #pbar / #nav / .rv markup.
   ============================================================ */

interface Props {
  /** Scroll-spy nav links, e.g. "#fukNav a". Omit on landing (no nav). */
  navSelector?: string;
  /** The progress-bar element the page rendered, e.g. "#pbar". */
  barSelector: string;
  /** Sections the nav spies on, in document order. */
  sectionSelector?: string;
}

// Count-up guard flag stored on the element (avoids `any` + re-running).
type CountEl = HTMLElement & { _countDone?: boolean };

export default function ScrollFx({
  navSelector,
  barSelector,
  sectionSelector = "section[id]",
}: Props) {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches; // FIRST line (directive)

    const bar = document.querySelector<HTMLElement>(barSelector);
    const secs = Array.from(
      document.querySelectorAll<HTMLElement>(sectionSelector)
    );
    const navs = navSelector
      ? Array.from(document.querySelectorAll<HTMLAnchorElement>(navSelector))
      : [];

    // 1 + 2 — progress bar width + scroll-spy .on (single passive handler)
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (bar)
        bar.style.width =
          (max > 0 ? (h.scrollTop / max) * 100 : 0).toFixed(2) + "%";
      if (navs.length) {
        let cur = -1;
        for (let i = 0; i < secs.length; i++) {
          if (secs[i].getBoundingClientRect().top < innerHeight * 0.4) cur = i;
        }
        navs.forEach((a, i) => a.classList.toggle("on", i === cur));
      }
    };
    onScroll(); // initial pbar width (0%) + first .on (NIT-3: self-corrects on first scroll)
    addEventListener("scroll", onScroll, { passive: true });

    // 4 — count-up (ease-out cubic, 1100ms); reduced → final value instantly
    const countUp = (raw: HTMLElement) => {
      const el = raw as CountEl;
      if (el._countDone) return;
      el._countDone = true;
      const to = parseFloat(el.dataset.count || "0");
      const dec = parseInt(el.dataset.dec || "0", 10);
      const fmt = (n: number) =>
        n.toLocaleString(undefined, {
          minimumFractionDigits: dec,
          maximumFractionDigits: dec,
        });
      if (reduced) {
        el.textContent = fmt(to);
        return;
      }
      let t0: number | null = null;
      const step = (ts: number) => {
        if (t0 === null) t0 = ts;
        let k = Math.min(1, (ts - t0) / 1100);
        k = 1 - Math.pow(1 - k, 3); // ease-out cubic
        el.textContent = fmt(to * k);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const fire = (root: ParentNode) =>
      root
        .querySelectorAll<HTMLElement>("[data-count]")
        .forEach((el) => countUp(el));

    // 3 — IntersectionObserver reveal (.rv → .inview, once) + fire count-up in the revealed root
    let io: IntersectionObserver | null = null;
    if (reduced) {
      // reduced motion: everything final immediately, no observer
      document.querySelectorAll(".rv").forEach((el) => el.classList.add("inview"));
      fire(document);
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("inview");
            fire(e.target);
            io?.unobserve(e.target);
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll<HTMLElement>(".rv").forEach((el) => io?.observe(el));
      // hero is above the fold → fire its count-up on mount even if not an .rv
      const hero = document.querySelector("[data-hero]");
      if (hero) fire(hero);
    }

    return () => {
      removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [navSelector, barSelector, sectionSelector]);

  return null;
}
