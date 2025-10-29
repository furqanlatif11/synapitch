"use client";

import React, { useEffect, useState } from "react";
import { Plus, X, Save, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { User, Zap, Link, DollarSign } from "lucide-react";

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
    color: "bg-emerald-100 text-emerald-800",
    icon: "✓",
  },
  {
    value: "BUSY",
    label: "Limited Availability",
    color: "bg-amber-100 text-amber-800",
    icon: "⏱",
  },
  {
    value: "ON_BREAK",
    label: "On Break",
    color: "bg-slate-100 text-slate-800",
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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-700 font-medium">
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
    { id: "basic", label: "Basic Info", icon: User },
    { id: "skills", label: "Skills & Expertise", icon: Zap },
    { id: "portfolio", label: "Portfolio & Links", icon: Link },
    { id: "rates", label: "Rates & Availability", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white sticky top-0 z-10 shadow-lg mx-6 rounded-xl">
        <div className=" mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Synapitch Profile</h1>
              <p className="text-emerald-100 mt-2 text-sm font-medium">
                AI-Powered Proposal Generation
              </p>
            </div>
            <div className="text-right bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white border-opacity-20">
              <div className="text-4xl text-green-600 font-bold">
                {profileStrength}%
              </div>
              <p className="text-green-600 text-xs font-medium mt-1">
                Profile Strength
              </p>
            </div>
          </div>

          {/* Profile Strength Bar */}
          <div className="mt-6 bg-emerald-700 bg-opacity-50 rounded-full h-2 overflow-hidden border border-emerald-400 border-opacity-30">
            <div
              className="bg-gradient-to-r from-emerald-300 to-teal-300 h-full transition-all duration-500 shadow-lg"
              style={{ width: `${profileStrength}%` }}
            />
          </div>
        </div>
      </div>

      <div className=" mx-auto px-6 py-8">
        {/* Messages */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-emerald-100">
          {/* Tabs */}
          <div className="flex border-b bg-gradient-to-r from-emerald-50 to-teal-50 overflow-x-auto">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-max px-6 py-4 font-semibold text-center transition-all relative group ${
                  activeTab === tab.id
                    ? "text-emerald-700 bg-white"
                    : "text-slate-600 hover:text-emerald-600"
                }`}
              >
                <button key={tab.id} className="flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Basic Info Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Professional Headline{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={profile.headline}
                    onChange={(e) => handleField("headline", e.target.value)}
                    placeholder="e.g., Senior Full-Stack Developer | AI & Web3 Specialist"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-slate-500 mt-2 text-right">
                    {profile.headline.length}/100
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    One-Line Tagline
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    value={profile.tagline}
                    onChange={(e) => handleField("tagline", e.target.value)}
                    placeholder="e.g., Building scalable solutions with modern tech"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Professional Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    value={profile.about}
                    onChange={(e) => handleField("about", e.target.value)}
                    placeholder="Tell potential clients about your experience, achievements, and what makes you unique..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Years of Experience
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
                      placeholder="e.g., 5"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Last Education
                    </label>
                    <input
                      type="text"
                      value={profile.education}
                      onChange={(e) => handleField("education", e.target.value)}
                      placeholder="e.g., BSc Computer Science"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Experience Summary
                  </label>
                  <textarea
                    rows={3}
                    value={profile.experience}
                    onChange={(e) => handleField("experience", e.target.value)}
                    placeholder="Brief overview of your professional journey..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Technical Skills <span className="text-red-500">*</span>
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
                      placeholder="Add a skill and press Enter..."
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => addSkill(newSkill)}
                      className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all font-semibold shadow-md"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quick add suggestions */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-600 mb-3">
                      Quick add suggestions:
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
                            className="px-3 py-1.5 text-sm bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-all font-medium border border-emerald-300"
                          >
                            + {skill}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Skills display */}
                  {profile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                      {profile.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-2 bg-white text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold border-2 border-emerald-300 shadow-sm"
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

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
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
                    placeholder="e.g., Web Development, Mobile Apps, AI/ML, DevOps"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
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
                      placeholder="e.g., English, Urdu, Spanish"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
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
                      placeholder="e.g., AWS Solutions Architect"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === "portfolio" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={profile.githubUrl}
                      onChange={(e) => handleField("githubUrl", e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={profile.linkedinUrl}
                      onChange={(e) =>
                        handleField("linkedinUrl", e.target.value)
                      }
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Twitter/X URL
                    </label>
                    <input
                      type="url"
                      value={profile.twitterUrl}
                      onChange={(e) =>
                        handleField("twitterUrl", e.target.value)
                      }
                      placeholder="https://twitter.com/username"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Rates Tab */}
            {activeTab === "rates" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Hourly Rate (PKR)
                    </label>
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
                      placeholder="e.g., 2000"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Minimum Project Budget (PKR)
                    </label>
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
                      placeholder="e.g., 50000"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-6">
                  <h4 className="font-bold text-emerald-900 mb-4 text-lg">
                    Availability Status
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {AVAILABILITY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleField("availability", opt.value)}
                        className={`p-4 rounded-lg font-bold text-center transition-all border-2 ${
                          profile.availability === opt.value
                            ? `${opt.color} ring-2 ring-offset-2 ring-emerald-500 border-emerald-400`
                            : `${opt.color} opacity-60 hover:opacity-100 border-transparent`
                        }`}
                      >
                        <div className="text-2xl mb-2">{opt.icon}</div>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-all">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={profile.isPublic}
                    onChange={(e) => handleField("isPublic", e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-emerald-400 text-emerald-600 accent-emerald-600"
                  />
                  <label
                    htmlFor="isPublic"
                    className="text-sm font-bold text-emerald-900 cursor-pointer flex-1"
                  >
                    Make profile public (visible in search results)
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to delete your profile? This action cannot be undone."
                  )
                ) {
                  // Handle delete
                }
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-semibold flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" /> Delete Profile
            </button>
            <button
              disabled={saving}
              onClick={onSubmit}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg"
            >
              <Save className="w-5 h-5" />{" "}
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>

        {/* Profile Preview Card */}
        <div className="mt-8 bg-white rounded-xl shadow-xl overflow-hidden border border-emerald-100">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 h-28"></div>
          <div className="px-8 pb-8 -mt-14 relative">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900">
                  {profile.headline || "Your Professional Headline"}
                </h2>
                <p className="text-emerald-600 mt-2 font-semibold">
                  {profile.tagline || "Your professional tagline"}
                </p>
              </div>
              {availability && (
                <span
                  className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap ml-4 ${availability.color}`}
                >
                  {availability.label}
                </span>
              )}
            </div>
            {profile.about && (
              <p className="text-slate-700 mb-6 leading-relaxed line-clamp-3">
                {profile.about}
              </p>
            )}
            {profile.skills.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-600 mb-3 uppercase tracking-wide">
                  Key Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.slice(0, 8).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 8 && (
                    <span className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-full text-sm font-semibold">
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
  );
}
