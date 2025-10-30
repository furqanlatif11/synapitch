// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";
import type { Profile } from "@prisma/client";

async function parseJSON(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

interface ProfileData {
  headline?: string;
  about?: string;
  tagline?: string;
  skills?: string[];
  expertise?: string[];
  certifications?: string[];
  languages?: string[];
  experience?: string;
  yearsExperience?: number | null;
  education?: string;
  portfolioUrls?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  hourlyRate?: number | null;
  projectMinBudget?: number | null;
  availability?: string;
  isPublic?: boolean;
}

function calculateProfileStrength(profile: Partial<Profile>): number {
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

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        profile: true,
      },
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
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const data = body as ProfileData;

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
      headline: data.headline || "",
      about: data.about || "",
      tagline: data.tagline || "",
      skills: Array.isArray(data.skills) ? data.skills : [],
      expertise: Array.isArray(data.expertise) ? data.expertise : [],
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
      languages: Array.isArray(data.languages) ? data.languages : [],
      experience: data.experience || "",
      yearsExperience: data.yearsExperience ? Number(data.yearsExperience) : null,
      education: data.education || "",
      portfolioUrls: Array.isArray(data.portfolioUrls) ? data.portfolioUrls : [],
      githubUrl: data.githubUrl || "",
      linkedinUrl: data.linkedinUrl || "",
      twitterUrl: data.twitterUrl || "",
      hourlyRate: data.hourlyRate ? Number(data.hourlyRate) : null,
      projectMinBudget: data.projectMinBudget ? Number(data.projectMinBudget) : null,
      availability: data.availability || "AVAILABLE",
      isPublic: data.isPublic || false,
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
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const data = body as ProfileData;

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
        headline: data.headline || "",
        about: data.about || "",
        tagline: data.tagline || "",
        skills: Array.isArray(data.skills) ? data.skills : [],
        expertise: Array.isArray(data.expertise) ? data.expertise : [],
        certifications: Array.isArray(data.certifications) ? data.certifications : [],
        languages: Array.isArray(data.languages) ? data.languages : [],
        experience: data.experience || "",
        yearsExperience: data.yearsExperience ? Number(data.yearsExperience) : null,
        education: data.education || "",
        portfolioUrls: Array.isArray(data.portfolioUrls) ? data.portfolioUrls : [],
        githubUrl: data.githubUrl || "",
        linkedinUrl: data.linkedinUrl || "",
        twitterUrl: data.twitterUrl || "",
        hourlyRate: data.hourlyRate ? Number(data.hourlyRate) : null,
        projectMinBudget: data.projectMinBudget ? Number(data.projectMinBudget) : null,
        availability: data.availability || "AVAILABLE",
        isPublic: data.isPublic || false,
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

    const updateData: Partial<Profile> = {
      headline: data.headline ?? currentProfile.headline,
      about: data.about ?? currentProfile.about,
      tagline: data.tagline ?? currentProfile.tagline,
      skills: Array.isArray(data.skills) ? data.skills : currentProfile.skills,
      expertise: Array.isArray(data.expertise) ? data.expertise : currentProfile.expertise,
      certifications: Array.isArray(data.certifications) ? data.certifications : currentProfile.certifications,
      languages: Array.isArray(data.languages) ? data.languages : currentProfile.languages,
      experience: data.experience ?? currentProfile.experience,
      yearsExperience: data.yearsExperience !== undefined ? Number(data.yearsExperience) : currentProfile.yearsExperience,
      education: data.education ?? currentProfile.education,
      portfolioUrls: Array.isArray(data.portfolioUrls) ? data.portfolioUrls : currentProfile.portfolioUrls,
      githubUrl: data.githubUrl ?? currentProfile.githubUrl,
      linkedinUrl: data.linkedinUrl ?? currentProfile.linkedinUrl,
      twitterUrl: data.twitterUrl ?? currentProfile.twitterUrl,
      hourlyRate: data.hourlyRate ? Number(data.hourlyRate) : currentProfile.hourlyRate,
      projectMinBudget: data.projectMinBudget ? Number(data.projectMinBudget) : currentProfile.projectMinBudget,
      availability: data.availability ?? currentProfile.availability,
      isPublic: data.isPublic ?? currentProfile.isPublic,
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

export async function DELETE() {
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