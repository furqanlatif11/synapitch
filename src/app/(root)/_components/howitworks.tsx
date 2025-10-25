"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Brain,
    title: "Analyze Your Profile",
    desc: "Synapitch scans your portfolio, past proposals, and job details using AI to understand your tone, skills, and best-fit opportunities.",
    features: ["Portfolio scanning", "Skill extraction", "Tone analysis"],
  },
  {
    icon: Sparkles,
    title: "Generate Smart Proposals",
    desc: "Our intelligent engine crafts customized proposals that align with client needs—optimized for clarity, relevance, and engagement.",
    features: ["AI customization", "Client alignment", "Engagement boost"],
  },
  {
    icon: Rocket,
    title: "Pitch & Win Faster",
    desc: "Refine and send proposals instantly. Freelancers using Synapitch get shortlisted 3x faster and close more deals effortlessly.",
    features: ["Instant refinement", "Quick deployment", "3x faster wins"],
  },
];

const processFlow = [
  { step: 1, label: "Paste Job Link", time: "10 sec" },
  { step: 2, label: "AI Analysis", time: "15 sec" },
  { step: 3, label: "Review & Edit", time: "5 min" },
  { step: 4, label: "Send & Track", time: "1 sec" },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-24 md:py-32 px-6 md:px-12"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-80 h-80 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
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
            <span className="text-sm md:text-base font-semibold bg-[var(--primary)] text-white px-4 py-2 rounded uppercase tracking-widest">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            className="h2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            How <span className="text-gradient">Synapitch</span> Works
          </motion.h2>

          <motion.p
            className="p max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            From insight to impact — here's how Synapitch transforms your
            freelance proposals into winning opportunities in just a few clicks.
          </motion.p>
        </div>

        {/* Quick Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white border border-[var(--primary)]/12 rounded-3xl p-8 md:p-12 mb-20 shadow-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {processFlow.map((item, i) => (
              <div key={i} className="relative">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* Step circle */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 border-2 border-[var(--primary)]/30 flex items-center justify-center mb-3">
                    <span className="text-lg md:text-xl font-bold text-[var(--primary)]">
                      {item.step}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-xs md:text-sm font-semibold text-gray-900 text-center mb-1">
                    {item.label}
                  </p>

                  {/* Time */}
                  <p className="text-xs text-gray-500">{item.time}</p>
                </motion.div>

                {/* Connector line */}
                {i < processFlow.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-[var(--primary)]/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/8 via-[var(--primary)]/3 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                {/* Card */}
                <div className="relative bg-white border border-[var(--primary)]/12 rounded-3xl p-8 shadow-sm hover:border-[var(--primary)]/30 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                  {/* Step indicator */}
                  <div className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--primary)]/5 w-fit group-hover:from-[var(--primary)]/25 group-hover:to-[var(--primary)]/10 transition-all duration-300"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    <Icon
                      className="w-8 h-8 text-[var(--primary)]"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                    {step.desc}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 pt-6 border-t border-gray-200">
                    {step.features.map((feature, j) => (
                      <motion.div
                        key={j}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.15 + j * 0.05,
                          duration: 0.4,
                        }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium text-gray-700">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[var(--primary)]/8 via-[var(--primary)]/5 to-[var(--primary)]/8 border border-[var(--primary)] rounded-3xl p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to revolutionize your proposals?
          </h3>

          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers already winning more clients with
            smarter, faster proposals powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2 group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="btn-outline px-8 py-4 text-lg font-semibold">
              See Full Features
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            No credit card required • 7-day free access • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
