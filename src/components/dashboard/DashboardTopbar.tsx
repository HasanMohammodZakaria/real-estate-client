import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineHome } from "react-icons/hi";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface DashboardUser {
  name?: string | null;
  image?: string | null;
}

interface DashboardTopbarProps {
  user: DashboardUser;
  onMenuClick: () => void;
}

export function DashboardTopbar({ user, onMenuClick }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="p-2 rounded-md hover:bg-secondary transition-colors lg:hidden"
        >
          <HiOutlineMenu size={22} />
        </button>
        <span className="font-heading text-lg font-medium text-primary hidden sm:block">
          Estate<span className="text-accent">Hub</span>
          <span className="text-muted-foreground font-body text-sm font-normal ml-2">
            Dashboard
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          <HiOutlineHome size={16} />
          Back to site
        </Link>
        <ThemeToggle />
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
      </div>
    </header>
  );
}