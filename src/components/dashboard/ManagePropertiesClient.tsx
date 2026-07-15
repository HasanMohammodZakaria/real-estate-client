"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { HiOutlineTrash, HiOutlineOfficeBuilding } from "react-icons/hi";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { getAllPropertiesAdmin, deleteAnyProperty } from "@/app/lib/api/admin.api";
import type { Property } from "@/app/lib/actions/properties.actions";

export function ManagePropertiesClient() {
  const { token, isPending: authPending } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getAllPropertiesAdmin(token);
      setProperties(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load properties");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!authPending && token) {
      fetchProperties();
    }
  }, [authPending, token, fetchProperties]);

  const handleDelete = async (id: string) => {
    if (!token) return;
    setDeletingId(id);
    try {
      await deleteAnyProperty(id, token);
      toast.success("Property removed");
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete property");
    } finally {
      setDeletingId(null);
    }
  };

  if (authPending || loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-2xl animate-pulse"
            style={{ backgroundColor: "var(--card)" }}
          />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        No properties found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <div
          key={property._id}
          className="rounded-2xl p-4 flex flex-col gap-2"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2">
            <HiOutlineOfficeBuilding size={18} style={{ color: "var(--accent)" }} />
            <h3
              className="font-heading text-sm font-medium line-clamp-1"
              style={{ color: "var(--card-foreground)" }}
            >
              {property.title}
            </h3>
          </div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {property.location}
          </p>
          <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>
            ${property.price.toLocaleString()}
          </p>
          <button
            onClick={() => handleDelete(property._id)}
            disabled={deletingId === property._id}
            className="mt-2 flex items-center justify-center gap-1.5 text-xs py-2 rounded-(--radius) transition-colors hover:bg-secondary"
            style={{ border: "1px solid var(--border)", color: "var(--destructive)" }}
          >
            <HiOutlineTrash size={14} />
            {deletingId === property._id ? "Removing..." : "Remove Listing"}
          </button>
        </div>
      ))}
    </div>
  );
}