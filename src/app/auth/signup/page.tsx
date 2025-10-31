"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the Terms and Privacy Policy");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Account created successfully!");
        setTimeout(() => router.push("/auth/signin"), 1200);
      } else {
        const error = await response.json();
        toast.error(error.error || "Signup failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: "url('/assets/images/authBackground.png')", // change this to your background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col items-center"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/assets/images/mainLogo.png"
            alt="Synapitch Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Synapitch
          </h1>
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">
          Create Your Free Account
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6 max-w-xs">
          Join Synapitch and craft smarter proposals powered by AI.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
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
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
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
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
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
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-xs">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="w-4 h-4 mt-0.5 text-[#28b463] border-gray-300 rounded focus:ring-[#28b463]"
            />
            <label className="text-gray-600 dark:text-gray-300 leading-snug">
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

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#28b463] text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        {/* Signin Redirect */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-[#28b463] font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
