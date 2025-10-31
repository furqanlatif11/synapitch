// app/dashboard/layout.tsx (STRICT SESSION CHECK)
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Initial check
    if (status === "loading") {
      return; // Wait for session to load
    }

    // If not authenticated, sign out and redirect
    if (status === "unauthenticated") {
      signOut({ redirect: false }).then(() => {
        router.push("/auth/signin");
        router.refresh();
      });
      return;
    }

    // If authenticated, verify and set verified
    if (status === "authenticated" && session?.user) {
      setIsVerified(true);
    }
  }, [status, session, router]);

  // Show loading state while checking session
  if (status === "loading" || !isVerified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black relative overflow-hidden">
      {/* Soft moving background effect */}
      <motion.div
        className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 1, scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <Image
          src="/assets/images/mainLogo.png"
          alt="Synapitch Logo"
          width={80}
          height={80}
          priority
          className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
        />
      </motion.div>

      {/* Animated Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 0.8, 1], y: [10, 0, 5, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-gray-300 text-sm mt-6 tracking-wide z-10"
      >
        Loading your dashboard...
      </motion.p>
    </div>
    );
  }

  // If not authenticated, don't render
  if (status === "unauthenticated") {
    return null;
  }

  // Render children only if verified
  return isVerified ? <>{children}</> : null;
}