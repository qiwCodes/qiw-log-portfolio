import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-start justify-center px-6 py-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">404 / Signal Lost</p>
      <h1 className="mt-4 text-4xl md:text-6xl">This page is off the map.</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-soft)] md:text-base">
        The route you requested is not part of the published portfolio. Jump back to the main
        archive and continue from there.
      </p>
      <Link href="/" className="mt-8 rounded-full border border-current/25 px-5 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
        Back to Home
      </Link>
    </main>
  );
}
