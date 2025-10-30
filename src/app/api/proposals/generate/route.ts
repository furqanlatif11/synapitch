// app/api/proposals/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { GoogleGenerativeAI } from "@google/generative-ai";
interface GenerateRequest {
  jobTitle: string;
  jobDescription: string;
  platform: string;
  userProfile: any;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// ------------------------ Helper: Build prompt ------------------------
function buildProposalPrompt(
  jobTitle: string,
  jobDescription: string,
  platform: string,
  userProfile: any
): string {
  const profileInfo = userProfile
    ? `
User Profile:
- Headline: ${userProfile.headline}
- Skills: ${userProfile.skills?.join(", ")}
- Experience: ${userProfile.experience}
- Expertise: ${userProfile.expertise?.join(", ")}
- About: ${userProfile.about}
`
    : "";

  const platformGuide = getPlatformGuide(platform);

  return `You are an expert proposal writer. Generate a professional and compelling job proposal based on the following:

${profileInfo}

Job Title: ${jobTitle}
Job Description:
${jobDescription}

Platform: ${platform}
${platformGuide}

Please generate:
1. A professional proposal/cover message that showcases relevant skills and experience
2. Highlight why you're the best fit for this role
3. Be specific and mention relevant details from the job description
4. Keep it concise but impactful (300-400 words)
5. Include specific metrics or achievements where relevant
6. Show enthusiasm and professionalism

Format your response as:
PROPOSAL_START
[Your proposal text here]
PROPOSAL_END

COVER_LETTER_START
[Brief cover letter if needed]
COVER_LETTER_END`;
}

// ------------------------ Helper: Platform guides ------------------------
function getPlatformGuide(platform: string): string {
  const guides: Record<string, string> = {
    UPWORK:
      "This is for Upwork. Make it professional, mention relevant Upwork experience if applicable, and be concise.",
    FIVERR:
      "This is for Fiverr. Focus on quick value proposition, mention relevant gigs/services, keep it punchy.",
    LINKEDIN:
      "This is for LinkedIn Jobs. Professional tone, highlight career alignment, mention LinkedIn profile if relevant.",
    CUSTOM:
      "This is for a custom job platform. Keep it professional and versatile.",
  };

  return guides[platform] || guides.CUSTOM;
}

// ------------------------ Helper: OpenAI API Call ------------------------
async function callOpenAI(prompt: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY missing in environment!");
    throw new Error("OpenAI API key not configured");
  }

  console.log("✅ OPENAI_API_KEY found. Starting API request...");
  console.log("🧠 Prompt length:", prompt.length, "characters");

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert proposal writer who creates compelling, professional job proposals tailored to specific job descriptions and platforms.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    console.log("🔌 OpenAI response status:", response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      console.error("❌ OpenAI API Error Response:", error);
      throw new Error(error?.error?.message || "OpenAI API error");
    }

    const data: OpenAIResponse = await response.json();
    console.log("✅ OpenAI API returned successfully.");

    return data.choices[0].message.content;
  } catch (error) {
    console.error("🚨 OpenAI API call failed:", error);
    throw error;
  }
}

// ------------------------ Helper: Parse proposal output ------------------------
function parseProposalContent(content: string): {
  proposal: string;
  coverLetter: string;
} {
  const proposalMatch = content.match(
    /PROPOSAL_START\s*([\s\S]*?)\s*PROPOSAL_END/i
  );
  const coverMatch = content.match(
    /COVER_LETTER_START\s*([\s\S]*?)\s*COVER_LETTER_END/i
  );

  const proposal = proposalMatch ? proposalMatch[1].trim() : content;
  const coverLetter = coverMatch ? coverMatch[1].trim() : "";

  return { proposal, coverLetter };
}

// ------------------------ POST /api/proposals/generate ------------------------
export async function POST(req: NextRequest) {
  try {
    console.log("📩 Proposal generation request received");

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.warn("⚠️ Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body: GenerateRequest = await req.json();
    console.log("🧾 Request body:", body);

    // Validate required fields
    if (!body.jobDescription || !body.jobTitle) {
      console.warn("⚠️ Missing job title or description");
      return NextResponse.json(
        { error: "Job title and description are required" },
        { status: 400 }
      );
    }

    console.log("🔑 Checking environment variable...");
    console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);

    if (!OPENAI_API_KEY) {
      console.error("❌ No OpenAI API key found in environment");
      return NextResponse.json(
        { error: "OpenAI API is not configured" },
        { status: 500 }
      );
    }

    console.log("🧱 Building prompt...");
    const prompt = buildProposalPrompt(
      body.jobTitle,
      body.jobDescription,
      body.platform,
      body.userProfile
    );

    console.log("🚀 Calling OpenAI...");
    const generatedContent = await callOpenAI(prompt);

    console.log("📝 Parsing proposal content...");
    const { proposal, coverLetter } = parseProposalContent(generatedContent);

    console.log("✅ Proposal generated successfully!");

    return NextResponse.json({
      proposal,
      coverLetter,
      confidenceScore: 85,
      aiModel: "gpt-3.5-turbo",
    });
  } catch (error) {
    console.error("💥 Proposal generation error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Failed to generate proposal" },
      { status: 500 }
    );
  }
}

// ------------------------ GET /api/proposals/generate ------------------------
export async function GET(req: NextRequest) {
  try {
    console.log("🔍 Checking OpenAI connection...");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.warn("⚠️ Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY not found");
      return NextResponse.json(
        { status: "not_configured", message: "OpenAI API key not set" },
        { status: 200 }
      );
    }

    console.log("✅ OPENAI_API_KEY is present. Ready to use!");
    return NextResponse.json({
      status: "configured",
      message: "OpenAI API is ready",
    });
  } catch (error) {
    console.error("💥 OpenAI status check failed:", error);
    return NextResponse.json(
      { status: "error", error: "Failed to check OpenAI status" },
      { status: 500 }
    );
  }
}
