"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Star,
  Sparkles,
} from "lucide-react";
import { User, Zap, Link, DollarSign, TrendingUp } from "lucide-react";

interface ProfilePayload {
  headline: string;
  about: string;
  tagline: string;
  skills: string[];
  expertise: string[];
  certifications: string[];
  languages: string[];
  experience: string;
  yearsExperience: number | null;
  education: string;
  portfolioUrls: string[];
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  hourlyRate: number | null;
  projectMinBudget: number | null;
  availability: string;
  isPublic: boolean;
}

const SKILL_SUGGESTIONS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "GraphQL",
  "Vue.js",
  "Angular",
  "Tailwind CSS",
  "Express.js",
  "Firebase",
];

const AVAILABILITY_OPTIONS = [
  {
    value: "AVAILABLE",
    label: "Available Now",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: "✓",
  },
  {
    value: "BUSY",
    label: "Limited Time",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "⏱",
  },
  {
    value: "ON_BREAK",
    label: "On Break",
    color: "bg-gray-50 text-gray-700 border-gray-200",
    icon: "⏸",
  },
];

const INITIAL_PROFILE: ProfilePayload = {
  headline: "",
  about: "",
  tagline: "",
  skills: [],
  expertise: [],
  certifications: [],
  languages: [],
  experience: "",
  yearsExperience: null,
  education: "",
  portfolioUrls: [],
  githubUrl: "",
  linkedinUrl: "",
  twitterUrl: "",
  hourlyRate: null,
  projectMinBudget: null,
  availability: "AVAILABLE",
  isPublic: false,
};

