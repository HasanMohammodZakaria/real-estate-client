"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineLocationMarker,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import { Button } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import { deleteProperty } from "@/app/lib/api/properties.api";

export interface Property {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  price: number;
  location: string;
  priority: "low" | "medium" | "high";
  imageUrl?: string;
}

interface PropertyCardProps {
  property: Property;
  onDeleted: (id: string) => void;
}

const PRIORITY_STYLES: Record<Property["priority"], { bg: string; text: string }> = {
  high: { bg: "var(--destructive)", text: "var(--primary-foreground)" },
  medium: { bg: "var(--accent)", text: "var(--accent-foreground)" },
  low: { bg: "var(--secondary)", text: "var(--secondary-foreground)" },
};

export function PropertyCard({ property, onDeleted }: PropertyCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priorityStyle = PRIORITY_STYLES[property.priority] ?? PRIORITY_STYLES.low;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const { data } = await authClient.token();
      const token = data?.token;
      if (!token) {
        setError("Session expired. Please log in again.");
        setIsDeleting(false);
        return;
      }
      await deleteProperty(property._id, token);
      onDeleted(property._id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete property");
      setIsDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col h-full transition-shadow hover:shadow-md"
      style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* Image */}
      <div className="relative h-44 w-full bg-secondary">
        {property.imageUrl ? (
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <HiOutlineOfficeBuilding size={36} className="text-(--muted-foreground)" />
          </div>
        )}

        <span
          className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full capitalize"
          style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.text }}
        >
          {property.priority}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full capitalize"
            style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
          >
            {property.category}
          </span>
        </div>

        <h3
          className="font-heading text-base font-medium mb-1 line-clamp-1"
          style={{ color: "var(--card-foreground)" }}
        >
          {property.title}
        </h3>

        <p
          className="text-sm mb-2 line-clamp-2 flex-1"
          style={{ color: "var(--muted-foreground)" }}
        >
          {property.shortDescription}
        </p>

        <div
          className="flex items-center gap-1 text-xs mb-3"
          style={{ color: "var(--muted-foreground)" }}
        >
          <HiOutlineLocationMarker size={14} />
          {property.location}
        </div>

        <p
          className="font-heading text-lg font-medium mb-4"
          style={{ color: "var(--primary)" }}
        >
          ${property.price.toLocaleString()}
        </p>

        {error && (
          <p className="text-xs mb-2" style={{ color: "var(--destructive)" }}>
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
          <Link
            href={`/dashboard/properties/edit/${property._id}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm py-2 rounded-(--radius) transition-colors hover:bg-secondary"
            style={{ border: "1px solid var(--border)", color: "var(--card-foreground)" }}
          >
            <HiOutlinePencil size={15} />
            Edit
          </Link>

          {confirmOpen ? (
            <div className="flex-1 flex items-center gap-1.5">
              <Button
                type="button"
                size="sm"
                variant="danger"
                isPending={isDeleting}
                onPress={handleDelete}
                className="flex-1"
              >
                Confirm
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                isDisabled={isDeleting}
                onPress={() => setConfirmOpen(false)}
                className="flex-1"
              >
                No
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 text-sm py-2 rounded-(--radius) transition-colors hover:bg-secondary"
              style={{ border: "1px solid var(--border)", color: "var(--destructive)" }}
            >
              <HiOutlineTrash size={15} />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}