"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Backend endpoint না থাকলে এখন শুধু UI feedback দেখাচ্ছে
    setSubmitted(true);
  };

  return (
    <section className="py-16" style={{ backgroundColor: "var(--secondary)" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading text-2xl font-medium mb-2" style={{ color: "var(--secondary-foreground)" }}>
          Stay Updated
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
          Get notified about new property listings in your area.
        </p>

        {submitted ? (
          <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>
            Thanks! You&apos;re on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-(--radius) px-4 py-2.5 text-sm outline-none"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)" }}
            />
            <button
              type="submit"
              className="text-sm font-medium px-5 py-2.5 rounded-(--radius)"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}