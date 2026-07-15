import { getProperties } from "@/app/lib/actions/properties.actions";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { PropertyPagination } from "@/components/properties/PropertyPagination";

interface PropertiesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
  }>;
}

const PAGE_LIMIT = "8"; // matches backend default; grid shows 4/row so this is 2 rows per page

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;

  const { items, page, totalPages } = await getProperties({
    ...params,
    limit: PAGE_LIMIT,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <h1
          className="font-heading text-2xl sm:text-3xl font-medium mb-1"
          style={{ color: "var(--foreground)" }}
        >
          Explore Properties
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Browse listings and find your next property.
        </p>
      </div>

      <PropertyFilters />
      <PropertyGrid properties={items} />
      <PropertyPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}