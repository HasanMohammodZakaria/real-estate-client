"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input, Select, ListBox, Button, Spinner } from "@heroui/react";
import { HiOutlineSearch, HiOutlineLocationMarker, HiOutlineFilter, HiOutlineX } from "react-icons/hi";

const CATEGORY_OPTIONS = [
  { key: "apartment", label: "Apartment" },
  { key: "house", label: "House" },
  { key: "villa", label: "Villa" },
  { key: "land", label: "Land" },
  { key: "commercial", label: "Commercial" },
];

const SORT_OPTIONS = [
  { key: "newest", label: "Newest First" },
  { key: "oldest", label: "Oldest First" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

export function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") ?? "newest");

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1"); // any filter change resets to page 1

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const applyFilters = () => {
    updateParams({ search, location, minPrice, maxPrice, category, sortBy });
  };

  const handleClear = () => {
    setSearch("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
    setSortBy("newest");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters =
    searchParams.get("search") ||
    searchParams.get("category") ||
    searchParams.get("location") ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice");

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 mb-6"
      style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* Search + Location row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="relative">
          <HiOutlineSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--muted-foreground)" }}
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            fullWidth
            variant="primary"
            className="pl-9"
          />
        </div>
        <div className="relative">
          <HiOutlineLocationMarker
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--muted-foreground)" }}
          />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location, e.g. Gulshan"
            fullWidth
            variant="primary"
            className="pl-9"
          />
        </div>
      </div>

      {/* Category, Price range, Sort row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Select
          className="col-span-2 sm:col-span-1"
          placeholder="Category"
          value={category}
          onChange={(value) => setCategory(value as string)}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {CATEGORY_OPTIONS.map((opt) => (
                <ListBox.Item key={opt.key} id={opt.key} textValue={opt.label}>
                  {opt.label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          variant="primary"
          fullWidth
        />

        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          variant="primary"
          fullWidth
        />

        <Select
          className="col-span-2 sm:col-span-1"
          placeholder="Sort By"
          value={sortBy}
          onChange={(value) => setSortBy(value as string)}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {SORT_OPTIONS.map((opt) => (
                <ListBox.Item key={opt.key} id={opt.key} textValue={opt.label}>
                  {opt.label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Button
          onPress={applyFilters}
          isDisabled={isPending}
          className="font-medium"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          {isPending ? (
            <Spinner size="sm" />
          ) : (
            <>
              <HiOutlineFilter size={16} />
              Apply
            </>
          )}
        </Button>
      </div>

      {hasActiveFilters ? (
        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-xs mt-3 hover:underline"
          style={{ color: "var(--muted-foreground)" }}
        >
          <HiOutlineX size={14} />
          Clear all filters
        </button>
      ) : null}
    </div>
  );
}