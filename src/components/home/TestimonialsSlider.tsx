"use client";

import { useState, useEffect, useCallback } from "react";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { Review } from "@/app/lib/api/reviews.api";

interface TestimonialsSliderProps {
  reviews: Review[];
}

export function TestimonialsSlider({ reviews }: TestimonialsSliderProps) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prev = () => {
    setIndex((p) => (p - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, reviews.length]);

  if (reviews.length === 0) return null;

  const review = reviews[index];

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h2
        className="font-heading text-2xl sm:text-3xl font-medium mb-10 text-center"
        style={{ color: "var(--foreground)" }}
      >
        What Our Users Say
      </h2>

      <div
        className="relative rounded-2xl p-8 sm:p-10 text-center"
        style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <HiStar
              key={star}
              size={18}
              style={{ color: star <= review.rating ? "var(--accent)" : "var(--border)" }}
            />
          ))}
        </div>

        <p
          className="text-base sm:text-lg leading-relaxed mb-6"
          style={{ color: "var(--card-foreground)" }}
        >
          &ldquo;{review.comment}&rdquo;
        </p>

        <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>
          {review.reviewerName || "Anonymous"}
        </p>

        {reviews.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous review"
              className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center transition-colors hover:bg-secondary"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
            >
              <HiChevronLeft size={18} style={{ color: "var(--foreground)" }} />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center transition-colors hover:bg-secondary"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
            >
              <HiChevronRight size={18} style={{ color: "var(--foreground)" }} />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? "20px" : "6px",
                  backgroundColor: i === index ? "var(--primary)" : "var(--border)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}