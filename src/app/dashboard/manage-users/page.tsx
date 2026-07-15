import { requireAdminSession } from "@/app/lib/actions/session.actions";
import { ManageUsersClient } from "@/components/dashboard/ManageUsersClient";


export default async function ManageUsersPage() {
  await requireAdminSession(); // admin না হলে এখানেই redirect হয়ে যাবে

  return (
    <div>
      <h1
        className="font-heading text-2xl font-medium mb-1"
        style={{ color: "var(--foreground)" }}
      >
        Manage Users
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
        View, promote, or remove user accounts.
      </p>

      <ManageUsersClient />
    </div>
  );
}