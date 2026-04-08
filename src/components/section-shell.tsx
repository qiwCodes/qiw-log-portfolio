"use client";

import { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20"
    >
      <div className="mb-8 md:mb-12">
        <div className="section-divider mb-6" />
        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
          {eyebrow}
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-soft)] md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
