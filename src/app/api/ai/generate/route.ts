import { NextRequest, NextResponse } from "next/server";

function buildMockResponse(prompt: string) {
  return [
    "Here is a polished response based on your prompt:",
    "",
    `Prompt: "${prompt}"`,
    "",
    "- Clarified user intent and constraints",
    "- Proposed a concise implementation direction",
    "- Suggested next actions for iteration",
    "",
    "Tip: connect this endpoint to the OpenAI API when you are ready for real model output.",
  ].join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { prompt?: string };
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    await new Promise((resolve) => setTimeout(resolve, 700));

    return NextResponse.json({ output: buildMockResponse(prompt) });
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
