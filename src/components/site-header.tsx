import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[var(--surface)]/60 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between px-6 md:px-12">
        <Link href="/" className="text-sm tracking-[0.22em] text-[var(--muted)] transition hover:text-[var(--text)]">
          qiw.log
        </Link>
        <nav className="glass-panel flex items-center gap-3 rounded-full px-3 py-1.5">
          <Link href="/#selected-work" className="hidden text-sm text-[var(--muted)] transition hover:text-[var(--text)] md:inline-block">
            Work
          </Link>
          <Link href="/#playground" className="hidden text-sm text-[var(--muted)] transition hover:text-[var(--text)] md:inline-block">
            Playground
          </Link>
          <Link href="/ai-workspace" className="hidden text-sm text-[var(--muted)] transition hover:text-[var(--text)] md:inline-block">
            AI Workspace
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
