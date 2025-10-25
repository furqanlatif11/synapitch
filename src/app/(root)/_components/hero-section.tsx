"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";

const logos = [
  "/assets/images/upWorkLogo.webp",
  "/assets/images/upWorkLogo.webp",
  "/assets/images/upWorkLogo.webp",
  "/assets/images/upWorkLogo.webp",
  "/assets/images/upWorkLogo.webp",
] as const;

const features = [
  { icon: "⚡", text: "Generate in 15 sec" },
  { icon: "🎯", text: "AI personalization" },
  { icon: "📈", text: "2x more wins" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, var(--primary)/12 0%, transparent 70%)",
          }}
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, var(--primary-light)/8 0%, transparent 70%)",
          }}
          animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)] border border-[var(--primary)]/20 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Introducing Synapitch AI
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold leading-tight">
                <span className="block text-gray-900">Land More Clients</span>
                <motion.span
                  className="block text-gradient font-black mt-3"
                  initial={{ backgroundPosition: "200% center" }}
                  animate={{ backgroundPosition: "0% center" }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                >
                  With Smarter Proposals
                </motion.span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg leading-relaxed max-w-lg"
            >
              Paste a job link. Let AI craft your perfect proposal in 15 seconds. Win more clients with proposals that convert. Join 5,000+ freelancers already earning more.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-8 flex-wrap"
            >
              {[
                { number: "5K+", label: "Freelancers" },
                { number: "65%", label: "Avg Win Rate" },
                { number: "15s", label: "Generation" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-2xl md:text-3xl font-bold text-[var(--primary)]">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
            >
              <button className="btn-primary group flex items-center gap-3 px-8 py-4 text-lg font-semibold relative overflow-hidden">
                <span className="relative z-10">Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-outline flex items-center gap-2 px-6 py-4 font-semibold group">
                <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Watch Demo (2 min)</span>
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 "
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">1,200+ 5-star reviews</span>
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Feature cards floating around */}
            <div className="relative h-[400px] flex items-center justify-center">
              {/* Main Demo Card */}
              <motion.div
                className="absolute inset-0 max-w-sm mx-auto"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-full rounded-2xl overflow-hidden shadow-2xl border border-white/40 bg-white relative group">
                  {/* Screen mockup */}
                  <div className="h-full flex flex-col bg-gradient-to-br from-white to-gray-50">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                        <span className="text-sm font-semibold text-gray-900">
                          Proposal Generator
                        </span>
                      </div>
                      <Play className="w-4 h-4 text-[var(--primary)]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 space-y-4 flex flex-col justify-between overflow-hidden">
                      {/* Input simulation */}
                      <motion.div
                        className="space-y-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-full" />
                      </motion.div>

                      {/* Features list */}
                      <div className="space-y-3">
                        {features.map((feature, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-[var(--primary)]/8 to-transparent"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                            onMouseEnter={() => setHoveredFeature(i)}
                          >
                            <span className="text-xl">{feature.icon}</span>
                            <span className="text-xs font-semibold text-gray-900">
                              {feature.text}
                            </span>
                            {hoveredFeature === i && (
                              <CheckCircle2 className="w-4 h-4 text-[var(--primary)] ml-auto" />
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* Generated proposal preview */}
                      <motion.div
                        className="space-y-2 p-3 bg-[var(--primary)]/5 rounded-lg border border-[var(--primary)]/20"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      >
                        <div className="h-2 bg-[var(--primary)]/40 rounded w-2/3" />
                        <div className="h-2 bg-[var(--primary)]/30 rounded w-full" />
                        <div className="h-2 bg-[var(--primary)]/20 rounded w-3/4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{ boxShadow: ["inset 0 0 0 1px rgba(0,201,126,0)", "inset 0 0 0 1px rgba(0,201,126,0.3)", "inset 0 0 0 1px rgba(0,201,126,0)"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Floating badges */}
              {[
                { text: "AI-Powered", icon: "🤖", top: "10%", left: "-15%" },
                { text: "Instant", icon: "⚡", top: "70%", right: "-10%" },
                { text: "Personalized", icon: "🎯", bottom: "15%", left: "-20%" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  className="absolute px-4 py-2 bg-white rounded-full shadow-lg border border-[var(--primary)]/20 flex items-center gap-2 whitespace-nowrap"
                  style={{
                    top: badge.top,
                    bottom: badge.bottom,
                    left: badge.left,
                    right: badge.right,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ delay: i * 0.3, duration: 3, repeat: Infinity }}
                >
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-xs font-semibold text-gray-900">
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-gray-600 font-medium">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}