import { notFound, redirect } from "next/navigation";
import { requireSession } from "@/app/lib/actions/session.actions";
import { getPropertyById } from "@/app/lib/actions/properties.actions";
import { EditPropertyForm } from "@/components/dashboard/EditPropertyForm";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
  const { id } = await params;
  const session = await requireSession();

  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  
  if (property.createdBy !== session.user.id && session.user.role !== "admin") {
    redirect("/dashboard/properties/manage");
  }

  return (
    <div className="flex justify-center">
      <EditPropertyForm property={property} />
    </div>
  );
}