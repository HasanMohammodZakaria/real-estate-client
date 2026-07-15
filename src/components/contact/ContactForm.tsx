"use client";

import { motion } from "framer-motion";
import {
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlinePhone,
} from "react-icons/hi2";

export default function ContactForm() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-5">

          {/* ================= Form ================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-(--radius) border border-border bg-card p-8"
          >

            <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
              Send Message
            </span>

            <h2 className="mt-5 text-3xl font-bold text-foreground">
              We'd Love to Hear From You
            </h2>

            <p className="mt-3 text-muted-foreground">
              Have a question about buying, selling, renting,
              or investing? Fill out the form below and our
              team will get back to you as soon as possible.
            </p>

            <form className="mt-8 space-y-6">

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    First Name
                  </label>

                  <input
                    type="text"
                    placeholder="John"
                    className="w-full rounded-(--radius) border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-(--radius) border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                  />
                </div>

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-(--radius) border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    placeholder="+880..."
                    className="w-full rounded-(--radius) border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                  />
                </div>

              </div>
                            {/* Subject */}

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full rounded-(--radius) border border-border bg-background px-4 py-3 outline-none transition-all duration-300 focus:border-primary"
                />
              </div>

              {/* Message */}

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-(--radius) border border-border bg-background px-4 py-3 outline-none transition-all duration-300 focus:border-primary"
                />
              </div>

              {/* Button */}

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-(--radius) bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90"
              >
                Send Message
              </button>

            </form>

          </motion.div>

          {/* ================= Contact Information ================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-2"
          >
            {/* Contact Card */}

            <div className="rounded-(--radius) border border-border bg-card p-6">

              <h3 className="text-2xl font-bold text-foreground">
                Contact Information
              </h3>

              <p className="mt-2 text-muted-foreground">
                Reach us anytime through the following contact details.
              </p>

              <div className="mt-6 space-y-5">

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-(--radius) bg-secondary">
                    <HiOutlinePhone className="text-2xl text-primary" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground">
                      Phone
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
                      Email
                    </h4>

                    <p className="text-muted-foreground">
                      admin@hub.com
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Business Hours */}

            <div className="rounded-(--radius) border border-border bg-card p-6">

              <div className="flex items-center gap-3">
                <HiOutlineClock className="text-2xl text-primary" />

                <h3 className="text-xl font-bold text-foreground">
                  Business Hours
                </h3>
              </div>

              <div className="mt-5 space-y-3">

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Saturday - Thursday
                  </span>

                  <span className="font-medium text-foreground">
                    9:00 AM - 7:00 PM
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Friday
                  </span>

                  <span className="font-medium text-destructive">
                    Closed
                  </span>
                </div>

              </div>

              <div className="mt-6 rounded-(--radius) bg-secondary p-4">

                <h4 className="font-semibold text-primary">
                  Average Response Time
                </h4>

                <p className="mt-1 text-sm text-muted-foreground">
                  We typically reply to all inquiries within 24 hours during business days.
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}