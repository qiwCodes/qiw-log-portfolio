"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";

export function ProjectFilmstrip({ isLight }: { isLight: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) {
      return;
    }

    const resolvedSection = section;
    const resolvedTrack = track;
    let cancelled = false;
    let mediaQuery:
      | {
          add: (query: string, setup: () => void | (() => void)) => void;
          revert: () => void;
        }
      | undefined;

    async function setupFilmstrip() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      mediaQuery = gsap.matchMedia();
      mediaQuery.add("(min-width: 900px)", () => {
        const panels = Array.from(resolvedTrack.querySelectorAll<HTMLElement>(".film-panel"));
        const visibleWidth = resolvedSection.clientWidth;
        const baseDistance = Math.max(0, resolvedTrack.scrollWidth - visibleWidth);
        const lastPanel = panels[panels.length - 1];
        const lastPanelWidth = lastPanel?.offsetWidth ?? 0;
        // Move a bit past the natural end so the final card sits more centered,
        // instead of feeling stuck to the right edge.
        const finalPanelCenterOffset = Math.max(0, (visibleWidth - lastPanelWidth) / 2);
        const distance = baseDistance + finalPanelCenterOffset;
        // Keep the filmstrip pinned longer and stretch scroll travel slightly,
        // so horizontal movement feels less rushed near the final card.
        const holdDistance = Math.max(320, resolvedSection.clientHeight * 0.5);
        const stretchDistance = Math.max(320, distance * 0.3);

        const tween = gsap.to(resolvedTrack, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: resolvedSection,
            start: "top top",
            end: () => `+=${distance + holdDistance + stretchDistance}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { yPercent: 0, opacity: 0.7 },
            {
              yPercent: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 85%",
                end: "right 35%",
                scrub: true,
              },
            },
          );
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }

    void setupFilmstrip();

    return () => {
      cancelled = true;
      mediaQuery?.revert();
    };
  }, []);

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className={`scene-panel flex min-h-[100svh] flex-col px-4 py-6 md:px-8 md:py-10 lg:h-[100svh] ${isLight ? "bg-white" : "bg-black"}`}
    >
      <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
        <div>
          <p className="meta-label">Featured Reels</p>
          <h2 className="mt-2 text-4xl leading-[0.9] sm:text-5xl md:text-7xl">Selected Broadcasts</h2>
        </div>
        <span className="meta-label hidden lg:block">Scroll / Drag Through Scenes</span>
      </div>
      <div ref={trackRef} className="flex flex-1 flex-col items-stretch gap-4 sm:gap-5 lg:flex-row lg:gap-8 lg:pr-8">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className="film-panel signal-frame flex min-h-[300px] w-full flex-col justify-between bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 sm:min-h-[380px] sm:p-5 md:p-6 lg:h-full lg:min-h-0 lg:w-[68vw] lg:shrink-0 lg:p-8"
          >
            <div className="flex justify-between">
              <p className="meta-label">{project.year}</p>
              <p className="meta-label">0{index + 1}</p>
            </div>
            <div>
              <p className="meta-label">{project.category}</p>
              <h3 className="mt-3 text-3xl leading-[0.9] sm:text-4xl md:text-5xl lg:text-7xl">{project.title}</h3>
              <p className="mt-4 max-w-2xl text-sm text-white/75 md:text-base">{project.summary}</p>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((item) => (
                  <span key={item} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                    {item}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
              >
                Open
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