export default function SynapitchProfileDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [profileStrength, setProfileStrength] = useState(0);
  const [newSkill, setNewSkill] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState<ProfilePayload>(INITIAL_PROFILE);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (!mounted) return;
        if (data.profile) {
          const loadedProfile: ProfilePayload = {
            headline: data.profile.headline ?? "",
            about: data.profile.about ?? "",
            tagline: data.profile.tagline ?? "",
            skills: Array.isArray(data.profile.skills)
              ? data.profile.skills
              : [],
            expertise: Array.isArray(data.profile.expertise)
              ? data.profile.expertise
              : [],
            certifications: Array.isArray(data.profile.certifications)
              ? data.profile.certifications
              : [],
            languages: Array.isArray(data.profile.languages)
              ? data.profile.languages
              : [],
            experience: data.profile.experience ?? "",
            yearsExperience: data.profile.yearsExperience ?? null,
            education: data.profile.education ?? "",
            portfolioUrls: Array.isArray(data.profile.portfolioUrls)
              ? data.profile.portfolioUrls
              : [],
            githubUrl: data.profile.githubUrl ?? "",
            linkedinUrl: data.profile.linkedinUrl ?? "",
            twitterUrl: data.profile.twitterUrl ?? "",
            hourlyRate: data.profile.hourlyRate ?? null,
            projectMinBudget: data.profile.projectMinBudget ?? null,
            availability: data.profile.availability ?? "AVAILABLE",
            isPublic: data.profile.isPublic ?? false,
          };
          setProfile(loadedProfile);
          calculateStrength(loadedProfile);
        }
      } catch (err) {
        console.error("Load profile", err);
        setErrorMessage("Failed to load profile. Please try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const calculateStrength = (prof: ProfilePayload) => {
    let strength = 0;
    if (prof.headline.trim()) strength += 15;
    if (prof.about.trim()) strength += 20;
    if (prof.skills.length >= 3) strength += 15;
    if (prof.experience.trim()) strength += 15;
    if (prof.education.trim()) strength += 10;
    if (prof.portfolioUrls.length > 0) strength += 15;
    if (prof.linkedinUrl.trim()) strength += 5;
    if (prof.githubUrl.trim()) strength += 5;
    setProfileStrength(Math.min(strength, 100));
  };

  const handleField = <K extends keyof ProfilePayload>(
    k: K,
    v: ProfilePayload[K]
  ) => {
    const updated = { ...profile, [k]: v };
    setProfile(updated);
    calculateStrength(updated);
  };

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !profile.skills.includes(trimmedSkill)) {
      const updatedSkills = [...profile.skills, trimmedSkill];
      handleField("skills", updatedSkills);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    const updatedSkills = profile.skills.filter((s) => s !== skill);
    handleField("skills", updatedSkills);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setSaving(true);
    try {
      if (!profile.headline.trim() && profile.skills.length === 0) {
        setErrorMessage("Please add at least a headline or some skills.");
        setSaving(false);
        return;
      }

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to save profile");
      } else {
        setSuccessMessage("Profile saved successfully! ✓");
        const loadedProfile: ProfilePayload = {
          headline: data.profile.headline ?? "",
          about: data.profile.about ?? "",
          tagline: data.profile.tagline ?? "",
          skills: Array.isArray(data.profile.skills) ? data.profile.skills : [],
          expertise: Array.isArray(data.profile.expertise)
            ? data.profile.expertise
            : [],
          certifications: Array.isArray(data.profile.certifications)
            ? data.profile.certifications
            : [],
          languages: Array.isArray(data.profile.languages)
            ? data.profile.languages
            : [],
          experience: data.profile.experience ?? "",
          yearsExperience: data.profile.yearsExperience ?? null,
          education: data.profile.education ?? "",
          portfolioUrls: Array.isArray(data.profile.portfolioUrls)
            ? data.profile.portfolioUrls
            : [],
          githubUrl: data.profile.githubUrl ?? "",
          linkedinUrl: data.profile.linkedinUrl ?? "",
          twitterUrl: data.profile.twitterUrl ?? "",
          hourlyRate: data.profile.hourlyRate ?? null,
          projectMinBudget: data.profile.projectMinBudget ?? null,
          availability: data.profile.availability ?? "AVAILABLE",
          isPublic: data.profile.isPublic ?? false,
        };
        setProfile(loadedProfile);
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (err) {
      console.error("Save error:", err);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 font-semibold text-lg">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  const availability = AVAILABILITY_OPTIONS.find(
    (a) => a.value === profile.availability
  );

  const tabs = [
    { id: "basic", label: "Essentials", icon: User },
    { id: "skills", label: "Expertise", icon: Zap },
    { id: "portfolio", label: "Presence", icon: Link },
    { id: "rates", label: "Pricing", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      {/* <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Synapitch</h1>
                <p className="text-gray-500 text-xs font-medium">AI-Powered Proposals</p>
              </div>
            </div>
            
          </div>
        
        </div>
      </div> */}

      <div className=" mx-auto px-6 py-8">
        {/* Alerts */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-700">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-16 space-y-2 bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
              <div className="bg-white border border-green-600 rounded-lg px-6 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {profileStrength}%
                    </div>
                    <p className="text-gray-500 text-xs">Profile Strength</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 font-semibold">
                    Completeness
                  </span>
                  <span className="text-emerald-600 font-bold">
                    {profileStrength}/100
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-700"
                    style={{ width: `${profileStrength}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* Tab Content */}
              <div className="p-8 space-y-6">
                {/* Basic Info Tab */}
                {activeTab === "basic" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <User className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Professional Essentials
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Build your foundation
                        </p>
                      </div>
                    </div>

                    {/* Headline */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Professional Headline{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        value={profile.headline}
                        onChange={(e) =>
                          handleField("headline", e.target.value)
                        }
                        placeholder="Senior Full-Stack Developer | AI Specialist"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-2 text-right">
                        {profile.headline.length}/100
                      </p>
                    </div>

                    {/* Tagline */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Tagline
                      </label>
                      <input
                        type="text"
                        maxLength={60}
                        value={profile.tagline}
                        onChange={(e) => handleField("tagline", e.target.value)}
                        placeholder="Building scalable solutions with modern tech"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* About */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Professional Summary{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={profile.about}
                        onChange={(e) => handleField("about", e.target.value)}
                        placeholder="Tell potential clients about your experience and achievements..."
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Years & Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Experience (Years)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={profile.yearsExperience ?? ""}
                          onChange={(e) =>
                            handleField(
                              "yearsExperience",
                              e.target.value ? Number(e.target.value) : null
                            )
                          }
                          placeholder="5"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Education
                        </label>
                        <input
                          type="text"
                          value={profile.education}
                          onChange={(e) =>
                            handleField("education", e.target.value)
                          }
                          placeholder="BSc Computer Science"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Experience Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Experience Summary
                      </label>
                      <textarea
                        rows={3}
                        value={profile.experience}
                        onChange={(e) =>
                          handleField("experience", e.target.value)
                        }
                        placeholder="Brief overview of your professional journey..."
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Zap className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Your Expertise
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Showcase your talents
                        </p>
                      </div>
                    </div>

                    {/* Skills Input */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Add Technical Skills{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addSkill(newSkill))
                          }
                          placeholder="e.g., React, Node.js, PostgreSQL"
                          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => addSkill(newSkill)}
                          className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-bold shadow-sm"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quick Add */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          Quick suggestions:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {SKILL_SUGGESTIONS.filter(
                            (s) => !profile.skills.includes(s)
                          )
                            .slice(0, 6)
                            .map((skill) => (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => addSkill(skill)}
                                className="px-3 py-1.5 text-xs bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 border border-emerald-300 transition-all font-medium"
                              >
                                + {skill}
                              </button>
                            ))}
                        </div>
                      </div>

                      {/* Skills Display */}
                      {profile.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-3 bg-white rounded-lg border border-gray-300">
                          {profile.skills.map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-full text-sm font-semibold border border-emerald-300"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="hover:text-red-600 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Expertise */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Areas of Expertise
                      </label>
                      <textarea
                        rows={3}
                        value={profile.expertise.join(", ")}
                        onChange={(e) =>
                          handleField(
                            "expertise",
                            e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                          )
                        }
                        placeholder="Web Development, Mobile Apps, AI/ML, DevOps"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Languages & Certifications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Languages
                        </label>
                        <input
                          type="text"
                          value={profile.languages.join(", ")}
                          onChange={(e) =>
                            handleField(
                              "languages",
                              e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean)
                            )
                          }
                          placeholder="English, Urdu, Spanish"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Certifications
                        </label>
                        <input
                          type="text"
                          value={profile.certifications.join(", ")}
                          onChange={(e) =>
                            handleField(
                              "certifications",
                              e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean)
                            )
                          }
                          placeholder="AWS Solutions Architect"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === "portfolio" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Link className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Online Presence
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Connect your profiles
                        </p>
                      </div>
                    </div>

                    {/* Portfolio URLs */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Portfolio URLs
                      </label>
                      <textarea
                        rows={3}
                        value={profile.portfolioUrls.join("\n")}
                        onChange={(e) =>
                          handleField(
                            "portfolioUrls",
                            e.target.value
                              .split("\n")
                              .map((s) => s.trim())
                              .filter(Boolean)
                          )
                        }
                        placeholder="One URL per line"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all resize-none font-mono text-sm"
                      />
                    </div>

                    {/* Social Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                        <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="text-lg">🐙</span> GitHub
                        </label>
                        <input
                          type="url"
                          value={profile.githubUrl}
                          onChange={(e) =>
                            handleField("githubUrl", e.target.value)
                          }
                          placeholder="https://github.com/username"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all text-sm"
                        />
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                        <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="text-lg">💼</span> LinkedIn
                        </label>
                        <input
                          type="url"
                          value={profile.linkedinUrl}
                          onChange={(e) =>
                            handleField("linkedinUrl", e.target.value)
                          }
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all text-sm"
                        />
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                        <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="text-lg">𝕏</span> Twitter/X
                        </label>
                        <input
                          type="url"
                          value={profile.twitterUrl}
                          onChange={(e) =>
                            handleField("twitterUrl", e.target.value)
                          }
                          placeholder="https://twitter.com/username"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Rates Tab */}
                {activeTab === "rates" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Pricing & Availability
                        </h2>
                        <p className="text-gray-500 text-sm">Set your rates</p>
                      </div>
                    </div>

                    {/* Rates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Hourly Rate (PKR)
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold">₨</span>
                          <input
                            type="number"
                            min="0"
                            value={profile.hourlyRate ?? ""}
                            onChange={(e) =>
                              handleField(
                                "hourlyRate",
                                e.target.value ? Number(e.target.value) : null
                              )
                            }
                            placeholder="2000"
                            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Min Project Budget (PKR)
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold">₨</span>
                          <input
                            type="number"
                            min="0"
                            value={profile.projectMinBudget ?? ""}
                            onChange={(e) =>
                              handleField(
                                "projectMinBudget",
                                e.target.value ? Number(e.target.value) : null
                              )
                            }
                            placeholder="50000"
                            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />{" "}
                        Availability Status
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {AVAILABILITY_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              handleField("availability", opt.value)
                            }
                            className={`p-4 rounded-lg font-bold text-center transition-all border-2 ${
                              profile.availability === opt.value
                                ? `${opt.color} ring-2 ring-offset-2 ring-emerald-600`
                                : `${opt.color} opacity-60 hover:opacity-100`
                            }`}
                          >
                            <div className="text-2xl mb-2">{opt.icon}</div>
                            <div className="text-xs">{opt.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Public Profile */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all cursor-pointer">
                      <label className="flex items-center gap-4 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="isPublic"
                            checked={profile.isPublic}
                            onChange={(e) =>
                              handleField("isPublic", e.target.checked)
                            }
                            className="w-5 h-5 rounded accent-emerald-600 cursor-pointer"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Public Profile
                          </div>
                          <p className="text-xs text-gray-600">
                            Make your profile discoverable in search results
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 bg-gray-50 px-8 py-6 flex justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      confirm(
                        "Delete your profile permanently? This cannot be undone."
                      )
                    ) {
                      // Handle delete
                    }
                  }}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-semibold flex items-center gap-2 border border-red-300"
                >
                  <Trash2 className="w-5 h-5" /> Delete
                </button>
                <button
                  disabled={saving}
                  onClick={onSubmit}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 shadow-sm"
                >
                  <Save className="w-5 h-5" />{" "}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="mt-8">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-emerald-50 border-b border-gray-200 px-8 py-4 flex items-center gap-3">
              <Star className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-gray-900">Live Preview</h3>
            </div>
            <div className="p-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {profile.headline || "Your Professional Headline"}
                    </h2>
                    <p className="text-emerald-600 mt-2 text-sm font-semibold">
                      {profile.tagline || "Your tagline"}
                    </p>
                  </div>
                  {availability && (
                    <div
                      className={`px-4 py-2 rounded-full font-bold text-xs ${availability.color} border`}
                    >
                      {availability.label}
                    </div>
                  )}
                </div>
                {profile.about && (
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-3">
                    {profile.about}
                  </p>
                )}
                {profile.skills.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">
                      Top Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.slice(0, 8).map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {profile.skills.length > 8 && (
                        <span className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                          +{profile.skills.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
