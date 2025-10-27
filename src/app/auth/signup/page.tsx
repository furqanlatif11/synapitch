"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

    // Validate on frontend first
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("You must agree to the Terms and Privacy Policy");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword, // Add this line
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        toast.success("Account created successfully!");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 1500);
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
        // Redirect to dashboard or login page
        // router.push("/dashboard") or router.push("/auth/signin")
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        toast.error(errorData.error || "Failed to create account");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white via-[#e9fff1] to-[#d9fce6] dark:from-[#0f0f0f] dark:via-[#0a1a11] dark:to-[#0f0f0f] transition-colors duration-700">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-5xl rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/40 dark:border-white/10 overflow-hidden flex flex-col md:flex-row md:h-[90vh]"
      >
        {/* LEFT PANEL */}
        <div className="flex-1 flex flex-col justify-center p-10 md:p-16 bg-gradient-to-b from-[#eafff4]/80 to-transparent dark:from-[#102317]/40 dark:to-transparent">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Create <span className="text-[#28b463]">Your Journey</span> <br />{" "}
            with Synapitch
          </h1>

          <p className="text-gray-700 dark:text-gray-300 max-w-sm mb-10">
            Build smarter proposals, close more deals, and grow your freelance
            business — all powered by AI.
          </p>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl font-medium border border-gray-300 dark:border-white/20 bg-white/80 dark:bg-white/5 text-gray-800 dark:text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-black">
                  <Github className="w-4 h-4 text-white" />
                </div>
                <span>GitHub</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl font-medium border border-gray-300 dark:border-white/20 bg-white/80 dark:bg-white/5 text-gray-800 dark:text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-white border border-gray-200 dark:border-white/10">
                  <Mail className="w-4 h-4 text-[#EA4335]" />
                </div>
                <span>Google</span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#e9fff1]/50 to-white/30 dark:from-[#102317]/20 dark:to-[#0a1a11]/20 p-8 md:p-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-5 text-gray-800 dark:text-white"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Sign Up for Free
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
              />
            </div>

            {/* Terms Checkbox */}
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
                className="text-gray-600 dark:text-gray-300 leading-snug"
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

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#28b463] text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Sign In Redirect */}
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
