
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineViewGrid,
  HiOutlinePlusCircle,
  HiOutlineOfficeBuilding,
  HiOutlineUsers,
  HiOutlineLogout,
  HiOutlineX,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import { signOut } from "@/app/lib/auth-client";

interface NavItem {
  name: string;
  href: string;
  icon: IconType;
}

const userNav: NavItem[] = [
  { name: "Overview", href: "/dashboard", icon: HiOutlineViewGrid },
  { name: "My Properties", href: "/dashboard/properties/manage", icon: HiOutlineOfficeBuilding },
  { name: "Add Property", href: "/dashboard/properties/add", icon: HiOutlinePlusCircle },
];

const adminNav: NavItem[] = [
  { name: "Overview", href: "/dashboard", icon: HiOutlineViewGrid },
  { name: "All Properties", href: "/dashboard/manage-properties", icon: HiOutlineOfficeBuilding },
  { name: "Add Property", href: "/dashboard/properties/add", icon: HiOutlinePlusCircle },
  { name: "Manage Users", href: "/dashboard/manage-users", icon: HiOutlineUsers },
];

interface DashboardSidebarProps {
  role: "admin" | "user";
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ role, isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = role === "admin" ? adminNav : userNav;

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const content = (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-3">
        <span className="text-xs font-body font-medium uppercase tracking-wide text-muted-foreground">
          {role === "admin" ? "Admin Panel" : "My Account"}
        </span>
      </div>

      <nav className="flex-1 px-3">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-(--radius) text-sm font-body transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:bg-secondary hover:text-accent"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-(--radius) text-sm font-body text-destructive hover:bg-secondary transition-colors"
        >
          <HiOutlineLogout size={18} className="shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r border-border bg-card">
        {content}
      </aside>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div onClick={onClose} className="absolute inset-0 bg-black/50" />
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-card border-r border-border shadow-xl transition-transform duration-300 flex flex-col ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="shrink-0 flex items-center justify-between h-16 px-5 border-b border-border">
            <span className="font-heading text-lg font-medium text-primary">
              Estate<span className="text-accent">Hub</span>
            </span>
            <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="p-2 rounded-md hover:bg-secondary transition-colors"
            >
              <HiOutlineX size={20} />
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}