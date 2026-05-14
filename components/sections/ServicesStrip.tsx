"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Services"
          title="Full-stack solutions, built to last."
          description="From idea to deployment — web, mobile, AI, and cloud, all delivered with senior-level execution."
        />

        <div className="mt-12 md:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : idx * 0.06,
                  ease: "easeOut",
                }}
              >
                <Link
                  href="/services"
                  className="group relative flex h-full flex-col rounded-card border border-gray-200/70 bg-bg-light-card p-6 md:p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary-700/40 dark:border-accent/15 dark:bg-bg-dark-card dark:hover:border-accent/50"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-input bg-primary-50 text-primary-800 transition-colors group-hover:bg-primary-700 group-hover:text-white dark:bg-accent/10 dark:text-accent dark:group-hover:bg-accent dark:group-hover:text-bg-dark">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-text-heading dark:text-text-dark-h">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-body dark:text-text-dark-b">
                    {service.short}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-800 dark:text-accent">
                    Learn more
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
