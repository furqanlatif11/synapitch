"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Star,
  Play,
  Check,
  Zap,
  X,
} from "lucide-react";

const proposalSteps = [
  { step: "Paste job URL", time: "2s", icon: "🔗" },
  { step: "AI analyzes requirements", time: "5s", icon: "🧠" },
  { step: "Crafts personalized pitch", time: "6s", icon: "✍️" },
  { step: "Ready to send & win", time: "2s", icon: "🚀" },
];

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const fullText = "Looking for an experienced web developer...";

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % proposalSteps.length);
    }, 3000);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (activeStep === 0) {
      setIsTyping(true);
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [activeStep]);

  // Prevent body scroll when video is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  return (
    <section className="relative bg-white min-h-screen flex items-center overflow-hidden mt-10">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-50/30 rounded-full blur-3xl" />
      </div>

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #059669 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all group"
                aria-label="Close video"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Video title (optional) */}
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                <span className="text-white text-sm font-medium">
                  SynaPitch Tutorial
                </span>
              </div>

              {/* YouTube iframe */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/nVyD6THcvDQ?autoplay=1&rel=0&modestbranding=1"
                title="SynaPitch Tutorial - How It Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-900">
              Join 5,000+ winning freelancers
            </span>
          </motion.div>

          {/* Main Headline - Problem → Solution */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            <span className="text-slate-900">Stop Spending Hours</span>
            <br />
            <span className="text-slate-900">On</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Every Proposal
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 400 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M5 7 Q 200 2, 395 7"
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </svg>
            </span>
          </motion.h1>

          {/* Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            Paste any job link. Get a personalized, winning proposal in{" "}
            <span className="font-semibold text-emerald-600">15 seconds</span>.
            <br />
            No templates. No guesswork. Just results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="/auth/signup"
              className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all flex items-center gap-2 text-lg"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="group px-8 py-4 bg-white border-2 border-slate-200 hover:border-emerald-200 text-slate-900 font-semibold rounded-full hover:bg-emerald-50/30 transition-all flex items-center gap-2 text-lg"
            >
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Watch How It Works
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-6 text-sm flex-wrap"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-slate-600">
                <span className="font-semibold text-slate-900">4.9/5</span> from
                1,300+ reviews
              </span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Process Timeline */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {proposalSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`relative p-4 rounded-xl border-2 transition-all duration-500 ${
                  activeStep === index
                    ? "bg-emerald-50 border-emerald-500 shadow-lg shadow-emerald-500/10"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-slate-900 mb-1">
                  {item.step}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
                {activeStep === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Live Demo Card */}
          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  SynaPitch Proposal Generator
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-emerald-700">
                  Live
                </span>
              </div>
            </div>

            {/* Card Content */}
            <motion.div className="p-8 space-y-6" layout>
              {/* Input Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Post URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={activeStep === 0 ? displayText : fullText}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {isTyping && activeStep === 0 && (
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-600"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </div>
              </div>

              <div className="relative">
                <motion.div
                  key={activeStep}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[270px]" // adjust height
                >
                  {/* AI Analysis */}
                  {activeStep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        AI Analysis
                      </div>
                      {[
                        "Client needs web developer",
                        "Prefers React & Node.js",
                        "Budget: $3,000-$5,000",
                      ].map((insight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <Check className="w-4 h-4 text-emerald-600" />
                          {insight}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Generated Proposal */}
                  {activeStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-semibold text-emerald-900">
                            Your Winning Proposal
                          </span>
                        </div>
                        {activeStep === 3 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 px-2 py-1 bg-emerald-600 rounded-full"
                          >
                            <Check className="w-3 h-3 text-white" />
                            <span className="text-xs font-medium text-white">
                              Ready
                            </span>
                          </motion.div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-emerald-300/60 rounded-full w-full" />
                        <div className="h-2 bg-emerald-300/60 rounded-full w-[90%]" />
                        <div className="h-2 bg-emerald-300/60 rounded-full w-[95%]" />
                        <div className="h-2 bg-emerald-300/60 rounded-full w-[85%]" />
                        <div className="h-2 bg-emerald-300/60 rounded-full w-[80%]" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Clock, value: "15s", label: "Average generation time" },
              { icon: TrendingUp, value: "2.5x", label: "Higher win rate" },
              { icon: Sparkles, value: "94%", label: "Client satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
