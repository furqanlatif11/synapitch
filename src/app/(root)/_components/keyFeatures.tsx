"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool,
  FileSearch,
  MessageSquare,
  Rocket,
  Lightbulb,
  Zap,
  ArrowRight,
  Star,
  X,
} from "lucide-react";

/* ------------------ FEATURES DATA ------------------ */

const features = [
  {
    icon: PenTool,
    title: "AI Proposal Generator",
    desc: "Instantly craft tailored proposals using Synapitch's AI engine — designed to match your tone, skills, and job context perfectly.",
    benefit: "Save 2 hours per proposal",
    highlight: true,
  },
  {
    icon: FileSearch,
    title: "Smart Job Analysis",
    desc: "Our AI reads the job post, extracts key insights, and aligns your pitch to client needs automatically.",
    benefit: "100% relevant pitches",
  },
  {
    icon: MessageSquare,
    title: "Tone & Language Matching",
    desc: "Synapitch adapts your proposal's tone to match the client's style — whether formal, technical, or conversational.",
    benefit: "Better client connection",
  },
  {
    icon: Lightbulb,
    title: "AI Suggestion Hints",
    desc: "Get context-aware improvement suggestions to refine your proposals for clarity and engagement.",
    benefit: "Real-time refinement",
    highlight: true,
  },
  {
    icon: Rocket,
    title: "Instant Export & Send",
    desc: "Download or send your proposals directly to platforms like Upwork or Fiverr in one click.",
    benefit: "One-click deployment",
  },
  {
    icon: Zap,
    title: "Performance Analytics",
    desc: "Track which proposals perform best and optimize future submissions with actionable insights.",
    benefit: "Data-driven optimization",
    highlight: true,
  },
];

const categoryGroups = [
  { name: "Generation", icon: "✍️", features: [0, 1, 2] },
  { name: "Optimization", icon: "⚡", features: [3, 4] },
  { name: "Analytics", icon: "📊", features: [5] },
];

/* ------------------ MAIN COMPONENT ------------------ */

export default function KeyFeatures() {
  const [openDemo, setOpenDemo] = useState(false);

  return (
    <>
      <section
        id="features"
        className="relative w-full py-24 md:py-16 px-6 md:px-12 bg-gradient-to-b from-white via-[#6dce8e]/15 to-white"
      >
        {/* Floating Glow Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <motion.div
            className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
            }}
            animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-0 w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--primary-light) 0%, transparent 70%)",
            }}
            animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* ---------- HEADER ---------- */}
          <div className="text-center space-y-6 mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-sm md:text-base font-semibold text-[var(--primary)] uppercase tracking-widest"
            >
              💎 Powerful Features
            </motion.p>

            <motion.h2
              className="h2 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Everything You Need to Win
              <span className="block text-gradient mt-2">
                More Freelance Clients
              </span>
            </motion.h2>

            <motion.p
              className="p max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              From intelligent proposal generation to real-time performance
              tracking, Synapitch AI gives you a competitive edge to craft
              winning pitches faster than ever before.
            </motion.p>
          </div>

          {/* ---------- CATEGORY TAGS ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            {categoryGroups.map((c, i) => (
              <motion.div
                key={i}
                className="px-6 py-3 rounded-full bg-white border-2 border-[var(--primary)]/20 hover:border-[var(--primary)]/40 shadow-sm cursor-pointer transition-all hover:shadow-lg"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg font-semibold">
                  {c.icon} {c.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* ---------- FEATURES GRID ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Highlight Glow */}
                  {f.highlight && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-[var(--primary)]/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}

                  <div
                    className={`relative bg-white border rounded-3xl p-8 transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col ${
                      f.highlight
                        ? "border-[var(--primary)]/30 shadow-lg group-hover:shadow-2xl"
                        : "border-[var(--primary)]/12 shadow-sm group-hover:shadow-lg"
                    }`}
                  >
                    {/* Badge */}
                    {f.highlight && (
                      <motion.div
                        className="absolute -top-4 -right-4 px-3 py-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-3 h-3" />
                        Popular
                      </motion.div>
                    )}

                    {/* Icon */}
                    <motion.div
                      className="mb-6 p-4 rounded-2xl w-fit bg-gradient-to-br from-[var(--primary)]/15 to-[var(--primary)]/5"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Icon
                        className="w-8 h-8 text-[var(--primary)]"
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    <h3 className="text-lg md:text-xl font-bold mb-2">
                      {f.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-6 flex-grow">
                      {f.desc}
                    </p>

                    {/* Benefit */}
                    <motion.div
                      className="flex items-center gap-2 pt-4 border-t border-gray-200"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      <Zap className="w-4 h-4 text-[var(--primary)]" />
                      <span className="text-xs md:text-sm font-semibold text-[var(--primary)]">
                        {f.benefit}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ---------- CTA ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience All Features Free
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              No credit card required. Get full access to all Synapitch features
              for 7 days and see the difference AI can make.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/signup"
                className="btn-primary px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2 group"
              >
                Try Free for 7 Days
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setOpenDemo(true)}
                className="btn-outline px-8 py-4 text-lg font-semibold"
              >
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------ DEMO MODAL ------------------ */}
      <AnimatePresence>
        {openDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex justify-center items-center px-4"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-10 overflow-hidden"
            >
              {/* Subtle glow border */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border border-[var(--primary)]/30 shadow-[0_0_30px_var(--primary)] opacity-40"></div>

              {/* Close Button */}
              <button
                onClick={() => setOpenDemo(false)}
                className="absolute top-4 right-4 bg-white/70 backdrop-blur-md p-2 rounded-full shadow hover:bg-white"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Schedule a Demo
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl">
                Let our team walk you through how Synapitch helps you craft
                winning AI-powered proposals.
              </p>

              <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Row 1 — 3 fields */}
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="label">Phone Number</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="+123 456 789"
                  />
                </div>

                {/* Row 2 — 2 fields */}
                <div className="md:col-span-1">
                  <label className="label">Country</label>
                  <input type="text" className="input" placeholder="Country" />
                </div>

                <div className="md:col-span-2">
                  <label className="label">Preferred Demo Date</label>
                  <input type="date" className="input" />
                </div>

                {/* Row 3 — Full width message */}
                <div className="md:col-span-3">
                  <label className="label">Message</label>
                  <textarea
                    rows={4}
                    className="input"
                    placeholder="Tell us what you're looking for..."
                  ></textarea>
                </div>

                {/* Row 4 — Full width button */}
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="btn-primary w-full py-4 text-lg font-semibold"
                  >
                    Book Demo
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
