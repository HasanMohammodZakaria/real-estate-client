import { requireSession, getServerToken } from "@/app/lib/actions/session.actions";
import { getMyPropertiesServer } from "@/app/lib/actions/properties.actions";
import Link from "next/link";
import { HiOutlineOfficeBuilding, HiOutlinePlusCircle, HiOutlineCheckCircle } from "react-icons/hi";

export default async function DashboardOverviewPage() {
  const session = await requireSession();
  const token = await getServerToken();

  let propertyCount = 0;
  if (token) {
    try {
      const { items } = await getMyPropertiesServer(token);
      propertyCount = items.length;
    } catch {
      propertyCount = 0;
    }
  }

  return (
    <div>
      <h1
        className="font-heading text-2xl font-medium mb-1"
        style={{ color: "var(--foreground)" }}
      >
        Welcome back, {session.user.name}
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
        Here&apos;s a quick overview of your account.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Your Properties
            </p>
            <HiOutlineOfficeBuilding size={20} style={{ color: "var(--accent)" }} />
          </div>
          <p
            className="text-3xl font-heading font-medium"
            style={{ color: "var(--card-foreground)" }}
          >
            {propertyCount}
          </p>
        </div>

        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Account Role
            </p>
            <HiOutlineCheckCircle size={20} style={{ color: "var(--accent)" }} />
          </div>
          <p
            className="text-3xl font-heading font-medium capitalize"
            style={{ color: "var(--card-foreground)" }}
          >
            {session.user.role ?? "user"}
          </p>
        </div>

        <div
          className="rounded-2xl p-5 flex flex-col justify-between"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <p className="text-sm opacity-90 mb-3">Ready to list a new property?</p>
          <Link
            href="/dashboard/properties/add"
            className="inline-flex items-center gap-2 text-sm font-medium"
          >
            <HiOutlinePlusCircle size={18} />
            Add Property
          </Link>
        </div>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h2
          className="font-heading text-lg font-medium mb-2"
          style={{ color: "var(--card-foreground)" }}
        >
          Quick Links
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link
            href="/dashboard/properties/manage"
            className="text-sm px-4 py-2.5 rounded-(--radius) text-center transition-colors"
            style={{ border: "1px solid var(--border)", color: "var(--card-foreground)" }}
          >
            Manage My Properties
          </Link>
          <Link
            href="/properties"
            className="text-sm px-4 py-2.5 rounded-(--radius) text-center transition-colors"
            style={{ border: "1px solid var(--border)", color: "var(--card-foreground)" }}
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    </div>
  );
}