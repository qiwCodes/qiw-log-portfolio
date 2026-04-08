"use client";

import { MagneticButton } from "@/components/magnetic-button";

export function HeroSection() {
  return (
    <section
      className="cinema-scene relative flex w-full items-center justify-start px-6 md:px-12"
      data-cinema-scene
    >
      <div aria-hidden className="hero-bg absolute inset-0">
        <div
          className="hero-image-panel absolute inset-0"
          data-parallax-speed="0.22"
          data-parallax-zoom="0.06"
          style={{
            backgroundImage:
              "radial-gradient(120% 120% at 15% 10%, rgba(255,255,255,0.18), transparent 58%), radial-gradient(100% 100% at 90% 30%, rgba(255,255,255,0.12), transparent 55%), linear-gradient(180deg, rgba(14,14,22,0.0), rgba(9,9,13,0.55) 65%, rgba(9,9,13,0.95) 100%)",
            backgroundPosition: "20% 70%",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at calc(var(--mx,0.5) * 100%) calc(var(--my,0.5) * 100%), rgba(255,255,255,0.14), rgba(9,9,13,0) 42%)",
          }}
        />

        <div
          className="hero-bg-layer absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl opacity-90"
          data-parallax-speed="0.34"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.22), transparent 65%)",
          }}
        />

        <div
          className="hero-bg-layer absolute right-[-5rem] top-10 h-64 w-64 rounded-full blur-3xl opacity-85"
          data-parallax-speed="0.26"
          data-parallax-zoom="0.03"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent 64%)",
          }}
        />

        <div
          className="hero-bg-layer absolute -bottom-10 left-1/3 h-48 w-48 rounded-full blur-2xl opacity-90"
          data-parallax-speed="0.20"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.14), transparent 68%)",
          }}
        />

        <div
          className="hero-bg-layer absolute inset-0 blur-2xl opacity-80"
          data-parallax-speed="0.12"
          data-parallax-zoom="0.05"
          style={{
            background:
              "conic-gradient(from 210deg at 65% 45%, rgba(255,255,255,0.10), rgba(255,255,255,0.06), transparent 45%)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="hero-watermark pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 opacity-10"
      >
        qiw.log
      </div>

      <div className="scene-inner relative z-10 hero-foreground w-full">
        <div className="relative w-full">
          <p className="reveal-mask hero-text-fade mb-5 text-xs uppercase tracking-[0.25em] text-[var(--muted)] md:text-sm">
            Full-stack · AI · Pain points → solutions
          </p>

          <h1 className="reveal-mask hero-text-fade text-6xl font-semibold leading-[0.85] tracking-tight sm:text-7xl md:text-[7.2rem] lg:text-[8.6rem]">
            <span className="bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">
              Qiw
            </span>
          </h1>

          <p className="reveal-mask hero-text-fade mt-8 max-w-[38rem] text-lg leading-8 text-[var(--text-soft)] sm:text-xl md:text-2xl md:leading-10">
            I turn ambitious ideas into working software—spotting friction, shaping fixes, and
            shipping end to end.
          </p>

          <div className="reveal-mask hero-cta mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton href="#playground" className="button-primary min-w-44">
              Enter Playground
            </MagneticButton>
            <MagneticButton href="#selected-work" className="button-secondary min-w-36">
              View Work
            </MagneticButton>
          </div>

          <div className="reveal-mask hero-text-fade glass-panel mt-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-[var(--text-soft)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            Building digital experiences with engineering + art direction
          </div>
        </div>
      </div>

      <div
        className="scroll-hint absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
        aria-hidden
      >
        <div className="glass-panel flex items-center gap-3 rounded-full px-4 py-2 text-xs text-[var(--text-soft)]">
          <span className="scroll-hint-bob inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
            ↓
          </span>
          <span className="tracking-[0.24em] text-[var(--muted)] uppercase">Scroll</span>
        </div>
      </div>

      <div
        aria-hidden
        className="float-slow glass-panel absolute right-6 bottom-10 hidden w-52 rounded-2xl p-4 lg:block"
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">qiw.log</p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
          Product lab, creative system, and code-native art direction.
        </p>
      </div>
    </section>
  );
}
