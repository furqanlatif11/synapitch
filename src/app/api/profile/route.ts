// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

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

interface ProfileStrengthCalculation {
  headline?: string;
  about?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  portfolioUrls?: string[];
  linkedinUrl?: string;
  githubUrl?: string;
}

function calculateProfileStrength(profile: ProfileStrengthCalculation): number {
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
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch profile separately
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({ profile: profile ?? null });
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
      headline: data.headline ?? "",
      about: data.about ?? "",
      tagline: data.tagline ?? "",
      skills: Array.isArray(data.skills) ? data.skills : [],
      expertise: Array.isArray(data.expertise) ? data.expertise : [],
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
      languages: Array.isArray(data.languages) ? data.languages : [],
      experience: data.experience ?? "",
      yearsExperience: data.yearsExperience !== undefined && data.yearsExperience !== null 
        ? Number(data.yearsExperience) 
        : null,
      education: data.education ?? "",
      portfolioUrls: Array.isArray(data.portfolioUrls) ? data.portfolioUrls : [],
      githubUrl: data.githubUrl ?? "",
      linkedinUrl: data.linkedinUrl ?? "",
      twitterUrl: data.twitterUrl ?? "",
      hourlyRate: data.hourlyRate !== undefined && data.hourlyRate !== null 
        ? Number(data.hourlyRate) 
        : null,
      projectMinBudget: data.projectMinBudget !== undefined && data.projectMinBudget !== null 
        ? Number(data.projectMinBudget) 
        : null,
      availability: data.availability ?? "AVAILABLE",
      isPublic: data.isPublic ?? false,
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
        headline: data.headline ?? "",
        about: data.about ?? "",
        tagline: data.tagline ?? "",
        skills: Array.isArray(data.skills) ? data.skills : [],
        expertise: Array.isArray(data.expertise) ? data.expertise : [],
        certifications: Array.isArray(data.certifications) ? data.certifications : [],
        languages: Array.isArray(data.languages) ? data.languages : [],
        experience: data.experience ?? "",
        yearsExperience: data.yearsExperience !== undefined && data.yearsExperience !== null 
          ? Number(data.yearsExperience) 
          : null,
        education: data.education ?? "",
        portfolioUrls: Array.isArray(data.portfolioUrls) ? data.portfolioUrls : [],
        githubUrl: data.githubUrl ?? "",
        linkedinUrl: data.linkedinUrl ?? "",
        twitterUrl: data.twitterUrl ?? "",
        hourlyRate: data.hourlyRate !== undefined && data.hourlyRate !== null 
          ? Number(data.hourlyRate) 
          : null,
        projectMinBudget: data.projectMinBudget !== undefined && data.projectMinBudget !== null 
          ? Number(data.projectMinBudget) 
          : null,
        availability: data.availability ?? "AVAILABLE",
        isPublic: data.isPublic ?? false,
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

    // Build update data object
    const updateData = {
      headline: data.headline !== undefined ? data.headline : currentProfile.headline,
      about: data.about !== undefined ? data.about : currentProfile.about,
      tagline: data.tagline !== undefined ? data.tagline : currentProfile.tagline,
      skills: Array.isArray(data.skills) ? data.skills : currentProfile.skills,
      expertise: Array.isArray(data.expertise) ? data.expertise : currentProfile.expertise,
      certifications: Array.isArray(data.certifications) ? data.certifications : currentProfile.certifications,
      languages: Array.isArray(data.languages) ? data.languages : currentProfile.languages,
      experience: data.experience !== undefined ? data.experience : currentProfile.experience,
      yearsExperience: data.yearsExperience !== undefined 
        ? (data.yearsExperience !== null ? Number(data.yearsExperience) : null)
        : currentProfile.yearsExperience,
      education: data.education !== undefined ? data.education : currentProfile.education,
      portfolioUrls: Array.isArray(data.portfolioUrls) ? data.portfolioUrls : currentProfile.portfolioUrls,
      githubUrl: data.githubUrl !== undefined ? data.githubUrl : currentProfile.githubUrl,
      linkedinUrl: data.linkedinUrl !== undefined ? data.linkedinUrl : currentProfile.linkedinUrl,
      twitterUrl: data.twitterUrl !== undefined ? data.twitterUrl : currentProfile.twitterUrl,
      hourlyRate: data.hourlyRate !== undefined 
        ? (data.hourlyRate !== null ? Number(data.hourlyRate) : null)
        : currentProfile.hourlyRate,
      projectMinBudget: data.projectMinBudget !== undefined 
        ? (data.projectMinBudget !== null ? Number(data.projectMinBudget) : null)
        : currentProfile.projectMinBudget,
      availability: data.availability !== undefined ? data.availability : currentProfile.availability,
      isPublic: data.isPublic !== undefined ? data.isPublic : currentProfile.isPublic,
      profileStrength: 0, // Will be calculated below
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