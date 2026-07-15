"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Label,
  Input,
  TextArea,
  Description,
  FieldError,
  Select,
  ListBox,
  Button,
} from "@heroui/react";
import { HiOutlineFlag, HiOutlineOfficeBuilding } from "react-icons/hi";
import { authClient } from "@/app/lib/auth-client";
import { createProperty } from "@/app/lib/api/properties.api";
import type { Priority } from "@/app/lib/actions/properties.actions";

const CATEGORY_OPTIONS = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "villa", label: "Villa" },
  { id: "land", label: "Land" },
  { id: "commercial", label: "Commercial" },
];

const PRIORITY_OPTIONS: { id: Priority; label: string }[] = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
];

export function AddPropertyForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const title = String(formData.get("title") ?? "").trim();
      const shortDescription = String(formData.get("shortDescription") ?? "").trim();
      const fullDescription = String(formData.get("fullDescription") ?? "").trim();
      const price = Number(formData.get("price"));
      const location = String(formData.get("location") ?? "").trim();
      const beds = Number(formData.get("beds"));
      const baths = Number(formData.get("baths"));
      const area = String(formData.get("area") ?? "").trim();
      const imageUrl = String(formData.get("imageUrl") ?? "").trim();

      if (
        !title ||
        !shortDescription ||
        !fullDescription ||
        !category ||
        !price ||
        !location ||
        !priority ||
        beds === undefined || Number.isNaN(beds) ||
        baths === undefined || Number.isNaN(baths) ||
        !area
      ) {
        setError("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      const { data } = await authClient.token();
      const token = data?.token;

      if (!token) {
        setError("Your session has expired. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      await createProperty(
        {
          title,
          shortDescription,
          fullDescription,
          category,
          price,
          location,
          priority: priority as Priority,
          beds,
          baths,
          area,
          ...(imageUrl ? { imageUrl } : {}),
        },
        token
      );

      router.push("/dashboard/properties/manage");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="rounded-2xl p-5 sm:p-8 max-w-3xl"
      style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
    >
      <h1
        className="font-heading text-2xl font-medium mb-1"
        style={{ color: "var(--card-foreground)" }}
      >
        Add a New Property
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
        Fill in the details below to list your property.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField name="title" isRequired>
          <Label>Title</Label>
          <Input placeholder="e.g. Modern 3-Bed Apartment in Gulshan" />
          <FieldError />
        </TextField>

        <TextField name="shortDescription" isRequired>
          <Label>Short Description</Label>
          <TextArea placeholder="A one or two line summary shown on listing cards" rows={2} />
          <FieldError />
        </TextField>

        <TextField name="fullDescription" isRequired>
          <Label>Full Description</Label>
          <TextArea placeholder="Detailed description shown on the property's details page" rows={5} />
          <FieldError />
        </TextField>

        {/* Category + Priority side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <Label>Category</Label>
            <Select
              placeholder="Select a category"
              onSelectionChange={(key) => setCategory(key as string)}
            >
              <Select.Trigger>
                <HiOutlineOfficeBuilding className="text-(--muted-foreground) shrink-0 mr-2" />
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
                      {opt.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Priority</Label>
            <Select
              placeholder="Select priority"
              onSelectionChange={(key) => setPriority(key as string)}
            >
              <Select.Trigger>
                <HiOutlineFlag className="text-(--muted-foreground) shrink-0 mr-2" />
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {PRIORITY_OPTIONS.map((opt) => (
                    <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
                      {opt.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {/* Price + Location side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField name="price" type="number" isRequired>
            <Label>Price</Label>
            <Input placeholder="e.g. 5500000" min={0} />
            <FieldError />
          </TextField>

          <TextField name="location" isRequired>
            <Label>Location</Label>
            <Input placeholder="e.g. Gulshan, Dhaka" />
            <FieldError />
          </TextField>
        </div>

        {/* Beds + Baths side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField name="beds" type="number" isRequired>
            <Label>Beds</Label>
            <Input placeholder="e.g. 3" min={0} />
            <FieldError />
          </TextField>

          <TextField name="baths" type="number" isRequired>
            <Label>Baths</Label>
            <Input placeholder="e.g. 2" min={0} />
            <FieldError />
          </TextField>
        </div>

        <TextField name="area" isRequired>
          <Label>Area</Label>
          <Input placeholder="e.g. 1450 sqft" />
          <FieldError />
        </TextField>

        <TextField name="imageUrl">
          <Label>Image URL</Label>
          <Input placeholder="https://... (optional)" />
          <Description>Optional — leave blank if you don&apos;t have one</Description>
        </TextField>

        {error && (
          <p
            className="text-sm rounded-(--radius) px-4 py-2.5"
            style={{ color: "var(--destructive)", backgroundColor: "var(--secondary)" }}
          >
            {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="submit"
            isPending={isSubmitting}
            className="font-medium"
            style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            {isSubmitting ? "Submitting..." : "Add Property"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onPress={() => router.back()}
            isDisabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}