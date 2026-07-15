"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiOutlineBuildingOffice2,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-20 lg:py-24">
      {/* Background Blur */}
    

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:flex-row lg:px-8">
        {/* ================= LEFT ================= */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary shadow-sm">
            About Estate Hub
          </span>

          <h1 className="mt-6 text-2xl font-bold leading-tight text-foreground sm:text-5xl lg:text-5xl">
            Building Dreams,
            <span className="block text-primary">
              Creating Communities.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Estate Hub is a modern real estate platform helping people buy,
            sell, and rent properties with complete confidence. We combine
            verified listings, trusted agents, and innovative technology to
            make every property journey simple, secure, and enjoyable.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-(--radius) bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              Explore Properties
              <HiArrowRight className="ml-2 text-lg" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-(--radius) border border-border bg-card px-6 py-3 font-semibold text-foreground transition-all duration-300 hover:bg-secondary"
            >
              Contact Us
            </Link>
          </div>

          {/* Small Stats */}

          <div className="mt-12 grid grid-cols-3 gap-5">
            <div className="rounded-(--radius) border border-border bg-card p-5 text-center shadow-sm">
              <HiOutlineBuildingOffice2 className="mx-auto mb-3 text-3xl text-primary" />

              <h3 className="text-2xl font-bold text-foreground">
                15K+
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Properties
              </p>
            </div>

            <div className="rounded-(--radius) border border-border bg-card p-5 text-center shadow-sm">
              <HiOutlineUsers className="mx-auto mb-3 text-3xl text-primary" />

              <h3 className="text-2xl font-bold text-foreground">
                350+
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Trusted Agents
              </p>
            </div>

            <div className="rounded-(--radius) border border-border bg-card p-5 text-center shadow-sm">
              <HiOutlineHomeModern className="mx-auto mb-3 text-3xl text-primary" />

              <h3 className="text-2xl font-bold text-foreground">
                98%
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Happy Clients
              </p>
            </div>
          </div>
        </motion.div>
                {/* ================= RIGHT ================= */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative flex-1"
        >
          {/* Main Image */}
          <div className="overflow-hidden rounded-(--radius) border border-border bg-card">
            <Image
              src="/images/about/about-hero.jpg"
              alt="Estate Hub"
              width={700}
              height={800}
              priority
              className="h-105 w-full object-cover md:h-140"
            />
          </div>

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute -left-4 top-8 rounded-(--radius) border border-border bg-card p-5 shadow-xl md:-left-8"
          >
            <p className="text-3xl font-bold text-primary">
              10+
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Years Experience
            </p>
          </motion.div>

          {/* Bottom Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 right-4 rounded-(--radius) border border-border bg-card px-6 py-5 shadow-xl md:right-8"
          >
            <h3 className="text-2xl font-bold text-primary">
              5K+
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Properties Sold
            </p>
          </motion.div>

          {/* Decorative Circle */}
          <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

          <div className="absolute -bottom-12 left-10 -z-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}