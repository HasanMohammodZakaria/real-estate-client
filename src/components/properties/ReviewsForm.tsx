"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { HiStar } from "react-icons/hi";
import { authClient } from "@/app/lib/auth-client";
import { createReview } from "@/app/lib/api/reviews.api";

interface ReviewFormProps {
  propertyId: string;
}

export function ReviewForm({ propertyId }: ReviewFormProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!session) {
    return (
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Please{" "}
        <a href="/login" className="underline" style={{ color: "var(--primary)" }}>
          log in
        </a>{" "}
        to write a review.
      </p>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const comment = String(formData.get("comment") ?? "").trim();

    if (!rating || !comment) {
      setError("Please provide both a rating and a comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await authClient.token();
      const token = data?.token;
      if (!token) {
        setError("Your session has expired. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      await createReview({ propertyId, rating, comment }, token);

      setRating(0);
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Star rating input */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${star} star`}
          >
            <HiStar
              size={24}
              style={{
                color:
                  star <= (hoverRating || rating)
                    ? "var(--accent)"
                    : "var(--border)",
              }}
            />
          </button>
        ))}
      </div>

      <textarea
        name="comment"
        placeholder="Share your experience..."
        rows={3}
        className="w-full rounded-(--radius) px-3 py-2 text-sm outline-none"
        style={{
          backgroundColor: "var(--background)",
          border: "1px solid var(--border)",
          color: "var(--foreground)",
        }}
      />

      {error && (
        <p className="text-sm" style={{ color: "var(--destructive)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start text-sm font-medium px-4 py-2 rounded-(--radius) transition-opacity disabled:opacity-60"
        style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}