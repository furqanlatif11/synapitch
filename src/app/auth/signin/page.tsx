"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signin Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6fff9] via-white to-[#e8fff3] dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#0a0a0a] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl mx-auto rounded-3xl backdrop-blur-lg bg-white/60 dark:bg-white/5 border border-[var(--primary)]/10 shadow-lg flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Side — Intro */}
        <div className="hidden md:flex flex-1 flex-col justify-center items-start px-12 py-16 bg-gradient-to-br from-[var(--primary)]/10 to-transparent">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome Back 👋
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Sign in to access your AI-powered tools and grow your freelance business.
            </p>
          </motion.div>
        </div>

        {/* Right Side — Form */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-12">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to Synapitch
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-[var(--primary)] hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3 w-full max-w-xs mx-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-medium border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white bg-gradient-to-r from-white to-gray-50 dark:from-white/10 dark:to-white/5 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-black">
                    <Github className="w-4 h-4 text-white" />
                  </div>
                  <span>Sign in with GitHub</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-medium border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white bg-gradient-to-r from-white to-[#f8f9fa] dark:from-white/10 dark:to-white/5 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-white border border-gray-200 dark:border-white/10">
                    <Mail className="w-4 h-4 text-[#EA4335]" />
                  </div>
                  <span>Sign in with Google</span>
                </div>
              </motion.button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-500 text-sm mt-6">
              <div className="h-px flex-1 bg-gray-300 dark:bg-white/10"></div>
              <span>or</span>
              <div className="h-px flex-1 bg-gray-300 dark:bg-white/10"></div>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all bg-white/70 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all bg-white/70 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-white/20 text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  Remember me
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2.5 rounded-lg font-semibold bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-6"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
