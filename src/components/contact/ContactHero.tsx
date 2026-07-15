"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";

export default function ContactHero() {
  return (
    <section className="bg-background py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* ================= LEFT ================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
          >

            <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
              Contact Estate Hub
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-5xl">
              Let's Build Your
              <span className="block text-primary">
                Dream Property Journey
              </span>
            </h1>

            <p className="mt-6 max-w-xl leading-8 text-muted-foreground">
              Whether you are buying your first home, selling a property,
              or looking for the perfect investment opportunity,
              our experienced team is ready to guide you every step
              of the way.
            </p>

            {/* Contact Info */}

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-(--radius) bg-secondary">
                  <HiOutlineMapPin className="text-2xl text-primary" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">
                    Office Address
                  </h4>

                  <p className="text-muted-foreground">
                    Mirpur DOHS, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-(--radius) bg-secondary">
                  <HiOutlinePhone className="text-2xl text-primary" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">
                    Phone Number
                  </h4>

                  <p className="text-muted-foreground">
                    +880 1739-108253
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-(--radius) bg-secondary">
                  <HiOutlineEnvelope className="text-2xl text-primary" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">
                    Email Address
                  </h4>

                  <p className="text-muted-foreground">
                    admin@hub.com
                  </p>
                </div>
              </div>

            </div>

            <Link
              href="/properties"
              className="mt-10 inline-flex items-center rounded-(--radius) bg-primary px-6 py-3 font-semibold text-primary-foreground transition duration-300 hover:opacity-90"
            >
              Browse Properties

              <HiArrowRight className="ml-2 text-lg" />
            </Link>

          </motion.div>

          {/* ================= RIGHT ================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
            className="relative"
          >

            <div className="overflow-hidden rounded-(--radius) border border-border">
              <Image
                src="/images/contact/contact-hero.jpg"
                alt="Estate Hub Office"
                width={700}
                height={800}
                priority
                className="h-105 w-full object-cover md:h-140"
              />
            </div>
                        {/* Floating Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -left-5 top-8 rounded-(--radius) border border-border bg-card p-5 shadow-sm"
            >
              <p className="text-3xl font-bold text-primary">
                24/7
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Customer Support
              </p>
            </motion.div>

            {/* Floating Response Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 right-5 rounded-(--radius) border border-border bg-card px-6 py-5 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-primary">
                &lt; 24h
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Average Response Time
              </p>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}