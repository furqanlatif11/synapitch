import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

export async function GET(req: NextRequest) {
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

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const platform = searchParams.get("platform");

    // Build where clause
    const where: any = { userId: user.id };
    if (status && status !== "ALL") where.status = status;
    if (platform && platform !== "ALL") where.platform = platform;

    // Fetch proposals sorted by creation date (newest first)
    const proposals = await prisma.proposal.findMany({
      where,
      select: {
        id: true,
        title: true,
        jobTitle: true,
        status: true,
        bidPrice: true,
        currency: true,
        platform: true,
        createdAt: true,
        submittedAt: true,
        responseAt: true,
        aiGenerated: true,
        confidenceScore: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      proposals,
      total: proposals.length,
    });
  } catch (error) {
    console.error("GET /api/proposals error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}