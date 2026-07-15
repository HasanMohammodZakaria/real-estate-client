"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiStar, HiOutlineTrash } from "react-icons/hi";
import { authClient } from "@/app/lib/auth-client";
import { deleteReview, type Review } from "@/app/lib/api/reviews.api";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const { data } = await authClient.token();
      const token = data?.token;
      if (!token) return;
      await deleteReview(id, token);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  if (reviews.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        No reviews yet. Be the first to share your experience.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => {
        const isOwner = session?.user?.email === review.reviewerEmail;
        return (
          <div
            key={review._id}
            className="rounded-2xl p-4"
            style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--card-foreground)" }}>
                  {review.reviewerName || "Anonymous"}
                </p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <HiStar
                      key={star}
                      size={14}
                      style={{
                        color: star <= review.rating ? "var(--accent)" : "var(--border)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {isOwner && (
                <button
                  onClick={() => handleDelete(review._id)}
                  disabled={deletingId === review._id}
                  aria-label="Delete review"
                  className="p-1.5 rounded-md transition-colors hover:bg-secondary"
                >
                  <HiOutlineTrash size={16} style={{ color: "var(--destructive)" }} />
                </button>
              )}
            </div>

            <p className="text-sm mt-2" style={{ color: "var(--muted-foreground)" }}>
              {review.comment}
            </p>

            <p className="text-xs mt-2" style={{ color: "var(--muted-foreground)" }}>
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}