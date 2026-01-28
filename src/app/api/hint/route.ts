import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { code, language, errorMessage, cursorLine } = await request.json();

    if (!code) {
      return new Response(JSON.stringify({ error: "Code is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a friendly coding tutor helping beginners learn to code. Your job is to provide helpful hints without giving away the complete solution.

Rules:
- Give hints that guide the learner toward the solution
- Don't provide the complete code fix
- Use simple, encouraging language
- Focus on teaching the concept, not just fixing the error
- If there's an error, explain what the error means first
- Suggest one step at a time
- Keep hints concise (2-3 sentences max)`;

    let userMessage = `I'm working on some ${language || "code"} and I need a hint.

Here's my code:
\`\`\`${language || ""}
${code}
\`\`\``;

    if (errorMessage) {
      userMessage += `\n\nI'm getting this error: ${errorMessage}`;
    }

    if (cursorLine) {
      userMessage += `\n\nI'm currently on line ${cursorLine}.`;
    }

    userMessage += `\n\nPlease give me a helpful hint (not the answer!) to point me in the right direction.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const textContent = response.content.find((c) => c.type === "text");
    const hint = textContent && textContent.type === "text" ? textContent.text : "";

    return new Response(JSON.stringify({ hint }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Hint API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get hint", hint: "" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
