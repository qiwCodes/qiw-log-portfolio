"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ideas } from "@/data/content";
import { BroadcastOverlay } from "@/components/broadcast-overlay";
import { ScenePanel } from "@/components/scene-panel";
import { ProjectFilmstrip } from "@/components/project-filmstrip";
import { StickyTopbar } from "@/components/sticky-topbar";

const ImmersiveMenu = dynamic(
  () => import("@/components/immersive-menu").then((module) => module.ImmersiveMenu),
);

const THEME_STORAGE_KEY = "theme";

const menuItems = [
  { label: "Top", targetId: "hero", index: "01" },
  { label: "Manifesto", targetId: "statement", index: "02" },
  { label: "Selected Work", targetId: "selected-work", index: "03" },
  { label: "Lab Notes", targetId: "ideas", index: "04" },
  { label: "Contact", targetId: "contact", index: "05" },
];

export function HomeClient() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [tvSwitch, setTvSwitch] = useState<"idle" | "off" | "on">("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const [navWipe, setNavWipe] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    let mediaQuery:
      | {
          add: (query: string, setup: () => void | (() => void)) => void;
          revert: () => void;
        }
      | undefined;

    async function setupScrollAnimations() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      mediaQuery = gsap.matchMedia();
      mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".reveal-scene").forEach((scene) => {
          gsap.fromTo(
            scene,
            { clipPath: "inset(16% 0 18% 0)", y: 90 },
            {
              clipPath: "inset(0% 0 0% 0)",
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: scene,
                start: "top 82%",
                end: "top 22%",
                scrub: 0.7,
              },
            },
          );
        });
      });
    }

    void setupScrollAnimations();

    return () => {
      cancelled = true;
      mediaQuery?.revert();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    if (tvSwitch !== "idle") {
      return;
    }

    const nextTheme: "dark" | "light" = theme === "dark" ? "light" : "dark";
    setTvSwitch("off");

    window.setTimeout(() => {
      setTheme(nextTheme);
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      setTvSwitch("on");
    }, 340);

    window.setTimeout(() => {
      setTvSwitch("idle");
    }, 980);
  };

  const navigateToSection = (targetId: string) => {
    const anchor = `#${targetId}`;
    const baseUrl = `${window.location.pathname}${window.location.search}`;
    if (window.location.hash === anchor) {
      window.history.replaceState(null, "", baseUrl);
    }
    window.location.hash = targetId;

    setNavWipe(true);
    setMenuOpen(false);
    document.body.style.overflow = "";

    const performScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) {
        return;
      }

      const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 12);
      const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;
      window.scrollTo({ top: targetY, behavior: isMobileOrTablet ? "auto" : "smooth" });
    };

    const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;
    const closeDelay = isMobileOrTablet ? 520 : 120;
    window.setTimeout(() => {
      performScroll();
      window.setTimeout(performScroll, 90);
    }, closeDelay);

    window.setTimeout(() => {
      setNavWipe(false);
    }, 760);
  };

  return (
    <main className={`experience-root ${theme === "light" ? "is-light" : ""}`}>
      <BroadcastOverlay />
      <StickyTopbar
        isLight={theme === "light"}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
      />
      {menuOpen ? (
        <ImmersiveMenu
          open={menuOpen}
          isLight={theme === "light"}
          items={menuItems}
          onClose={() => setMenuOpen(false)}
          onNavigate={navigateToSection}
        />
      ) : null}
      <div aria-hidden className={`tv-switch-overlay ${tvSwitch !== "idle" ? `is-${tvSwitch}` : ""}`} />
      <div aria-hidden className={`nav-wipe-overlay ${navWipe ? "is-active" : ""}`} />
      <HeroScene isLight={theme === "light"} />
      <StatementScene isLight={theme === "light"} />
      <ProjectFilmstrip isLight={theme === "light"} />
      <IdeaScene isLight={theme === "light"} />
      <ContactScene isLight={theme === "light"} />
    </main>
  );
}

