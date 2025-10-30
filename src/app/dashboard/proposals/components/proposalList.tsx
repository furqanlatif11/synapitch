// app/proposals/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Eye, MoreVertical, Search, Filter, Loader } from "lucide-react";
import Link from "next/link";

interface Proposal {
  id: string;
  title: string;
  jobTitle: string;
  status: "DRAFT" | "SUBMITTED" | "ACCEPTED" | "REJECTED" | "ARCHIVED";
  bidPrice: number | null;
  currency: string;
  platform: string;
  createdAt: string;
  submittedAt: string | null;
  responseAt: string | null;
  aiGenerated: boolean;
  confidenceScore: number | null;
}

interface ProposalsResponse {
  proposals: Proposal[];
  total: number;
}

const statusColors: Record<string, { bg: string; text: string; badge: string }> = {
  DRAFT: { bg: "bg-gray-50", text: "text-gray-700", badge: "bg-gray-100 text-gray-800" },
  SUBMITTED: { bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-800" },
  ACCEPTED: { bg: "bg-emerald-50", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800" },
  REJECTED: { bg: "bg-red-50", text: "text-red-700", badge: "bg-red-100 text-red-800" },
  ARCHIVED: { bg: "bg-gray-50", text: "text-gray-500", badge: "bg-gray-100 text-gray-600" },
};

const platformIcons: Record<string, string> = {
  UPWORK: "🟢",
  FIVERR: "💚",
  LINKEDIN: "💼",
  CUSTOM: "📝",
};

export default function ProposalsPage() {
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [platformFilter, setPlatformFilter] = useState("ALL");
  const [error, setError] = useState("");
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  useEffect(() => {
    fetchProposals();
  }, [statusFilter, platformFilter]);

  const fetchProposals = async () => {
    setLoading(true);
    setError("");
    try {
      const queryParams = new URLSearchParams();
      if (statusFilter !== "ALL") queryParams.append("status", statusFilter);
      if (platformFilter !== "ALL") queryParams.append("platform", platformFilter);

      const res = await fetch(`/api/proposals?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch proposals");

      const data: ProposalsResponse = await res.json();
      setProposals(data.proposals);
    } catch (err) {
      console.error("Error fetching proposals:", err);
      setError("Failed to load proposals");
    } finally {
      setLoading(false);
    }
  };

  const deleteProposal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this proposal?")) return;

    try {
      const res = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete proposal");

      setProposals(proposals.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting proposal:", err);
      setError("Failed to delete proposal");
    }
  };

  const filteredProposals = proposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className=" mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Proposals</h1>
              <p className="text-gray-500 text-sm mt-1">Manage and track your job proposals</p>
            </div>
            <Link
              href="/dashboard/proposals/new-proposal"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" /> New Proposal
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Total", value: proposals.length, color: "text-gray-600" },
              { label: "Drafts", value: proposals.filter((p) => p.status === "DRAFT").length, color: "text-gray-600" },
              { label: "Submitted", value: proposals.filter((p) => p.status === "SUBMITTED").length, color: "text-blue-600" },
              { label: "Accepted", value: proposals.filter((p) => p.status === "ACCEPTED").length, color: "text-emerald-600" },
              { label: "Rejected", value: proposals.filter((p) => p.status === "REJECTED").length, color: "text-red-600" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-xs font-semibold uppercase">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search proposals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="ALL">All Statuses</option>
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="ALL">All Platforms</option>
                <option value="UPWORK">Upwork</option>
                <option value="FIVERR">Fiverr</option>
                <option value="LINKEDIN">LinkedIn</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Proposals Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : filteredProposals.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600 font-medium mb-4">No proposals found</p>
            <Link
              href="/dashboard/proposals/new-proposal"
              className="inline-block px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all"
            >
              Create Your First Proposal
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredProposals.map((proposal) => {
              const colors = statusColors[proposal.status];
              return (
                <div
                  key={proposal.id}
                  className={`${colors.bg} border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">{platformIcons[proposal.platform] || "📋"}</span>
                        <h3 className="text-lg font-bold text-gray-900">{proposal.title}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors.badge}`}>
                          {proposal.status}
                        </span>
                        {proposal.aiGenerated && (
                          <span className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
                            AI Generated
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-3">{proposal.jobTitle}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {proposal.bidPrice && (
                          <div>
                            <span className="font-semibold">Bid:</span> {proposal.currency} {proposal.bidPrice.toLocaleString()}
                          </div>
                        )}
                        <div>
                          <span className="font-semibold">Created:</span> {new Date(proposal.createdAt).toLocaleDateString()}
                        </div>
                        {proposal.submittedAt && (
                          <div>
                            <span className="font-semibold">Submitted:</span> {new Date(proposal.submittedAt).toLocaleDateString()}
                          </div>
                        )}
                        {proposal.confidenceScore && (
                          <div>
                            <span className="font-semibold">AI Score:</span> {proposal.confidenceScore.toFixed(0)}%
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/proposals/${proposal.id}`}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-all"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/proposals/${proposal.id}/edit`}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => deleteProposal(proposal.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}