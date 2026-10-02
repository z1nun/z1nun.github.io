"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import { type ReactNode } from "react";

/* ============================================================
   Shared motion primitive — the ONE place motion logic lives.
   Exports: Reveal / RevealGroup / RevealItem / MotionCard.
   All framer-motion is imported from the package ROOT ("framer-motion").
   The "motion" package subpath entry does NOT exist in this install
   (v13.5.0, verified) — do not use it.
   Every export collapses to its final visible state under
   useReducedMotion() so no content is ever gated behind an
   unplayed animation (AC-5). GPU-only: opacity + translateY only,
   never translateX (375px overflow guard, AC-11).
   ============================================================ */

// ---- module-local motion tokens (see 02-design.md Motion Tokens) ----
const EASE = [0.22, 1, 0.36, 1] as const; // custom cubic-bezier, NOT a library default
const RISE = 16; // translateY distance (px) — small, 375px-safe
const DUR = 0.45; // seconds, "normal" enter/reveal
const DUR_FAST = 0.28; // seconds, hover/press
const STAGGER = 0.07; // 70ms between staggered children

type AsTag = "div" | "section" | "header" | "ul" | "li";

// Architecture Decision: a switch(as) returning a CONCRETE motion.* component
// (over `motion[as]`) because indexing `motion` by a union key yields a union
// of component types that can trip strict-mode "no common construct signature"
// errors (NIT-6). The switch is guaranteed to type-check under strict:true.
function tagFor(as: AsTag) {
  switch (as) {
    case "section":
      return motion.section;
    case "header":
      return motion.header;
    case "ul":
      return motion.ul;
    case "li":
      return motion.li;
    case "div":
    default:
      return motion.div;
  }
}

// ---------- Reveal (single section/element) ----------
interface RevealProps {
  children: ReactNode;
  /** false = below-the-fold: hidden → animate on scroll-in (whileInView, once).
   *  true  = above-the-fold: hidden → animate on MOUNT (never whileInView). */
  immediate?: boolean;
  as?: AsTag;
  className?: string;
  delay?: number;
}

export function Reveal({
  children,
  immediate = false,
  as = "div",
  className,
  delay = 0,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = tagFor(as);

  // reduced motion → render the plain tag at FINAL visible state, no transition
  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  const hidden = { opacity: 0, y: RISE };
  const shown = { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE, delay } };

  if (immediate) {
    // above-the-fold → animate on mount (KakaoTalk in-app browser never sees a blank hero)
    return (
      <MotionTag className={className} initial={hidden} animate={shown}>
        {children}
      </MotionTag>
    );
  }

  // below-the-fold → reveal on scroll-in, once
  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}

// ---------- RevealGroup (stagger parent) + RevealItem (child) ----------
const groupVariants = (stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } },
};

interface RevealGroupProps {
  children: ReactNode;
  immediate?: boolean;
  as?: AsTag;
  className?: string;
  stagger?: number;
}

export function RevealGroup({
  children,
  immediate = false,
  as = "div",
  className,
  stagger = STAGGER,
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const MotionTag = tagFor(as);

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  if (immediate) {
    return (
      <MotionTag
        className={className}
        variants={groupVariants(stagger)}
        initial="hidden"
        animate="show"
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={groupVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  as?: AsTag;
  className?: string;
}

export function RevealItem({ children, as = "div", className }: RevealItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = tagFor(as);

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  // NOTE: no explicit initial/animate — the item inherits hidden/show from the
  // parent RevealGroup's variants, so the group stagger drives each item.
  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}

// ---------- MotionCard (hover-lift for pointer devices) ----------
type MotionCardProps = HTMLMotionProps<"div"> & { children: ReactNode };

export function MotionCard({ children, ...rest }: MotionCardProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    // Render a motion.div with NO whileHover/whileTap — it accepts the same
    // HTMLMotionProps the caller passes (a plain <div> would reject motion-only
    // style props). Static final state, no animation (AC-5).
    return <motion.div {...rest}>{children}</motion.div>;
  }

  // Architecture Decision: MotionCard carries NO `variants` (NIT-6) so it does
  // not swallow the parent RevealGroup's stagger — the card's ENTRANCE comes
  // from the wrapping RevealItem; its HOVER comes from here. MotionCard also
  // OWNS the landing card hover-lift (y:-4) — the CSS .card:hover keeps only
  // border-color + arrow nudge (no transform) to avoid a double-translate (NIT-1).
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 3px 14px rgba(0,0,0,0.07)" }}
      whileTap={{ y: -1 }}
      transition={{ duration: DUR_FAST, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
