"use client";

import { motion } from "framer-motion";
import {
  PenTool,
  FileSearch,
  MessageSquare,
  Rocket,
  Lightbulb,
  Zap,
  ArrowRight,
  Star,
} from "lucide-react";

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
  {
    name: "Generation",
    icon: "✍️",
    features: [0, 1, 2],
  },
  {
    name: "Optimization",
    icon: "⚡",
    features: [3, 4],
  },
  {
    name: "Analytics",
    icon: "📊",
    features: [5],
  },
];

export default function KeyFeatures() {
  return (
    <section
      id="features"
      className="w-full py-24 md:py-32 px-6 md:px-12  bg-gradient-to-b from-white via-[#6dce8e] to-white "
      
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full opacity-4"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
          animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-0 w-80 h-80 rounded-full opacity-3"
          style={{
            background:
              "radial-gradient(circle, var(--primary-light) 0%, transparent 70%)",
          }}
          animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm md:text-base font-semibold text-[var(--primary)] uppercase tracking-widest">
              💎 Powerful Features
            </p>
          </motion.div>

          <motion.h2
            className="h2"
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
            tracking, Synapitch AI gives you the competitive edge to craft
            winning pitches faster than ever before.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {categoryGroups.map((category, i) => (
            <motion.div
              key={i}
              className="px-6 py-3 rounded-full bg-white border-2 border-[var(--primary)]/20 hover:border-[var(--primary)]/40 cursor-pointer transition-all hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg font-semibold text-gray-900">
                {category.icon} {category.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Highlight background */}
                {feature.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-[var(--primary)]/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                {/* Card */}
                <div
                  className={`relative bg-white border rounded-3xl p-8 transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col ${
                    feature.highlight
                      ? "border-[var(--primary)]/30 shadow-lg group-hover:shadow-2xl group-hover:border-[var(--primary)]/60"
                      : "border-[var(--primary)]/12 shadow-sm group-hover:shadow-lg group-hover:border-[var(--primary)]/30"
                  }`}
                >
                  {/* Highlight badge */}
                  {feature.highlight && (
                    <motion.div
                      className="absolute -top-4 -right-4 px-3 py-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-3 h-3 fill-white" />
                      Popular
                    </motion.div>
                  )}

                  {/* Icon */}
                  <motion.div
                    className={`mb-6 p-4 rounded-2xl w-fit transition-all duration-300 ${
                      feature.highlight
                        ? "bg-gradient-to-br from-[var(--primary)]/25 to-[var(--primary)]/10 group-hover:from-[var(--primary)]/35 group-hover:to-[var(--primary)]/15"
                        : "bg-gradient-to-br from-[var(--primary)]/15 to-[var(--primary)]/5 group-hover:from-[var(--primary)]/25 group-hover:to-[var(--primary)]/10"
                    }`}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  >
                    <Icon
                      className="w-8 h-8 text-[var(--primary)]"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                    {feature.desc}
                  </p>

                  {/* Benefit badge */}
                  <motion.div
                    className="flex items-center gap-2 pt-4 border-t border-gray-200"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Zap className="w-4 h-4 text-[var(--primary)]" />
                    <span className="text-xs md:text-sm font-semibold text-[var(--primary)]">
                      {feature.benefit}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[var(--primary)]/8 via-[var(--primary)]/5 to-[var(--primary)]/8 border border-[var(--primary)]/15 rounded-3xl p-8 md:p-12 mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Synapitch?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "10x Faster",
                desc: "Generate proposals in seconds instead of hours, so you can apply to more jobs.",
              },
              {
                icon: "🎯",
                title: "Smarter Pitches",
                desc: "AI analyzes every job and creates highly personalized proposals that convert.",
              },
              {
                icon: "📈",
                title: "Track & Improve",
                desc: "Real-time analytics show what works, helping you optimize every pitch.",
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience All Features Free
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              No credit card required. Get full access to all Synapitch features
              for 7 days and see the difference AI can make.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2 group">
              Try Free for 7 Days
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="btn-outline px-8 py-4 text-lg font-semibold">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
