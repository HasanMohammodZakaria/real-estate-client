"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi2";

export default function OurStory() {
  return (
    <section className="bg-background py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* ================= Images ================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Large Image */}

            <div className="overflow-hidden rounded-(--radius) border border-border">
              <Image
                src="/images/about/our-story.jpg"
                alt="Estate Hub Story"
                width={700}
                height={800}
                className="h-130 w-full object-cover"
              />
            </div>

            {/* Small Floating Image */}

            <div className="absolute -bottom-8 -right-6 hidden overflow-hidden rounded-(--radius) border-4 border-background md:block">
              <Image
                src="/images/about/our-story-2.png"
                alt="Modern Home"
                width={240}
                height={260}
                className="h-56 w-48 object-cover"
              />
            </div>
          </motion.div>

          {/* ================= Content ================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
          >

            <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
              Our Story
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Building Trust,
              <span className="block text-primary">
                Creating Better Living Experiences
              </span>
            </h2>

            <p className="mt-6 leading-8 text-muted-foreground">
              Estate Hub was founded with a simple vision—to make real estate
              more transparent, accessible, and reliable for everyone.
              Whether you are buying your first home, selling a property,
              or searching for a valuable investment, we simplify every
              step of the journey.
            </p>

            <p className="mt-5 leading-8 text-muted-foreground">
              By combining verified listings, trusted real estate
              professionals, and modern technology, we help buyers,
              sellers, and renters make confident decisions while
              delivering a secure and seamless experience.
            </p>

            {/* Features */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <HiCheckCircle className="text-2xl text-success" />
                <span className="text-foreground">
                  Verified Property Listings
                </span>
              </div>

              <div className="flex items-center gap-3">
                <HiCheckCircle className="text-2xl text-success" />
                <span className="text-foreground">
                  Trusted Real Estate Experts
                </span>
              </div>

              <div className="flex items-center gap-3">
                <HiCheckCircle className="text-2xl text-success" />
                <span className="text-foreground">
                  Transparent Buying & Selling Process
                </span>
              </div>

              <div className="flex items-center gap-3">
                <HiCheckCircle className="text-2xl text-success" />
                <span className="text-foreground">
                  Smart Property Search Experience
                </span>
              </div>

            </div>

            <Link
              href="/properties"
              className="mt-10 inline-flex items-center rounded-(--radius) bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Discover Properties
              <HiArrowRight className="ml-2 text-lg" />
            </Link>

          </motion.div>
                  </div>

        {/* ================= Statistics ================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-4"
        >
          <div className="rounded-(--radius) border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-3xl font-bold text-primary">
              12K+
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Verified Properties
            </p>
          </div>

          <div className="rounded-(--radius) border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-3xl font-bold text-primary">
              350+
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Professional Agents
            </p>
          </div>

          <div className="rounded-(--radius) border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-3xl font-bold text-primary">
              20+
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Cities Covered
            </p>
          </div>

          <div className="rounded-(--radius) border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-3xl font-bold text-primary">
              98%
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Happy Customers
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}