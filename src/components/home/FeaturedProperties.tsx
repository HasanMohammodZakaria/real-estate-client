import Link from "next/link";
import { getProperties } from "@/app/lib/actions/properties.actions";
import { PropertyCard } from "@/components/properties/PropertyCard";

export async function FeaturedProperties() {
  const { items } = await getProperties({ page: "1", limit: "4", sortBy: "newest" });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-medium" style={{ color: "var(--foreground)" }}>
            Featured Properties
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Handpicked listings you might like
          </p>
        </div>
        <Link
          href="/properties"
          className="text-sm font-medium hidden sm:block"
          style={{ color: "var(--primary)" }}
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </section>
  );
}