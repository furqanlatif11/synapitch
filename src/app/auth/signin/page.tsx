"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      if (result?.ok) {
        toast.success("Login successful 🎉");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 0"
      style={{
        backgroundImage: "url('/assets/images/authBackground.png')", // change this to your background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/70 dark:bg-white/10 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/30 dark:border-white/10 p-8 md:p-10 text-gray-800 dark:text-white"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/images/mainLogo.png"
            alt="Synapitch Logo"
            width={70}
            height={70}
            className="drop-shadow-lg"
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Sign in to your <span className="font-semibold text-[#28b463]">Synapitch</span> account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-[#28b463]/40 outline-none text-sm"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#28b463] hover:bg-[#239d56]"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#28b463] font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>

        <p className="text-[11px] text-gray-500 dark:text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} Synapitch. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
