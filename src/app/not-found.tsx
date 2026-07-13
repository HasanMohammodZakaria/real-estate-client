import Link from "next/link";
import { HiOutlineLocationMarker, HiOutlineHome, HiOutlineSearch } from "react-icons/hi";

// This file goes at app/not-found.tsx — Next.js automatically shows it
// for any route that doesn't match (like a missing page.tsx).
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        {/* Signature visual: a "dropped pin with no address" motif,
            tying the 404 concept back to the real-estate subject matter */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="h-28 w-28 rounded-full bg-secondary flex items-center justify-center">
            <HiOutlineLocationMarker size={52} className="text-accent" />
          </div>
          <span className="absolute -bottom-1 -right-1 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-heading font-semibold border-4 border-background">
            !
          </span>
        </div>

        <p className="font-heading text-7xl sm:text-8xl font-medium text-primary leading-none mb-3">
          404
        </p>

        <h1 className="font-heading text-xl sm:text-2xl font-medium text-foreground mb-3">
          This address doesn&apos;t exist
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
          The page you&apos;re looking for may have been moved, renamed, or
          never listed in the first place. Let&apos;s get you back to known
          ground.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-(--radius) bg-primary text-primary-foreground text-sm font-body font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <HiOutlineHome size={18} />
            Back to Home
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-(--radius) border border-border text-sm font-body font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <HiOutlineSearch size={18} />
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}