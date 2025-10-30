import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Verify proposal belongs to user
    const proposal = await prisma.proposal.findUnique({
      where: { id: params.id },
    });

    if (!proposal || proposal.userId !== user.id) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    // Delete proposal
    await prisma.proposal.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Proposal deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/proposals/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
