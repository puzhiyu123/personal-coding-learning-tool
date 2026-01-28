import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { code, cursorLine, cursorColumn, language } = await request.json();

    if (!code) {
      return new Response(JSON.stringify({ error: "Code is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const lines = code.split("\n");
    const currentLine = lines[cursorLine - 1] || "";
    const contextBefore = lines.slice(Math.max(0, cursorLine - 10), cursorLine).join("\n");
    const contextAfter = lines.slice(cursorLine, Math.min(lines.length, cursorLine + 5)).join("\n");

    const systemPrompt = `You are a code completion assistant. Your job is to suggest the next few characters or lines of code based on the context.

Rules:
- Return ONLY the suggested code, nothing else
- Do not include explanations or markdown
- Keep suggestions short (1-3 lines max)
- Match the existing code style and indentation
- If you can't make a good suggestion, return an empty string
- Focus on completing the current statement or starting a logical next one`;

    const userMessage = `Language: ${language || "javascript"}

Code before cursor:
\`\`\`
${contextBefore}
\`\`\`

Current line (cursor at column ${cursorColumn}):
${currentLine}

Code after cursor:
\`\`\`
${contextAfter}
\`\`\`

Suggest completion for the code at the cursor position:`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 150,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const textContent = response.content.find((c) => c.type === "text");
    const suggestion = textContent && textContent.type === "text" ? textContent.text.trim() : "";

    return new Response(JSON.stringify({ suggestion }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Suggest API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get suggestion", suggestion: "" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
