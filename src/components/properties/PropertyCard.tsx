"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { HiOutlineLocationMarker, HiOutlineHome, HiArrowRight } from "react-icons/hi";
import { PiBedFill, PiBathtubFill, PiRulerFill } from "react-icons/pi";
import type { Property } from "@/app/lib/actions/properties.actions";

const PRIORITY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: "var(--accent)", text: "var(--accent-foreground)", label: "Featured" },
  medium: { bg: "var(--secondary)", text: "var(--secondary-foreground)", label: "Popular" },
  low: { bg: "var(--muted)", text: "var(--muted-foreground)", label: "New" },
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";

export function PropertyCard({ property }: { property: Property }) {
  const priorityStyle = PRIORITY_STYLES[property.priority] ?? PRIORITY_STYLES.low;
  const isLand = property.category === "land";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden flex flex-col h-full"
      style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full w-full relative"
        >
          <Image
            src={property.imageUrl || FALLBACK_IMAGE}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute top-3 left-3 flex gap-2">
          {/* Custom-colored chip via style override (CSS variables), not the built-in color enum */}
          <Chip
            className="font-medium capitalize"
            style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.text }}
          >
            {priorityStyle.label}
          </Chip>
          <Chip
            variant="soft"
            className="capitalize font-medium"
            style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)" }}
          >
            {property.category}
          </Chip>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <h3
          className="font-heading text-base font-medium line-clamp-1"
          style={{ color: "var(--card-foreground)" }}
        >
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <HiOutlineLocationMarker size={14} className="shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <p className="text-sm line-clamp-2 flex-1" style={{ color: "var(--muted-foreground)" }}>
          {property.shortDescription}
        </p>

        {/* Meta row — beds/baths/area, or a land icon when not applicable */}
        {!isLand ? (
          <div
            className="flex items-center gap-3 text-xs pt-2 mt-1"
            style={{ borderTop: "1px solid var(--border)", color: "var(--muted-foreground)" }}
          >
            <span className="flex items-center gap-1">
              <PiBedFill size={14} /> {property.beds}
            </span>
            <span className="flex items-center gap-1">
              <PiBathtubFill size={14} /> {property.baths}
            </span>
            <span className="flex items-center gap-1">
              <PiRulerFill size={14} /> {property.area}
            </span>
          </div>
        ) : (
          <div
            className="flex items-center gap-1.5 text-xs pt-2 mt-1"
            style={{ borderTop: "1px solid var(--border)", color: "var(--muted-foreground)" }}
          >
            <HiOutlineHome size={14} />
            <span>{property.area}</span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2">
          <p className="font-heading text-lg font-medium" style={{ color: "var(--primary)" }}>
            ${property.price.toLocaleString()}
          </p>
          {/* HeroUI v3's Button has no `as` prop — style a Next.js Link directly with buttonVariants instead */}
          <Link
            href={`/properties/${property._id}`}
            className={buttonVariants({ variant: "primary", size: "sm" })}
            style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            View Details
            <HiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}