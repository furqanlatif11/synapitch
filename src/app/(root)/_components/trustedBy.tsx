"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Target, Star, CheckCircle2 } from "lucide-react";

const logos = [
  "/assets/platforms/upwork.webp",
  "/assets/platforms/fiverr.webp",
  "/assets/platforms/freelancer.webp",
  "/assets/platforms/linkedin.webp",
  "/assets/platforms/remoteok.webp",
];

const stats = [
  {
    icon: Zap,
    number: "2x",
    label: "Faster proposals",
    desc: "Synapitch users craft winning proposals 2x faster than average freelancers.",
  },
  {
    icon: TrendingUp,
    number: "15 min",
    label: "Average time",
    desc: "Most AI-crafted proposals are generated and refined within 15 minutes.",
  },
  {
    icon: Target,
    number: "3x",
    label: "Higher win rate",
    desc: "Freelancers using Synapitch are 3x more likely to get shortlisted.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full-stack Developer",
    company: "Upwork",
    avatar: "SC",
    rating: 5,
    quote:
      "Synapitch cut my proposal writing time from 2 hours to 15 minutes. I'm now landing 40% more clients.",
  },
  {
    name: "Marcus Johnson",
    role: "UI/UX Designer",
    company: "Freelancer",
    avatar: "MJ",
    rating: 5,
    quote:
      "The AI suggestions are incredibly accurate. My win rate jumped from 25% to 65% within a month.",
  },
  {
    name: "Priya Patel",
    role: "Content Strategist",
    company: "Fiverr",
    avatar: "PP",
    rating: 5,
    quote:
      "Finally, a tool that understands freelance work. Synapitch feels like having a business partner.",
  },
];

const features = [
  "AI-powered proposal generation",
  "Real-time suggestion engine",
  "Template library with 100+ options",
  "Client preference analysis",
];

export default function TrustedBy() {
  return (
    <section
      id="trusted"
      className="relative w-full py-20 px-6 md:py-32 bg-gradient-to-b from-white via-[#6dce8e] to-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-[var(--primary)]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-[var(--primary)]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-l from-[var(--primary)]/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm md:text-base font-semibold bg-[var(--primary)] text-white px-4 py-2 rounded uppercase tracking-widest">
              Trusted & Proven
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="h2"
          >
            Trusted by{" "}
            <span className="text-gradient">Top Freelancers Worldwide</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p max-w-2xl mx-auto"
          >
            Join thousands of professionals who've transformed their freelance
            careers. From first-time freelancers to industry veterans,{" "}
            <span className="font-semibold text-[var(--primary)]">
              Synapitch
            </span>{" "}
            delivers results.
          </motion.p>
        </div>

        {/* Logos Section */}
        <div className="mb-24">
          <p className="text-xs md:text-sm font-semibold text-center uppercase tracking-wider opacity-50 mb-10">
            Trusted platforms
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative opacity-60 hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <Image
                    src={logo}
                    alt="Platform logo"
                    width={180}
                    height={75}
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/8 via-[var(--primary)]/3 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative bg-white border border-green-500 rounded-3xl p-8 hover:border-[var(--primary)]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-[var(--primary)]/12 to-[var(--primary)]/5 rounded-2xl group-hover:from-[var(--primary)]/20 group-hover:to-[var(--primary)]/10 transition-all duration-300">
                      <Icon
                        className="w-7 h-7 text-[var(--primary)]"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent mb-3">
                    {stat.number}
                  </h3>
                  <p className="font-bold text-xl text-[var(--primary-dark)] mb-4">
                    {stat.label}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider   rounded bg-[var(--primary)] text-white px-4 py-2">
              What our users say
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
              Real Success Stories
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white border border-[var(--primary)]/10 rounded-3xl p-8 hover:border-[var(--primary)]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col relative overflow-hidden">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary)]/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-6 relative z-10">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base leading-relaxed mb-8 flex-grow relative z-10 font-medium text-gray-800">
                    "{testimonial.quote}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[var(--primary)]/10 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary-dark)] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features List */}
        <div className="bg-gradient-to-r from-[var(--primary)]/8 via-[var(--primary)]/5 to-[var(--primary)]/8 border border-[var(--primary)] rounded-3xl p-8 md:p-12 mb-16">
          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Freelancers Choose Synapitch
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[var(--primary)] stroke-2" />
                </div>
                <p className="font-semibold text-gray-800">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 max-w-4xl mx-auto">
            Accelerate your pipeline with proposal software designed for busy
            teams who want to win.
          </h3>
          <p className="text-gray-700 mb-8 max-w-xl mx-auto">
            Join thousands of successful freelancers. Start crafting winning
            proposals today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg font-semibold">
              Get Started Free
            </button>
            <button className="btn-outline px-8 py-4 text-lg font-semibold">
              View Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
