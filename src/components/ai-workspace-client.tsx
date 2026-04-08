"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type HistoryItem = {
  id: string;
  prompt: string;
  createdAt: string;
};

type GenerateResponse = {
  output: string;
};

const HISTORY_STORAGE_KEY = "qiw-ai-history";
const MAX_HISTORY = 10;

export function AIWorkspaceClient() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as HistoryItem[];
      setHistory(parsed);
    } catch {
      window.localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const canSubmit = useMemo(() => prompt.trim().length > 0 && !loading, [prompt, loading]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    const nextPrompt = prompt.trim();
    const nextHistoryItem: HistoryItem = {
      id: crypto.randomUUID(),
      prompt: nextPrompt,
      createdAt: new Date().toISOString(),
    };

    setHistory((prev) => [nextHistoryItem, ...prev].slice(0, MAX_HISTORY));

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: nextPrompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = (await response.json()) as GenerateResponse;
      setResult(data.output);
      setPrompt("");
    } catch {
      setError("Could not generate response. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8 md:px-8 md:py-10">
      <div className="mb-7">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">AI Workspace</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Prompt, generate, iterate.</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
          <h2 className="text-sm font-semibold tracking-wide">Saved Prompts</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">Recent prompts for fast reuse.</p>

          <div className="mt-4 space-y-2">
            <AnimatePresence initial={false}>
              {history.length === 0 ? (
                <p className="rounded-xl border border-dashed border-white/10 px-3 py-4 text-xs text-[var(--muted)]">
                  No prompt history yet.
                </p>
              ) : (
                history.map((item) => (
                  <motion.button
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    type="button"
                    onClick={() => setPrompt(item.prompt)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-xs text-[var(--text-soft)] transition hover:border-[var(--accent)]/35 hover:text-[var(--text)]"
                  >
                    <p className="line-clamp-2">{item.prompt}</p>
                  </motion.button>
                ))
              )}
            </AnimatePresence>
          </div>
        </aside>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <label htmlFor="prompt" className="text-sm font-medium">
              Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={6}
              placeholder="Describe what you want the AI to generate..."
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]/45 focus:ring-2 focus:ring-[var(--accent)]/20"
            />

            <div className="flex items-center gap-3">
              <button type="submit" className="button-primary min-w-40" disabled={!canSubmit}>
                {loading ? "Generating..." : "Generate Response"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPrompt("");
                  setResult("");
                  setError(null);
                }}
                className="button-secondary"
              >
                Clear
              </button>
            </div>
          </form>

          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Result</p>
            <AnimatePresence mode="wait">
              {error ? (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-sm text-rose-300"
                >
                  {error}
                </motion.p>
              ) : result ? (
                <motion.p
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="whitespace-pre-wrap text-sm leading-7 text-[var(--text-soft)]"
                >
                  {result}
                </motion.p>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-sm text-[var(--muted)]"
                >
                  Generated output appears here.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
