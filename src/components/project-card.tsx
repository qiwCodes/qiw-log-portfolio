"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent } from "react";

type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year?: string;
  category?: string;
  featured?: boolean;
  className?: string;
};

function gradientForSlug(slug: string) {
  if (slug.includes("aether")) {
    return {
      glow: "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.20),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.12),transparent_60%)]",
      grid: "bg-[linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]",
    };
  }
  if (slug.includes("pulse")) {
    return {
      glow: "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_56%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.10),transparent_62%)]",
      grid: "bg-[linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]",
    };
  }
  return {
    glow: "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_58%),radial-gradient(circle_at_65%_75%,rgba(255,255,255,0.14),transparent_60%)]",
    grid: "bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]",
  };
}

export function ProjectCard({
  slug,
  title,
  description,
  tags,
  year,
  category,
  featured = false,
  className,
}: ProjectCardProps) {
  const variant = gradientForSlug(slug);
  const href = `/projects/${slug}`;
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 20, mass: 0.25 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 20, mass: 0.25 });
  const light = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.2), rgba(255,255,255,0) 35%)`;

  function onMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    mx.set(x);
    my.set(y);
    ry.set((x - 50) * 0.12);
    rx.set((50 - y) * 0.12);
  }

  return (
    <Link
      href={href}
      className={`group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${className ?? ""}`}
      aria-label={`Open project: ${title}`}
    >
      <motion.article
        transition={{ duration: 0.45 }}
        whileHover={{ y: -10, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(50);
          my.set(50);
          rx.set(0);
          ry.set(0);
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`glass-panel group relative overflow-hidden rounded-3xl p-7 ${featured ? "md:p-10" : ""}`}
      >
        {/* Preview (image/visual) */}
        <div
          aria-hidden
          className={`absolute inset-0 -z-10 opacity-70 transition duration-700 group-hover:opacity-100 ${variant.glow}`}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ backgroundImage: light }}
        />
        <div
          aria-hidden
          className={`absolute inset-0 -z-10 opacity-0 transition duration-700 group-hover:opacity-30 ${variant.grid} bg-[size:26px_26px]`}
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_60%)] opacity-70 blur-2xl transition duration-500 group-hover:opacity-100"
        />

        <div className="relative z-10">
          <div className={`mb-5 w-full rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] p-3 ${featured ? "h-44" : "h-32"}`}>
            <div className="mb-2 h-2 w-20 rounded-full bg-white/25" />
            <div className="h-2 w-full rounded-full bg-white/15" />
            <div className="mt-2 h-2 w-3/4 rounded-full bg-white/10" />
            {featured ? (
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-12 rounded-md bg-white/10" />
                <div className="h-12 rounded-md bg-white/8" />
                <div className="h-12 rounded-md bg-white/12" />
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              {year ? (
                <p className="text-xs tracking-[0.16em] text-[var(--muted)]">
                  {year}
                </p>
              ) : null}
              {category ? (
                <p className="mt-2 text-sm text-[var(--muted)]">{category}</p>
              ) : null}
            </div>
            <motion.div
              aria-hidden
              className="h-9 w-9 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm"
              initial={false}
              whileHover={{ rotate: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <h3 className={`mt-5 font-semibold tracking-tight ${featured ? "text-4xl" : "text-2xl"}`}>
            {title}
          </h3>
          <p className={`mt-3 leading-7 text-[var(--text-soft)] ${featured ? "text-base" : "text-sm"}`}>
            {description}
          </p>

          {/* Hover-revealed extra info */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <div
              className="flex flex-wrap gap-2 opacity-0 translate-y-2 transition duration-400 group-hover:opacity-100 group-hover:translate-y-0"
            >
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[var(--muted)] transition group-hover:border-[var(--accent)]/35 group-hover:text-[var(--text)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 opacity-90 transition duration-300 group-hover:opacity-100">
              <span className="text-sm text-[var(--accent)]">Explore</span>
              <motion.span
                aria-hidden
                className="text-sm text-[var(--accent)]"
                initial={false}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25 }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

