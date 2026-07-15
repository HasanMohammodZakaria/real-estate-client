"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useSession, signOut } from "@/app/lib/auth-client";

const baseNavLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Dashboard has its own sidebar/topbar shell, so the public Navbar
  // should not render there. Keep this check AFTER all hooks above,
  // never before (Rules of Hooks).
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const user = session?.user;

  const navLinks = user
    ? [...baseNavLinks, { name: "Dashboard", href: "/dashboard" }]
    : baseNavLinks;

  const handleLogout = async () => {
    await signOut();
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo - left */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-heading text-xl font-medium text-primary dark:text-primary">
            Estate<span className="text-accent">Hub</span>
          </span>
        </Link>

        {/* Nav links - center (desktop only) */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-body ${
                    active
                      ? "text-accent font-medium"
                      : "text-foreground/80 hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: theme toggle + auth (desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />

          {isPending ? (
            <div className="h-9 w-9 rounded-full bg-secondary animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full hover:bg-secondary px-2 py-1.5 transition-colors"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "User"}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                )}
                <span className="text-sm font-body max-w-25 truncate">
                  {user.name}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-(--radius) border border-border bg-card shadow-lg z-50 overflow-hidden">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-secondary transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-body px-4 py-2 rounded-(--radius) bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Off-canvas mobile menu */}
      <div
        className={`fixed inset-0 z-60 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/50"
        />

        {/* Slide-in panel */}
        <div
          className={`absolute top-0 right-0 h-full w-70 bg-card border-l border-border shadow-xl transition-transform duration-300 flex flex-col overflow-y-auto ${
    isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-5 border-b border-border">
            <span className="font-heading text-lg font-medium text-primary">
              Estate<span className="text-accent">Hub</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md hover:bg-secondary transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile: user info block if logged in */}
          {user && (
            <div className="flex items-center gap-3 p-5 border-b border-border">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "User"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}

          <ul className="flex flex-col gap-1 p-5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-3 rounded-md text-base font-body transition-colors ${
                      active
                        ? "bg-secondary text-accent font-medium"
                        : "text-foreground/80 hover:bg-secondary hover:text-accent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-3 p-5 border-t border-border mt-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-center py-2.5 rounded-(--radius) border border-border text-sm font-body text-destructive hover:bg-secondary transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-center py-2.5 rounded-(--radius) bg-primary text-primary-foreground text-sm font-body hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}