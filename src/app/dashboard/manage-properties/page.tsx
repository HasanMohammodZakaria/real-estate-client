import { requireAdminSession } from "@/app/lib/actions/session.actions";
import { ManagePropertiesClient } from "@/components/dashboard/ManagePropertiesClient";


export default async function ManagePropertiesAdminPage() {
  await requireAdminSession();

  return (
    <div>
      <h1
        className="font-heading text-2xl font-medium mb-1"
        style={{ color: "var(--foreground)" }}
      >
        All Properties
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
        Moderate every property listed on the platform.
      </p>

      <ManagePropertiesClient />
    </div>
  );
}