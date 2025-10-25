"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  "/assets/images/upwork.png",
  "/assets/images/fiverr.png",
  "/assets/images/freelancer.png",
  "/assets/images/linkedin.png",
  "/assets/images/remoteok.png",
];

const stats = [
  {
    number: "2x",
    label: "Faster proposals",
    desc: "Synapitch users craft winning proposals 2x faster than average freelancers.",
  },
  {
    number: "15 min",
    label: "Average time",
    desc: "Most AI-crafted proposals are generated and refined within 15 minutes.",
  },
  {
    number: "3x",
    label: "Higher win rate",
    desc: "Freelancers using Synapitch are 3x more likely to get shortlisted.",
  },
];

export default function TrustedBy() {
  return (
    <section
      id="trusted"
      className="relative  w-full py-24 px-6 light:bg-green-100 "
    >
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />

      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-green-500"
        >
          Trusted by Top Freelancers & Remote Teams
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className=" !text-black dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg"
        >
          Thousands of professionals rely on{" "}
          <span className="font-semibold text-green-700 dark:text-green-400">
            Synapitch
          </span>{" "}
          to create AI-powered proposals that convert faster and win more
          clients.
        </motion.p>
      </div>

      {/* Logos */}
      <div className="flex flex-wrap justify-center items-center gap-10 mt-12 opacity-80">
        {logos.map((logo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Image
              src={logo}
              alt="Platform logo"
              width={120}
              height={60}
              className="object-contain grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
            />
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="bg-white dark:bg-zinc-900 border border-green-100 dark:border-green-800 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400">
              {stat.number}
            </h3>
            <p className="font-medium text-lg text-green-800 dark:text-green-200 mt-2">
              {stat.label}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
              {stat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
