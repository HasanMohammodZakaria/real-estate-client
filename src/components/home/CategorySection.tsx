import Link from "next/link";
import { HiOutlineHome, HiOutlineOfficeBuilding} from "react-icons/hi";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { PiMountainsBold, PiBuildingsBold } from "react-icons/pi";

const CATEGORIES = [
  { key: "apartment", label: "Apartment", icon: HiOutlineOfficeBuilding },
  { key: "house", label: "House", icon: HiOutlineHome },
  { key: "villa", label: "Villa", icon: HiOutlineHomeModern },
  { key: "land", label: "Land", icon: PiMountainsBold },
  { key: "commercial", label: "Commercial", icon: PiBuildingsBold },
];

export function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="font-heading text-2xl sm:text-3xl font-medium mb-8 text-center" style={{ color: "var(--foreground)" }}>
        Browse by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map(({ key, label, icon: Icon }) => (
          <Link
            key={key}
            href={`/properties?category=${key}`}
            className="flex flex-col items-center gap-3 rounded-2xl p-6 transition-transform hover:-translate-y-1"
            style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
          >
            <Icon size={28} style={{ color: "var(--accent)" }} />
            <span className="text-sm font-medium" style={{ color: "var(--card-foreground)" }}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}