function HeroScene({ isLight }: { isLight: boolean }) {
  return (
    <ScenePanel
      id="hero"
      className={`flex items-end px-4 pb-8 pt-22 sm:pb-10 sm:pt-24 md:px-10 md:pb-14 ${isLight ? "bg-white" : ""}`}
    >
      <div className="relative z-10 w-full">
        <p className="meta-label distort-in">Archive Feed / Live Session</p>
        <h1 className="glow-text distort-in mt-4 text-[15.5vw] leading-[0.82] sm:mt-5 sm:text-[14vw] md:text-[13vw]">
          QIW
          <br />
          TRANSMISSION
        </h1>
        <div className="mt-5 grid max-w-5xl gap-4 border-t border-white/20 pt-4 sm:mt-6 sm:gap-6 sm:pt-5 md:grid-cols-12">
          <p className="text-sm leading-relaxed text-white/75 md:col-span-7 md:text-base">
            I like turning “maybe someday” into shipped software—spotting pain points, shaping
            solutions, and owning the stack end to end. Full-stack engineering with real experience
            building AI-powered products.
          </p>
          <div className="meta-label md:col-span-5 md:text-right">
            Full-stack / AI systems / Pain → shipped fix
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80vw_70vh_at_70%_20%,rgba(255,255,255,0.18),transparent_62%)]"
      />
    </ScenePanel>
  );
}

function StatementScene({ isLight }: { isLight: boolean }) {
  return (
    <ScenePanel
      id="statement"
      className={`reveal-scene px-4 py-6 sm:py-8 md:px-10 md:py-14 ${isLight ? "bg-white" : "bg-black"}`}
    >
      <div className="signal-frame h-full bg-white/[0.02] p-4 sm:p-5 md:p-8">
        <div className="grid h-full content-between gap-6 sm:gap-8 md:grid-cols-12">
          <h2 className="glow-text text-4xl leading-[0.88] sm:text-5xl md:col-span-8 md:text-8xl">
            Challenge-led
            <br />
            deep-focus
            <br />
            builds
          </h2>
          <p className="self-end text-sm leading-relaxed text-white/72 md:col-span-4 md:text-base">
            I&apos;m drawn to work that stays interesting long after the first sprint—problems worth
            sitting with, refining, and learning around. New tools and domains stay exciting because
            they change what I can build next.
          </p>
        </div>
      </div>
    </ScenePanel>
  );
}

function IdeaScene({ isLight }: { isLight: boolean }) {
  return (
    <ScenePanel
      id="ideas"
      className={`reveal-scene px-4 py-10 md:px-10 md:py-14 ${
        isLight ? "bg-gradient-to-b from-white to-[#f2f2f2]" : "bg-gradient-to-b from-black to-[#080808]"
      }`}
    >
      <div className="grid gap-4 sm:gap-5 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="meta-label">Lab Notes / In Progress</p>
          <h2 className="mt-3 text-4xl leading-[0.88] sm:text-5xl md:text-7xl">Current Idea Queue</h2>
        </div>
        <div className="marquee-line border-y border-white/20 py-2 md:col-span-6 md:self-end">
          <div className="marquee-track meta-label">
            <span>Transmission Stable</span>
            <span>Prototype Mode</span>
            <span>Editorial UI Research</span>
            <span>Signal Archive Updated</span>
            <span>Transmission Stable</span>
            <span>Prototype Mode</span>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2">
        {ideas.map((idea) => (
          <article
            key={idea}
            className="signal-frame bg-white/[0.03] p-4 transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:p-5"
          >
            <p className="text-sm text-white/86 md:text-base">{idea}</p>
          </article>
        ))}
      </div>
    </ScenePanel>
  );
}

function ContactScene({ isLight }: { isLight: boolean }) {
  return (
    <ScenePanel
      id="contact"
      className={`reveal-scene flex items-end px-4 pb-10 pt-18 sm:pt-20 md:px-10 md:pb-16 ${isLight ? "bg-white" : "bg-black"}`}
    >
      <div className="w-full border-t border-white/20 pt-6">
        <p className="meta-label">Open Signal</p>
        <h2 className="glow-text mt-2 text-4xl leading-[0.9] sm:text-5xl md:text-[10vw]">
          Build the next scene.
        </h2>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="mailto:qiw.codes@gmail.com"
            className="rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
          >
            Email
          </Link>
          <Link
            href="https://github.com/qiwCodes"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-white/40 hover:bg-white hover:text-black"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/motonori-kono-32b28a35a"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-white/40 hover:bg-white hover:text-black"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </ScenePanel>
  );
}
