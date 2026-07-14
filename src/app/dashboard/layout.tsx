import { requireSession } from "@/app/lib/actions/session.actions";
import { DashboardShell } from "@/components/dashboard/DashboardShell";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const session = await requireSession();

  const role: "admin" | "user" = session.user.role === "admin" ? "admin" : "user";

  return (
    <DashboardShell
      initialUser={{
        name: session.user.name,
        image: session.user.image,
      }}
      role={role}
    >
      {children}
    </DashboardShell>
  );
}