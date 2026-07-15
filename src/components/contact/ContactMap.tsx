"use client";

import { motion } from "framer-motion";
import {
  HiOutlineBuildingOffice2,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";

export default function ContactMap() {
  return (
    <section className="bg-background pb-16 md:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
            Visit Our Office
          </span>

          <h2 className="mt-5 text-3xl font-bold text-foreground md:text-4xl">
            We'd Love to Welcome You
          </h2>

          <p className="mt-4 leading-8 text-muted-foreground">
            Visit our office to discuss your real estate needs. Whether you are
            looking to buy, sell, or invest, our team is always ready to help.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Google Map */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-(--radius) border border-border lg:col-span-2"
          >
            <iframe
              title="Estate Hub Location"
              src="https://www.google.com/maps?q=Mirpur+DOHS+Dhaka&output=embed"
              className="h-125 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Office Information */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-(--radius) border border-border bg-card p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-(--radius) bg-secondary">
              <HiOutlineBuildingOffice2 className="text-3xl text-primary" />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-foreground">
              Estate Hub Office
            </h3>

            <div className="mt-8 space-y-6">

              <div className="flex items-start gap-4">
                <HiOutlineMapPin className="mt-1 text-2xl text-primary" />

                <div>
                  <h4 className="font-semibold text-foreground">
                    Address
                  </h4>

                  <p className="mt-1 text-muted-foreground">
                    House 25, Road 12,
                    <br />
                    Mirpur DOHS,
                    <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <HiOutlinePhone className="text-2xl text-primary" />

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
                <HiOutlineEnvelope className="text-2xl text-primary" />

                <div>
                  <h4 className="font-semibold text-foreground">
                    Email
                  </h4>

                  <p className="text-muted-foreground">
                    admin@ehub.com
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}