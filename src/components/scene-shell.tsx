// Full-viewport "scene" wrapper for the cinematic scroll experience.
"use client";

import { ReactNode } from "react";

type SceneShellProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SceneShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SceneShellProps) {
  return (
    <section
      id={id}
      data-cinema-scene
      className={`cinema-scene relative w-full px-6 md:px-12 ${className ?? ""}`}
    >
      {/* Parallax depth layers (animated by GSAP ScrollTrigger) */}
      <div
        aria-hidden
        className="scene-parallax-layer scene-parallax-bg"
        data-parallax-speed="0.12"
        data-parallax-zoom="0.06"
      />
      <div
        aria-hidden
        className="scene-parallax-layer scene-parallax-mid"
        data-parallax-speed="0.26"
        data-parallax-zoom="0.03"
      />
      <div
        aria-hidden
        className="scene-parallax-layer scene-parallax-fg"
        data-parallax-speed="0.48"
        data-parallax-zoom="0.08"
      />

      <div className="scene-inner relative z-10 w-full">
        <div className="scene-header w-full">
          <div className="section-divider mb-6" />
          <p className="reveal-mask scene-eyebrow mb-3 text-xs uppercase tracking-[0.24em] text-[var(--muted)] md:text-sm">
            {eyebrow}
          </p>
          <h2 className="reveal-mask scene-title text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-[3.7rem]">
            {title}
          </h2>
          {description ? (
            <p className="reveal-mask scene-description mt-4 max-w-[60ch] text-sm leading-7 text-[var(--text-soft)] md:text-base">
              {description}
            </p>
          ) : null}
        </div>

        <div className="scene-body">{children}</div>
      </div>
    </section>
  );
}

