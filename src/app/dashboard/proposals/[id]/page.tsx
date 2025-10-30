// app/proposals/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Copy, CheckCircle2, AlertCircle, Loader, Send, Edit2, Save, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProposalDetail {
  id: string;
  title: string;
  jobTitle: string;
  jobDescription: string;
  jobLink: string | null;
  proposalContent: string;
  coverLetter: string | null;
  bidPrice: number | null;
  estimatedHours: number | null;
  currency: string;
  platform: string;
  status: "DRAFT" | "SUBMITTED" | "ACCEPTED" | "REJECTED" | "ARCHIVED";
  aiGenerated: boolean;
  confidenceScore: number | null;
  createdAt: string;
  submittedAt: string | null;
}

const statusColors: Record<string, { bg: string; badge: string }> = {
  DRAFT: { bg: "bg-gray-50", badge: "bg-gray-100 text-gray-800" },
  SUBMITTED: { bg: "bg-blue-50", badge: "bg-blue-100 text-blue-800" },
  ACCEPTED: { bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-800" },
  REJECTED: { bg: "bg-red-50", badge: "bg-red-100 text-red-800" },
  ARCHIVED: { bg: "bg-gray-50", badge: "bg-gray-100 text-gray-600" },
};

export default function ProposalDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [proposal, setProposal] = useState<ProposalDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editCoverLetter, setEditCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProposal();
  }, [id]);

  const fetchProposal = async () => {
    if (!id) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/proposals/${id}`);
      if (!res.ok) throw new Error("Failed to fetch proposal");

      const data = await res.json();
      setProposal(data.proposal);
      setEditContent(data.proposal.proposalContent);
      setEditCoverLetter(data.proposal.coverLetter || "");
    } catch (err) {
      console.error("Error fetching proposal:", err);
      setError("Failed to load proposal");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
      setSuccess("Copied to clipboard!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error("Copy error:", err);
      setError("Failed to copy to clipboard");
    }
  };

  const saveChanges = async () => {
    if (!proposal) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/proposals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalContent: editContent,
          coverLetter: editCoverLetter,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save changes");
      }

      const data = await res.json();
      setProposal(data.proposal);
      setIsEditing(false);
      setSuccess("Proposal updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setSubmitting(false);
    }
  };

  const submitProposal = async () => {
    if (!proposal) return;

    if (!confirm("Are you sure you want to submit this proposal? You can edit it later.")) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/proposals/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: proposal.platform,
          jobLink: proposal.jobLink,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit proposal");
      }

      const data = await res.json();
      setProposal(data.proposal);
      setSuccess("Proposal submitted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Submit error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit proposal");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600 font-medium mb-4">Proposal not found</p>
            <Link
              href="/proposals"
              className="inline-block px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all"
            >
              Back to Proposals
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const colors = statusColors[proposal.status];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/proposals"
              className="text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-2"
            >
              ← Back to Proposals
            </Link>
            {proposal.status === "DRAFT" && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all"
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? "Cancel Edit" : "Edit"}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{proposal.title}</h1>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors.badge}`}>
              {proposal.status}
            </span>
            {proposal.aiGenerated && (
              <span className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
                AI Generated
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-700">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Details Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Job Details</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 font-semibold">Job Title</p>
                  <p className="text-gray-900">{proposal.jobTitle}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Platform</p>
                  <p className="text-gray-900">{proposal.platform}</p>
                </div>
                {proposal.jobLink && (
                  <div>
                    <p className="text-gray-600 font-semibold">Job Link</p>
                    <a
                      href={proposal.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline break-all"
                    >
                      {proposal.jobLink}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-gray-600 font-semibold">Created</p>
                  <p className="text-gray-900">{new Date(proposal.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Proposal Content */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Proposal</h2>
                {!isEditing && (
                  <button
                    onClick={() => copyToClipboard(proposal.proposalContent, "proposal")}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg flex items-center gap-2 transition-all text-sm"
                  >
                    {copiedField === "proposal" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none"
                />
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-wrap text-gray-700 text-sm leading-relaxed min-h-96">
                  {proposal.proposalContent}
                </div>
              )}
            </div>

            {/* Cover Letter */}
            {proposal.coverLetter && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Cover Letter</h2>
                  {!isEditing && (
                    <button
                      onClick={() => copyToClipboard(proposal.coverLetter || "", "cover")}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg flex items-center gap-2 transition-all text-sm"
                    >
                      {copiedField === "cover" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <textarea
                    value={editCoverLetter}
                    onChange={(e) => setEditCoverLetter(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none"
                  />
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                    {proposal.coverLetter}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>

              <div className="space-y-4 text-sm mb-6">
                {proposal.bidPrice && (
                  <div>
                    <p className="text-gray-600 font-semibold">Bid Price</p>
                    <p className="text-gray-900 text-lg font-bold">
                      {proposal.currency} {proposal.bidPrice.toLocaleString()}
                    </p>
                  </div>
                )}
                {proposal.estimatedHours && (
                  <div>
                    <p className="text-gray-600 font-semibold">Est. Hours</p>
                    <p className="text-gray-900">{proposal.estimatedHours} hours</p>
                  </div>
                )}
                {proposal.confidenceScore && (
                  <div>
                    <p className="text-gray-600 font-semibold">AI Score</p>
                    <p className="text-gray-900">{proposal.confidenceScore.toFixed(0)}%</p>
                  </div>
                )}
              </div>

              <div className="space-y-2 border-t pt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={saveChanges}
                      disabled={submitting}
                      className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {proposal.status === "DRAFT" && (
                      <button
                        onClick={submitProposal}
                        disabled={submitting}
                        className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" /> Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Submit Proposal
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}