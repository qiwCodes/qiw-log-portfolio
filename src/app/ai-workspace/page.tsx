import type { Metadata } from "next";
import { AIWorkspaceClient } from "@/components/ai-workspace-client";

export const metadata: Metadata = {
  title: "AI Workspace - qiw.log",
  description: "A simple AI workspace UI with prompts and response history.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AIWorkspacePage() {
  return <AIWorkspaceClient />;
}
