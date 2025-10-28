// app/dashboard/layout.tsx (STRICT SESSION CHECK)
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
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