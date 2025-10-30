'use client';
import React, { useState, useEffect } from "react";
import {
  Wand2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Loader,
  Save,
  Eye,
  EyeOff,
  X,
} from "lucide-react";
import Link from "next/link";

interface FormData {
  title: string;
  jobTitle: string;
  jobDescription: string;
  bidPrice: string;
  estimatedHours: string;
  platform: string;
  proposalContent: string;
}

interface UserProfile {
  headline?: string;
  tagline?: string;
  skills?: string[];
  experience?: string;
  expertise?: string[];
  about?: string;
}

const PLATFORM_OPTIONS = [
  { value: "UPWORK", label: "Upwork" },
  { value: "FIVERR", label: "Fiverr" },
  { value: "LINKEDIN", label: "LinkedIn Jobs" },
  { value: "CUSTOM", label: "Other" },
];

// Preview text variations
const PREVIEW_PREFIXES = [
  "Leveraging my expertise in",
  "With strong experience in",
  "Building on my background in",
  "Drawing from my skills in",
  "Utilizing my proficiency in",
];

const PREVIEW_SUFFIXES = [
  ", I can deliver exceptional results.",
  ", I'm ready to contribute immediately.",
  ", I'll ensure quality outcomes.",
  ", I bring proven expertise.",
  ", I'm committed to excellence.",
];

