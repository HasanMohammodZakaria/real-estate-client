import { getPropertyStats } from "@/app/lib/actions/properties.actions";

export async function StatsSection() {
  const stats = await getPropertyStats();

  const items = [
    { label: "Properties Listed", value: stats.totalProperties },
    { label: "Categories", value: stats.totalCategories },
    { label: "Locations Covered", value: stats.totalLocations },
  ];

  return (
    <section className="py-14" style={{ backgroundColor: "var(--primary)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {items.map((item) => (
          <div key={item.label}>
            <p className="font-heading text-4xl font-medium" style={{ color: "var(--primary-foreground)" }}>
              {item.value}+
            </p>
            <p className="text-sm mt-1 opacity-80" style={{ color: "var(--primary-foreground)" }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}