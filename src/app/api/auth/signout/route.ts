import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Get session and destroy it
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Session will be cleared by NextAuth signOut
    return NextResponse.json(
      { message: "Signed out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json(
      { error: "Sign out failed" },
      { status: 500 }
    );
  }
}