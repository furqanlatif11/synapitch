"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PreventUnauthorizedAccess({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Immediately redirect if not authenticated
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
