"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CinematicScroll({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const panelARef = useRef<HTMLDivElement | null>(null);
  const panelBRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = window.document.documentElement;
    const body = window.document.body;
    if (reducedMotion) {
      body.classList.remove("cinema-snap");
      html.classList.remove("cinema-snap");
      return;
    }
    body.classList.add("cinema-snap");
    html.classList.add("cinema-snap");

    const rootEl = rootRef.current;
    const curtainEl = curtainRef.current;
    const panelAEl = panelARef.current;
    const panelBEl = panelBRef.current;

    if (!rootEl || !curtainEl || !panelAEl || !panelBEl) return;

    gsap.registerPlugin(ScrollTrigger);

    // Pointer -> CSS vars for subtle radial highlights (hero + other layers).
    let rafId = 0;
    let nextX = 0.5;
    let nextY = 0.5;

    const applyPointerVars = () => {
      rafId = 0;
      rootEl.style.setProperty("--mx", String(nextX));
      rootEl.style.setProperty("--my", String(nextY));
    };

    const onMove = (e: MouseEvent) => {
      nextX = e.clientX / window.innerWidth;
      nextY = e.clientY / window.innerHeight;
      if (rafId) return;
      rafId = window.requestAnimationFrame(applyPointerVars);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const ctx = gsap.context(() => {
      const scenes = Array.from(
        rootEl.querySelectorAll<HTMLElement>("[data-cinema-scene]")
      );

      if (scenes.length === 0) return;

      // Base initial state.
      gsap.set(curtainEl, { scaleX: 0 });
      gsap.set(panelAEl, { xPercent: -120, opacity: 0 });
      gsap.set(panelBEl, { xPercent: 120, opacity: 0 });

      scenes.forEach((scene) => {
        const revealEls = Array.from(scene.querySelectorAll<HTMLElement>(".reveal-mask"));
        if (revealEls.length) {
          gsap.set(revealEls, { clipPath: "inset(0 0 100% 0)" });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: scene,
                start: "top 80%",
                end: "top 20%",
                scrub: 0.45,
              },
            })
            .to(revealEls, { clipPath: "inset(0 0 0% 0)", ease: "none", duration: 1 }, 0);
        }

        const parallaxLayers = Array.from(
          scene.querySelectorAll<HTMLElement>("[data-parallax-speed]")
        );
        parallaxLayers.forEach((layer) => {
          const speed = Number(layer.dataset.parallaxSpeed ?? "0.2");
          const zoom = Number(layer.dataset.parallaxZoom ?? "0");
          const xAmp = 14 * speed;
          const yAmp = 44 * speed;
          const startScale = 1 - Math.max(0, zoom);
          const endScale = 1 + Math.max(0, zoom);

          gsap
            .timeline({
              scrollTrigger: {
                trigger: scene,
                start: "top top",
                end: "bottom top",
                scrub: 0.55,
              },
            })
            .fromTo(
              layer,
              { x: -xAmp, y: -yAmp, scale: startScale },
              { x: xAmp, y: yAmp, scale: endScale, ease: "none", duration: 1 },
              0
            );
        });
      });

      // Hero-specific transform + scroll hint behavior.
      const heroScene = scenes[0];
      const heroForeground = heroScene.querySelector<HTMLElement>(".hero-foreground");
      const heroHint = heroScene.querySelector<HTMLElement>(".scroll-hint");
      const heroBg = heroScene.querySelector<HTMLElement>(".hero-image-panel");

      if (heroForeground) {
        const heroTextFades = Array.from(
          heroScene.querySelectorAll<HTMLElement>(".hero-text-fade")
        );
        const heroCta = heroScene.querySelector<HTMLElement>(".hero-cta");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: heroScene,
              start: "top top",
              end: "bottom 25%",
              scrub: 0.55,
            },
          })
          .to(
            heroForeground,
            {
              y: -96,
              scale: 0.94,
              transformOrigin: "50% 30%",
              ease: "none",
            },
            0
          );

        if (heroTextFades.length) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: heroScene,
                start: "top top",
                end: "bottom 25%",
                scrub: 0.55,
              },
            })
            .to(
              heroTextFades,
              {
                opacity: 0.02,
                y: -12,
                ease: "none",
                duration: 1,
              },
              0
            );
        }

        if (heroCta) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: heroScene,
                start: "top top",
                end: "bottom 25%",
                scrub: 0.55,
              },
            })
            .to(heroCta, { opacity: 0.92, y: -6, ease: "none", duration: 1 }, 0);
        }
      }

      if (heroHint && heroForeground) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: heroScene,
              start: "top top",
              end: "bottom 25%",
              scrub: 0.55,
            },
          })
          .to(heroHint, { opacity: 0, y: -18, ease: "none" }, 0);
      }

      if (heroBg) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: heroScene,
              start: "top top",
              end: "bottom 25%",
              scrub: 0.55,
            },
          })
          .fromTo(
            heroBg,
            { backgroundPosition: "20% 70%" },
            {
              backgroundPosition: "38% 52%",
              ease: "none",
              duration: 1,
            },
            0
          );
      }

      // Playground: scroll-driven tile movement (hover stays framer-motion).
      const playgroundScene = scenes.find((s) => s.id === "playground");
      if (playgroundScene) {
        const tileTargets = Array.from(
          playgroundScene.querySelectorAll<HTMLElement>("[data-play-tile-gs]")
        );
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: playgroundScene,
            start: "top 70%",
            end: "bottom top",
            scrub: 0.55,
          },
        });

        tileTargets.forEach((tile) => {
          const idx = Number(tile.dataset.tileIndex ?? "0");
          const dir = idx % 2 === 0 ? -1 : 1;
          const x0 = 18 * dir + idx * 2;
          const y0 = 26 - idx * 6;

          tl.fromTo(
            tile,
            { x: x0, y: y0, rotate: dir * -2.5 },
            { x: 0, y: 0, rotate: 0, ease: "none", duration: 1 },
            0
          );
        });
      }

      // Scene-to-scene transitions: layered slide + curtain wipe + subtle depth.
      for (let i = 0; i < scenes.length - 1; i += 1) {
        const prevScene = scenes[i];
        const nextScene = scenes[i + 1];
        const prevInner = prevScene.querySelector<HTMLElement>(".scene-inner");
        const nextInner = nextScene.querySelector<HTMLElement>(".scene-inner");
        const dir = i % 2 === 0 ? 1 : -1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: prevScene,
            endTrigger: nextScene,
            start: "bottom top",
            end: "top top",
            scrub: 0.65,
          },
        });

        tl.set(panelAEl, { opacity: 1 }, 0);
        tl.set(panelBEl, { opacity: 1 }, 0);
        tl.set(curtainEl, { opacity: 1 }, 0);

        if (prevInner && nextInner) {
          // Keep transitions reversible without leaving persistent hidden states.
          gsap.set(nextInner, { transformOrigin: "50% 55%" });
          gsap.set(prevInner, { transformOrigin: "50% 50%" });

          tl.to(
            prevInner,
            {
              opacity: 0,
              y: -44,
              x: -20 * dir,
              scale: 0.97,
              rotateZ: 1.2 * dir,
              clipPath: "inset(0 0 0 0)",
              ease: "none",
              duration: 1,
            },
            0
          );

          tl.fromTo(
            nextInner,
            {
              clipPath: "inset(100% 0 0 0)",
              y: 86,
              x: 40 * dir,
              scale: 1.02,
              rotateZ: -1.8 * dir,
              immediateRender: false,
            },
            {
              clipPath: "inset(0 0 0 0)",
              y: 0,
              x: 0,
              scale: 1,
              rotateZ: 0,
              ease: "none",
              duration: 1,
            },
            0
          );

          // Depth illusion: blur & opacity on parallax layers during the cut.
          const prevLayers = Array.from(
            prevScene.querySelectorAll<HTMLElement>("[data-parallax-speed]")
          );
          const nextLayers = Array.from(
            nextScene.querySelectorAll<HTMLElement>("[data-parallax-speed]")
          );
          if (prevLayers.length) {
            tl.to(
              prevLayers,
              { opacity: 0.35, filter: "blur(16px)", ease: "none", duration: 1 },
              0
            );
          }
          if (nextLayers.length) {
            tl.fromTo(
              nextLayers,
              { opacity: 0.7, filter: "blur(22px)", immediateRender: false },
              { opacity: 1, filter: "blur(0px)", ease: "none", duration: 1 },
              0
            );
          }
        }

        // Panel slide (layered page feel).
        tl.fromTo(
          panelAEl,
          { xPercent: -120 },
          { xPercent: 120, ease: "none", duration: 1 },
          0
        );
        tl.fromTo(
          panelBEl,
          { xPercent: 120 },
          { xPercent: -120, ease: "none", duration: 1 },
          0
        );

        // Curtain wipe (fast opening, slow closing).
        tl.fromTo(
          curtainEl,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, ease: "none", duration: 0.26 },
          0
        );
        tl.to(curtainEl, { scaleX: 0, opacity: 0, ease: "none", duration: 0.74 }, 0.26);
      }

      ScrollTrigger.refresh();
    }, rootEl);

    return () => {
      window.removeEventListener("mousemove", onMove);
      rafId = 0;
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      body.classList.remove("cinema-snap");
      html.classList.remove("cinema-snap");
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="cinema-root">
      <div ref={panelARef} aria-hidden className="cinema-transition-panel cinema-panel-a" />
      <div ref={panelBRef} aria-hidden className="cinema-transition-panel cinema-panel-b" />
      <div ref={curtainRef} aria-hidden className="cinema-transition-curtain" />
      {children}
    </div>
  );
}

