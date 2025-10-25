"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const logos = [
  "/assets/images/upWorkLogo.webp",
  "/assets/images/upWorkLogo.webp",
  "/assets/images/upWorkLogo.webp",
  "/assets/images/upWorkLogo.webp",
  "/assets/images/upWorkLogo.webp",
] as const;

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto-rotate carousel every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-gradient-to-br from-green-700 via-emerald-700 to-green-600 flex items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pt-28 md:pt-16 gap-10">
        {/* LEFT: Text Section */}
        <motion.div
          className="flex-1 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-white">
            Write Winning Proposals in Seconds with <br />
            <span className="bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
              Synapitch
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-100/80 max-w-xl mx-auto md:mx-0">
            Transform the way you apply for freelance jobs. Paste a job link or
            title — Synapitch crafts a tailored, AI-powered proposal perfectly
            aligned with your skills and the client’s needs.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <button className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition">
              Get Started Free
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white/10 transition">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* RIGHT: Animated Image Carousel */}
        <motion.div
          className="flex-1 flex items-center justify-center relative overflow-hidden h-[320px] md:h-[400px] w-full md:w-auto"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {/* Background gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent blur-3xl" />

          {/* Image Carousel */}
          <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-md">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={logos[index]}
                alt={`Platform ${index + 1}`}
                width={180}
                height={180}
                className="object-contain grayscale hover:grayscale-0 transition duration-500"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
