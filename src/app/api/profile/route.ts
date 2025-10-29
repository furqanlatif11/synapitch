// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

async function parseJSON(req: Request) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

function calculateProfileStrength(profile: any): number {
  let strength = 0;
  if (profile.headline?.trim()) strength += 15;
  if (profile.about?.trim()) strength += 20;
  if (Array.isArray(profile.skills) && profile.skills.length >= 3) strength += 15;
  if (profile.experience?.trim()) strength += 15;
  if (profile.education?.trim()) strength += 10;
  if (Array.isArray(profile.portfolioUrls) && profile.portfolioUrls.length > 0) strength += 15;
  if (profile.linkedinUrl?.trim()) strength += 5;
  if (profile.githubUrl?.trim()) strength += 5;
  return Math.min(strength, 100);
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ profile: user.profile ?? null });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await parseJSON(req);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if profile already exists
    const existing = await prisma.profile.findUnique({
      where: { userId: user.id }
    });
    if (existing) {
      return NextResponse.json(
        { error: "Profile already exists. Use PUT to update." },
        { status: 409 }
      );
    }

    const profileData = {
      userId: user.id,
      headline: body.headline || "",
      about: body.about || "",
      tagline: body.tagline || "",
      skills: Array.isArray(body.skills) ? body.skills : [],
      expertise: Array.isArray(body.expertise) ? body.expertise : [],
      certifications: Array.isArray(body.certifications) ? body.certifications : [],
      languages: Array.isArray(body.languages) ? body.languages : [],
      experience: body.experience || "",
      yearsExperience: body.yearsExperience ? Number(body.yearsExperience) : null,
      education: body.education || "",
      portfolioUrls: Array.isArray(body.portfolioUrls) ? body.portfolioUrls : [],
      githubUrl: body.githubUrl || "",
      linkedinUrl: body.linkedinUrl || "",
      twitterUrl: body.twitterUrl || "",
      hourlyRate: body.hourlyRate ? Number(body.hourlyRate) : null,
      projectMinBudget: body.projectMinBudget ? Number(body.projectMinBudget) : null,
      availability: body.availability || "AVAILABLE",
      isPublic: body.isPublic || false,
    };

    const profileStrength = calculateProfileStrength(profileData);

    const profile = await prisma.profile.create({
      data: {
        ...profileData,
        profileStrength,
      }
    });

    return NextResponse.json({ profile }, { status: 201 });
  } catch (error) {
    console.error("POST /api/profile error:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await parseJSON(req);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if profile exists
    const currentProfile = await prisma.profile.findUnique({
      where: { userId: user.id }
    });

    if (!currentProfile) {
      // If profile doesn't exist, create it instead
      const profileData = {
        userId: user.id,
        headline: body.headline || "",
        about: body.about || "",
        tagline: body.tagline || "",
        skills: Array.isArray(body.skills) ? body.skills : [],
        expertise: Array.isArray(body.expertise) ? body.expertise : [],
        certifications: Array.isArray(body.certifications) ? body.certifications : [],
        languages: Array.isArray(body.languages) ? body.languages : [],
        experience: body.experience || "",
        yearsExperience: body.yearsExperience ? Number(body.yearsExperience) : null,
        education: body.education || "",
        portfolioUrls: Array.isArray(body.portfolioUrls) ? body.portfolioUrls : [],
        githubUrl: body.githubUrl || "",
        linkedinUrl: body.linkedinUrl || "",
        twitterUrl: body.twitterUrl || "",
        hourlyRate: body.hourlyRate ? Number(body.hourlyRate) : null,
        projectMinBudget: body.projectMinBudget ? Number(body.projectMinBudget) : null,
        availability: body.availability || "AVAILABLE",
        isPublic: body.isPublic || false,
      };

      const profileStrength = calculateProfileStrength(profileData);

      const profile = await prisma.profile.create({
        data: {
          ...profileData,
          profileStrength,
        }
      });

      return NextResponse.json({ profile }, { status: 201 });
    }

    const updateData: any = {
      headline: body.headline ?? currentProfile.headline,
      about: body.about ?? currentProfile.about,
      tagline: body.tagline ?? currentProfile.tagline,
      skills: Array.isArray(body.skills) ? body.skills : currentProfile.skills,
      expertise: Array.isArray(body.expertise) ? body.expertise : currentProfile.expertise,
      certifications: Array.isArray(body.certifications) ? body.certifications : currentProfile.certifications,
      languages: Array.isArray(body.languages) ? body.languages : currentProfile.languages,
      experience: body.experience ?? currentProfile.experience,
      yearsExperience: body.yearsExperience !== undefined ? Number(body.yearsExperience) : currentProfile.yearsExperience,
      education: body.education ?? currentProfile.education,
      portfolioUrls: Array.isArray(body.portfolioUrls) ? body.portfolioUrls : currentProfile.portfolioUrls,
      githubUrl: body.githubUrl ?? currentProfile.githubUrl,
      linkedinUrl: body.linkedinUrl ?? currentProfile.linkedinUrl,
      twitterUrl: body.twitterUrl ?? currentProfile.twitterUrl,
      hourlyRate: body.hourlyRate ? Number(body.hourlyRate) : currentProfile.hourlyRate,
      projectMinBudget: body.projectMinBudget ? Number(body.projectMinBudget) : currentProfile.projectMinBudget,
      availability: body.availability ?? currentProfile.availability,
      isPublic: body.isPublic ?? currentProfile.isPublic,
    };

    // Calculate new profile strength
    updateData.profileStrength = calculateProfileStrength(updateData);

    const updated = await prisma.profile.update({
      where: { userId: user.id },
      data: updateData,
    });

    return NextResponse.json({ profile: updated });
  } catch (error) {
    console.error("PUT /api/profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.profile.delete({
      where: { userId: user.id }
    });

    return NextResponse.json({
      message: "Profile deleted successfully"
    });
  } catch (error) {
    console.error("DELETE /api/profile error:", error);
    return NextResponse.json(
      { error: "Failed to delete profile" },
      { status: 500 }
    );
  }
}