import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center px-6 py-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
        Project not found
      </h1>
      <p className="mt-4 max-w-lg text-[var(--text-soft)]">
        This case study does not exist yet. Return to the playground and explore
        other work.
      </p>
      <Link href="/#selected-work" className="button-primary mt-8">
        Back to work
      </Link>
    </main>
  );
}
