import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

interface CreateProposalRequest {
  title: string;
  jobTitle: string;
  jobDescription: string;
  jobLink?: string;
  bidPrice?: number;
  estimatedHours?: number;
  platform: string;
  externalJobId?: string;
  externalJobUrl?: string;
  proposalContent: string;
  coverLetter?: string;
  aiGenerated?: boolean;
  aiModel?: string;
  aiPrompt?: string;
  confidenceScore?: number;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body: CreateProposalRequest = await req.json();

    // Validate required fields
    if (!body.title || !body.jobTitle || !body.jobDescription || !body.proposalContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create proposal
    const proposal = await prisma.proposal.create({
      data: {
        userId: user.id,
        title: body.title,
        jobTitle: body.jobTitle,
        jobDescription: body.jobDescription,
        jobLink: body.jobLink || null,
        proposalContent: body.proposalContent,
        coverLetter: body.coverLetter || null,
        bidPrice: body.bidPrice || null,
        estimatedHours: body.estimatedHours || null,
        platform: body.platform || "CUSTOM",
        externalJobId: body.externalJobId || null,
        externalJobUrl: body.externalJobUrl || null,
        aiGenerated: body.aiGenerated || false,
        aiModel: body.aiModel || null,
        aiPrompt: body.aiPrompt || null,
        confidenceScore: body.confidenceScore || null,
        status: "DRAFT",
      },
    });

    return NextResponse.json({ proposal }, { status: 201 });
  } catch (error) {
    console.error("POST /api/proposals/create error:", error);
    return NextResponse.json(
      { error: "Failed to create proposal" },
      { status: 500 }
    );
  }
}