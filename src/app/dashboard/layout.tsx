"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

// This layout lives at app/dashboard/layout.tsx
// It does NOT render the public Navbar/Footer — only the sidebar + topbar shell.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = session?.user;

  // NOTE: "role" is not a default better-auth field.
  // You need a "role" column/field on your user (via the admin plugin
  // or additionalFields) for this check to actually work.
  const role: "admin" | "user" =
    (user as { role?: string } | undefined)?.role === "admin" ? "admin" : "user";

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login?redirect=/dashboard");
    }
  }, [isPending, user, router]);

  // Client-side guard as a second layer, on top of middleware.
  if (isPending || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 rounded-full border-2 border-border border-t-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopbar user={user} onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <DashboardSidebar
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}