export default function NewProposalPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    jobTitle: "",
    jobDescription: "",
    bidPrice: "",
    estimatedHours: "",
    platform: "UPWORK",
    proposalContent: "",
  });

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showSplit, setShowSplit] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setUserProfile(data.profile || {});
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setUserProfile({});
      }
    };
    fetchProfile();
  }, []);

  // Generate rotating preview text
  useEffect(() => {
    if (!showSplit || !userProfile) return;

    const generatePreviewText = () => {
      const skills = userProfile.skills || [];
      const expertise = userProfile.expertise || [];
      
      if (skills.length === 0 && expertise.length === 0) {
        setPreviewText("Your proposal will be personalized based on your profile.");
        return;
      }

      const allSkills = [...skills, ...expertise];
      const randomSkill = allSkills[Math.floor(Math.random() * allSkills.length)];
      const prefix = PREVIEW_PREFIXES[Math.floor(Math.random() * PREVIEW_PREFIXES.length)];
      const suffix = PREVIEW_SUFFIXES[Math.floor(Math.random() * PREVIEW_SUFFIXES.length)];

      setPreviewText(`${prefix} ${randomSkill}${suffix}`);
    };

    generatePreviewText();
    const interval = setInterval(generatePreviewText, 3000);

    return () => clearInterval(interval);
  }, [showSplit, userProfile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const generateProposal = async () => {
    if (!formData.jobDescription.trim()) {
      setError("Job description is required");
      return;
    }

    if (!formData.title.trim()) {
      setError("Proposal title is required");
      return;
    }

    setGenerating(true);
    setPreviewLoading(true);
    setError("");
    setShowSplit(true);

    try {
      const res = await fetch("/api/proposals/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: formData.jobTitle,
          jobDescription: formData.jobDescription,
          platform: formData.platform,
          userProfile: userProfile,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate proposal");
      }

      const data = await res.json();
      
      // Add delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData((prev) => ({
        ...prev,
        proposalContent: data.proposal,
      }));

      setSuccess("Proposal generated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Generation error:", err);
      
      // Add delay before showing error so user can see the loading state
      await new Promise(resolve => setTimeout(resolve, 9500));
      
      setError(err instanceof Error ? err.message : "Failed to generate proposal");
      setShowSplit(false);
    } finally {
      setGenerating(false);
      setPreviewLoading(false);
    }
  };

  const saveProposal = async () => {
    if (!formData.title.trim() || !formData.proposalContent.trim()) {
      setError("Title and proposal content are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/proposals/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          jobTitle: formData.jobTitle,
          jobDescription: formData.jobDescription,
          bidPrice: formData.bidPrice ? Number(formData.bidPrice) : null,
          estimatedHours: formData.estimatedHours
            ? Number(formData.estimatedHours)
            : null,
          platform: formData.platform,
          proposalContent: formData.proposalContent,
          aiGenerated: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save proposal");
      }

      setSuccess("Proposal saved successfully!");
      setTimeout(() => {
        window.location.href = "/proposals";
      }, 1500);
    } catch (err) {
      console.error("Save error:", err);
      setError(err instanceof Error ? err.message : "Failed to save proposal");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Copy error:", err);
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className=" mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                New Proposal
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Generate a professional proposal using AI
              </p>
            </div>
            <Link
              href="/dashboard/proposals"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              ← Back
            </Link>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-6 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-700 hover:text-red-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {success && (
          <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{success}</span>
            <button
              onClick={() => setSuccess("")}
              className="ml-auto text-green-700 hover:text-green-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className={`grid gap-8 transition-all duration-300 ${showSplit ? "grid-cols-2" : "grid-cols-1"}`}>
          {/* Main Content - Left Column */}
          <div className="space-y-4">
            {/* Job Description Section */}
            <div className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <h2 className="text-lg font-semibold text-gray-900">
                  Job Details
                </h2>
                <Eye className="w-5 h-5 text-gray-400" />
              </button>

              <div className="border-t border-gray-200 px-6 py-6 space-y-5 bg-gray-50">
                {/* Proposal Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Proposal Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., React Developer - E-commerce Platform"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Seeking Experienced React Developer"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    placeholder="Paste the complete job description here..."
                    rows={10}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Include all requirements, responsibilities, and qualifications
                  </p>
                </div>

                {/* Tips Section */}
                <div className="border-t border-gray-300 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Tips for better proposals</h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-medium">•</span>
                      <span>Paste complete job description for better analysis</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-medium">•</span>
                      <span>Include all requirements and responsibilities</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-medium">•</span>
                      <span>Specify the platform for tailored formatting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            {formData.jobDescription && (
              <div className="border border-gray-200 rounded-lg">
                <div className="px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Proposal Settings
                  </h2>
                </div>

                <div className="border-t border-gray-200 px-6 py-6 space-y-5 bg-gray-50">
                  <div className="grid grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Platform
                      </label>
                      <select
                        name="platform"
                        value={formData.platform}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        {PLATFORM_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Bid Price (PKR)
                      </label>
                      <input
                        type="number"
                        name="bidPrice"
                        value={formData.bidPrice}
                        onChange={handleInputChange}
                        placeholder="e.g., 50000"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Estimated Hours
                      </label>
                      <input
                        type="number"
                        name="estimatedHours"
                        value={formData.estimatedHours}
                        onChange={handleInputChange}
                        placeholder="e.g., 160"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateProposal}
                    disabled={
                      generating ||
                      !formData.jobDescription.trim() ||
                      !formData.title.trim()
                    }
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {generating ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Generating Proposal...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4" />
                        Generate Proposal
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Preview/Output */}
          {showSplit && (
            <div className="space-y-4">
              {/* Live Preview or Generated Proposal */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Generated Proposal
                  </h2>
                </div>

                <div className="p-6">
                  {previewLoading ? (
                    <div className="space-y-4">
                      {/* Skeleton Loading State */}
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                      </div>

                      {/* Profile Preview */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-4">Profile-based content:</p>
                        <div className="space-y-2">
                          {userProfile?.tagline && (
                            <p className="text-sm text-blue-600 font-medium">
                              📌 {userProfile.tagline}
                            </p>
                          )}
                          <p className="text-sm text-gray-700 italic">
                            {previewText}
                          </p>
                          {userProfile?.skills && userProfile.skills.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs text-gray-500 mb-2">Skills being considered:</p>
                              <div className="flex flex-wrap gap-2">
                                {userProfile.skills.slice(0, 3).map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {userProfile.skills.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
                                    +{userProfile.skills.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-gray-600">
                          ✨ Generating your personalized proposal...
                        </p>
                      </div>
                    </div>
                  ) : formData.proposalContent ? (
                    <div className="space-y-4">
                      <textarea
                        value={formData.proposalContent}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            proposalContent: e.target.value,
                          }))
                        }
                        className="w-full h-96 p-4 border border-gray-300 rounded-lg text-gray-900 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            copyToClipboard(formData.proposalContent, "proposal")
                          }
                          className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          {copiedField === "proposal" ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>

                        <button
                          onClick={saveProposal}
                          disabled={loading || !formData.proposalContent.trim()}
                          className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}