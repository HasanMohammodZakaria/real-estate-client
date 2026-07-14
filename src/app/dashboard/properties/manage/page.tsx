"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { getMyProperties } from "@/app/lib/api/properties.api";
import { PropertyCard, type Property } from "@/components/dashboard/PropertyCard";

export default function ManagePropertiesPage() {
  const { data: session } = authClient.useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await authClient.token();
      const token = data?.token;
      if (!token) return;
      try {
        const res = await getMyProperties(token);
        setProperties(res.items);
      } finally {
        setLoading(false);
      }
    };
    if (session) load();
  }, [session]);

  const handleDeleted = (id: string) => {
    setProperties((prev) => prev.filter((p) => p._id !== id));
  };

  if (loading) return <p>Loading...</p>; // এখানে skeleton বসাতে পারো

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium mb-6" style={{ color: "var(--foreground)" }}>
        My Properties
      </h1>

      {properties.length === 0 ? (
        <p style={{ color: "var(--muted-foreground)" }}>
          You haven&apos;t added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} onDeleted={handleDeleted} />
          ))}
        </div>
      )}
    </div>
  );
}