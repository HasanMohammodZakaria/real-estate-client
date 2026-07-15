"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineHomeModern } from "react-icons/hi2";

const slides = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
];

const rotatingWords = ["Apartment", "Villa", "Office"];

export default function Banner() {
  const [slide, setSlide] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setWord((w) => (w + 1) % rotatingWords.length),
      2200
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[62vh] min-h-130 w-full overflow-hidden md:h-[70vh]">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[slide]}
            alt="Featured property"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/20" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-3 flex items-center gap-2 rounded-DEFAULT bg-secondary px-3 py-1 text-xs font-medium tracking-wide text-secondary-foreground"
        >
          <HiOutlineHomeModern className="h-4 w-4" />
          DHAKA&apos;S TRUSTED PROPERTY MARKETPLACE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl"
        >
          Find your next{" "}
          <span className="relative inline-block h-[1.2em] w-[6.5ch] overflow-hidden align-bottom text-primary dark:text-accent">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[word]}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute left-0"
              >
                {rotatingWords[word]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          without the guesswork.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-4 max-w-xl text-muted-foreground"
        >
          Browse verified listings across Dhaka, compare prices instantly, and
          connect with agents who actually respond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-6 flex gap-3"
        >
          <Link
            href="/explore"
            className="group flex items-center gap-2 rounded-DEFAULT bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Browse Properties
            <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/dashboard/properties/add"
            className="rounded-DEFAULT border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground transition-colors hover:border-accent"
          >
            List Your Property
          </Link>
        </motion.div>
      </div>
    </section>
  );
}