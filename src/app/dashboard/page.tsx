import { requireSession, getServerToken } from "@/app/lib/actions/session.actions";
import { getMyPropertiesServer } from "@/app/lib/actions/properties.actions";
import { getAllPropertiesAdmin, getAllUsers } from "@/app/lib/api/admin.api";
import { PropertyCategoryChart } from "@/components/dashboard/PropertyCategoryChart";
import Link from "next/link";
import {
  HiOutlineOfficeBuilding,
  HiOutlinePlusCircle,
  HiOutlineCheckCircle,
  HiOutlineUsers,
} from "react-icons/hi";

export default async function DashboardOverviewPage() {
  const session = await requireSession();
  const token = await getServerToken();
  const isAdmin = session.user.role === "admin";

  let propertyCount = 0;
  let userCount = 0;
  let categoryData: { name: string; value: number }[] = [];

  if (token) {
    try {
      if (isAdmin) {
        const [allProperties, allUsers] = await Promise.all([
          getAllPropertiesAdmin(token),
          getAllUsers(token),
        ]);

        propertyCount = allProperties.length;
        userCount = allUsers.length;

        const counts: Record<string, number> = {};
        allProperties.forEach((p) => {
          counts[p.category] = (counts[p.category] ?? 0) + 1;
        });
        categoryData = Object.entries(counts).map(([name, value]) => ({ name, value }));
      } else {
        const { items } = await getMyPropertiesServer(token);
        propertyCount = items.length;
      }
    } catch {
      propertyCount = 0;
      userCount = 0;
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
        {isAdmin
          ? "Here's a platform-wide overview."
          : "Here's a quick overview of your account."}
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {isAdmin ? "Total Properties" : "Your Properties"}
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

        {isAdmin ? (
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Total Users
              </p>
              <HiOutlineUsers size={20} style={{ color: "var(--accent)" }} />
            </div>
            <p
              className="text-3xl font-heading font-medium"
              style={{ color: "var(--card-foreground)" }}
            >
              {userCount}
            </p>
          </div>
        ) : (
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
        )}

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

      {/* Admin-only: Category chart */}
      {isAdmin && categoryData.length > 0 && (
        <div
          className="rounded-2xl p-6 mb-10"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
        >
          <h2
            className="font-heading text-lg font-medium mb-4"
            style={{ color: "var(--card-foreground)" }}
          >
            Properties by Category
          </h2>
          <PropertyCategoryChart data={categoryData} />
        </div>
      )}

      {/* Quick Links */}
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
          {isAdmin ? (
            <>
              <Link
                href="/dashboard/manage-properties"
                className="text-sm px-4 py-2.5 rounded-(--radius) text-center transition-colors"
                style={{ border: "1px solid var(--border)", color: "var(--card-foreground)" }}
              >
                Manage All Properties
              </Link>
              <Link
                href="/dashboard/manage-users"
                className="text-sm px-4 py-2.5 rounded-(--radius) text-center transition-colors"
                style={{ border: "1px solid var(--border)", color: "var(--card-foreground)" }}
              >
                Manage Users
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}