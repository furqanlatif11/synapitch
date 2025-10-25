"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle signup logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-[#e9fff1] to-[#d9fce6] dark:from-[#0f0f0f] dark:via-[#0a1a11] dark:to-[#0f0f0f] transition-colors duration-500 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-5xl h-[85vh] rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-2xl border border-white/40 dark:border-white/10 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-start p-10 md:p-14 bg-gradient-to-b from-white/50 to-transparent dark:from-transparent">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Start Winning <br />
            <span className="text-[#28b463]">More Clients</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-sm mb-8">
            Join 5,000+ freelancers already earning more with AI-powered
            proposals that convert.
          </p>

          <div className="space-y-3 w-full max-w-xs">
            {/* GitHub Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-medium border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white bg-gradient-to-r from-white to-gray-50 dark:from-white/10 dark:to-white/5 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-black">
                  <Github className="w-4 h-4 text-white" />
                </div>
                <span>Continue with GitHub</span>
              </div>
            </motion.button>

            {/* Google Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-medium border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white bg-gradient-to-r from-white to-[#f8f9fa] dark:from-white/10 dark:to-white/5 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-white border border-gray-200 dark:border-white/10">
                  <Mail className="w-4 h-4 text-[#EA4335]" />
                </div>
                <span>Continue with Google</span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#e9fff1]/40 to-white/30 dark:from-[#102317]/30 dark:to-[#0a1a11]/30 backdrop-blur-xl p-8 md:p-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-4 text-gray-800 dark:text-white"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Create Your Account
            </h2>

            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-xs">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="w-4 h-4 mt-0.5 text-[#28b463] border-gray-300 rounded focus:ring-[#28b463]"
              />
              <label
                htmlFor="agreeToTerms"
                className="text-gray-600 dark:text-gray-300"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-[#28b463] hover:underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#28b463] hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#28b463] text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </motion.button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-[#28b463] font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
