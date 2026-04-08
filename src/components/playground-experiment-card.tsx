"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type PlaygroundExperimentCardProps = {
  title: string;
  description: string;
  kind: string;
  tags: string[];
  index: number;
  className?: string;
};

function accentForKind(kind: string) {
  const k = kind.toLowerCase();
  if (k.includes("ui")) return "rgba(255,255,255,0.48)";
  if (k.includes("mini")) return "rgba(255,255,255,0.42)";
  if (k.includes("animation")) return "rgba(255,255,255,0.34)";
  return "rgba(255,255,255,0.38)";
}

export function PlaygroundExperimentCard({
  title,
  description,
  kind,
  tags,
  index,
  className,
}: PlaygroundExperimentCardProps) {
  const [armed, setArmed] = useState(false);
  const accent = useMemo(() => accentForKind(kind), [kind]);

  return (
    <motion.button
      type="button"
      onClick={() => setArmed((v) => !v)}
      className={`glass-panel group relative overflow-hidden rounded-3xl p-5 text-left transition ${className ?? ""}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.99 }}
      aria-pressed={armed}
    >
      <div className="play-tile-gs" data-play-tile-gs data-tile-index={index}>
      {/* Ambient preview */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-90"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 85% 10%, rgba(255,255,255,0.10), transparent 48%)",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute right-[-4rem] top-[-4rem] h-48 w-48 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 62%)` }}
        animate={
          armed
            ? { scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4] }
            : { scale: [1, 1.06, 1], opacity: [0.35, 0.5, 0.35] }
        }
        transition={{
          duration: armed ? 2.4 : 3.6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: index * 0.06,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-6 top-5 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)] opacity-70"
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_rgba(255,255,255,0.10)]" />
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              {kind}
            </p>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            {title}
          </h3>
        </div>

        <motion.div
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
          initial={false}
          animate={armed ? { rotate: 14 } : { rotate: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm text-[var(--accent)]">↻</span>
        </motion.div>
      </div>

      <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
        {description}
      </p>
      <div className="mt-4 h-14 overflow-hidden rounded-lg border border-white/10 bg-black/20 p-2">
        <motion.div
          className="h-2 rounded-full bg-white/20"
          animate={{ x: ["-30%", "120%"] }}
          transition={{ duration: armed ? 1.8 : 3.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          <motion.div className="h-6 rounded bg-white/10" animate={armed ? { opacity: [0.4, 0.85, 0.4] } : { opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }} />
          <div className="h-6 rounded bg-white/8" />
          <div className="h-6 rounded bg-white/12" />
          <div className="h-6 rounded bg-white/8" />
        </div>
      </div>

      {/* Hover / click revealed extra info */}
      <motion.div
        className="mt-5"
        initial={false}
        animate={{
          opacity: armed ? 1 : undefined,
        }}
      >
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <motion.span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[var(--muted)]"
              initial={{ opacity: 0.55, y: 6 }}
              whileHover={{ opacity: 0.95, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="mt-4 flex items-center justify-between gap-3"
          initial={{ opacity: 0, y: 6 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            Click to toggle demo mode
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[var(--accent)]">{armed ? "On" : "Off"}</span>
            <motion.span
              aria-hidden
              className="text-[var(--accent)]"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </motion.button>
  );
}

