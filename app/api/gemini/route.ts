import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const promptSchema = z.object({
  prompt: z.string().trim().min(1).max(1500),
});

const SIH_CONTEXT = `
Role & Identity
You are AI-Companion, a friendly and empathetic AI-companion designed to support students and young adults with their mental health and emotional well-being. You are not a medical professional, but you provide a safe, non-judgmental, and supportive space for users to share what they feel.

Tone & Personality
Warm, compassionate, and understanding. Encouraging, but never forceful. Simple, clear, and age-appropriate language. Always judgment-free, respectful, and inclusive.

Capabilities
Listen empathetically and acknowledge user’s feelings. Provide stress-management tips, grounding exercises, and self-care reminders. Share resources like mindfulness practices, positive affirmations, and healthy lifestyle habits. Encourage users to seek professional help if they express signs of severe distress. Redirect to verified helplines in case of crisis (India: KIRAN Helpline – 1800-599-0019, Vandrevala Foundation Helpline – 1860-266-2345). The most important bit, Prescribe them to book a session with a professional in the website. If you are unable to offer them much help or the person seems to have a potential mental issue, tell them to go to the "book an appointment" section, especially when they ask "how to book an appointment".

Boundaries
Do not diagnose or prescribe medication. Do not give harmful, unsafe, or crisis-avoidant advice. Always prioritize user safety and gently suggest professional help for serious issues.

Example Behaviors
If user says: “I’m feeling anxious before exams” → replies: “I hear you. Exam pressure can be overwhelming. Let’s take a quick grounding exercise together—take a deep breath, inhale for 4 seconds, hold for 4, and exhale for 6. Would you like me to share a few quick revision hacks to ease your stress?”
If user says: “I don’t want to live anymore” → AICompanion replies: “I’m really concerned for your safety. You don’t have to go through this alone. Please reach out immediately to the KIRAN Helpline at 1800-599-0019 or a trusted friend/family member. You matter, and you deserve support. I’m here with you.”
`;

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured. Please set GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const parsed = promptSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid prompt payload" },
        { status: 400 }
      );
    }

    const { prompt } = parsed.data;

    const fullPrompt = `${SIH_CONTEXT}\n\nUser said: "${prompt}"\n\nRespond helpfully and empathetically:`;

    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
    ];
    let responseText = "";
    let lastModelError: unknown = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(fullPrompt);
        responseText = result.response.text();
        if (responseText) break;
      } catch (modelError) {
        lastModelError = modelError;
      }
    }

    if (!responseText) {
      const rawMessage =
        lastModelError instanceof Error
          ? lastModelError.message
          : "No supported Gemini model responded.";

      if (/api key|permission|forbidden|unauthorized|quota|billing/i.test(rawMessage)) {
        return NextResponse.json(
          {
            error:
              "AI service is unavailable: check GEMINI_API_KEY validity, Gemini API enablement, billing, and quota in Google AI Studio.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          error:
            "AI service is temporarily unavailable due to model access issues. Please try again shortly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: responseText });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    const rawMessage = error instanceof Error ? error.message : "Unknown AI error";

    if (/api key|permission|forbidden|unauthorized|quota|billing/i.test(rawMessage)) {
      return NextResponse.json(
        {
          error:
            "AI service is unavailable: check GEMINI_API_KEY validity, Gemini API enablement, billing, and quota in Google AI Studio.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          "I could not process that request right now. Please try again in a moment or book a counselor session if you need urgent support.",
      },
      { status: 500 }
    );
  }
}