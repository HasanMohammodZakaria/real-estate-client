"use client";

import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

interface DashboardShellProps {
  children: React.ReactNode;
  role: "admin" | "user";
  initialUser: {
    name?: string | null;
    image?: string | null;
  };
}

export function DashboardShell({ children, role, initialUser }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopbar user={initialUser} onMenuClick={() => setSidebarOpen(true)} />

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