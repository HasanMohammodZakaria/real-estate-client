import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/app/lib/actions/properties.actions";
import {
  HiOutlineLocationMarker,
  HiOutlineArrowLeft,
  HiOutlineTag,
} from "react-icons/hi";
import { PiBedFill, PiBathtubFill, PiRulerFill } from "react-icons/pi";

interface PropertyDetailsPageProps {
  params: Promise<{ id: string }>;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200";

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  const isLand = property.category === "land";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/properties"
        className="inline-flex items-center gap-1.5 text-sm mb-5 hover:underline"
        style={{ color: "var(--muted-foreground)" }}
      >
        <HiOutlineArrowLeft size={16} />
        Back to Properties
      </Link>

      {/* Media */}
      <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-6">
        <Image
          src={property.imageUrl || FALLBACK_IMAGE}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
          priority
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full capitalize mb-2"
            style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}
          >
            <HiOutlineTag size={12} />
            {property.category}
          </span>
          <h1
            className="font-heading text-2xl sm:text-3xl font-medium mb-1"
            style={{ color: "var(--foreground)" }}
          >
            {property.title}
          </h1>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <HiOutlineLocationMarker size={16} />
            {property.location}
          </div>
        </div>
        <p className="font-heading text-3xl font-medium shrink-0" style={{ color: "var(--primary)" }}>
          ${property.price.toLocaleString()}
        </p>
      </div>

      {/* Key info / specifications */}
      <div
        className="grid grid-cols-3 gap-3 mb-8 rounded-2xl p-5"
        style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
      >
        {isLand ? (
          <div className="col-span-3 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Land Area
            </p>
            <p className="font-heading text-xl font-medium" style={{ color: "var(--card-foreground)" }}>
              {property.area}
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <PiBedFill size={22} className="mx-auto mb-1" style={{ color: "var(--accent)" }} />
              <p className="font-medium" style={{ color: "var(--card-foreground)" }}>
                {property.beds}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Beds
              </p>
            </div>
            <div className="text-center" style={{ borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
              <PiBathtubFill size={22} className="mx-auto mb-1" style={{ color: "var(--accent)" }} />
              <p className="font-medium" style={{ color: "var(--card-foreground)" }}>
                {property.baths}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Baths
              </p>
            </div>
            <div className="text-center">
              <PiRulerFill size={22} className="mx-auto mb-1" style={{ color: "var(--accent)" }} />
              <p className="font-medium" style={{ color: "var(--card-foreground)" }}>
                {property.area}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Area
              </p>
            </div>
          </>
        )}
      </div>

      {/* Description / Overview */}
      <div
        className="rounded-2xl p-5 sm:p-6 mb-6"
        style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h2
          className="font-heading text-lg font-medium mb-3"
          style={{ color: "var(--card-foreground)" }}
        >
          Overview
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {property.fullDescription}
        </p>
      </div>
    </div>
  );
}