"use client";

import { SceneShell } from "@/components/scene-shell";
import { playgroundItems } from "@/data/content";
import { PlaygroundExperimentCard } from "@/components/playground-experiment-card";

export function PlaygroundSection() {
  return (
    <SceneShell
      id="playground"
      eyebrow="Playground"
      title="Experimental lab for playful interfaces and living systems."
      description="A modular bento playground where each tile tests a different interaction language."
    >
      <div className="relative">
        {/* Decorative accent line */}
        <div
          aria-hidden
          className="absolute -top-3 left-0 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),rgba(255,255,255,0.18),transparent)] opacity-60"
        />

        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          data-parallax-speed="0.18"
          data-parallax-zoom="0.02"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(circle at 30% 20%, black, transparent 64%)",
          }}
        />

        <div className="grid auto-rows-[minmax(180px,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {playgroundItems.map((item, index) => (
            <PlaygroundExperimentCard
              key={item.title}
              title={item.title}
              description={item.description}
              kind={item.kind}
              tags={item.tags}
              index={index}
              className={
                index === 0
                  ? "lg:col-span-3 lg:row-span-2"
                  : index === 1
                    ? "lg:col-span-3"
                    : index === 2
                      ? "lg:col-span-2"
                      : "lg:col-span-4"
              }
            />
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

