"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function ContactCTA() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Forward to mailto with prefilled subject
    const subject = encodeURIComponent("Project inquiry");
    const body = encodeURIComponent(
      `Hi Code4U,\n\nPlease reach out to me at ${email}.`,
    );
    window.location.href = `mailto:${siteConfig.author.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative section-padding overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 grid-backdrop opacity-50"
        aria-hidden="true"
      />

      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-card border border-accent/20 bg-bg-light-card dark:bg-bg-dark-card p-10 md:p-16 shadow-card text-center"
        >
          <div
            className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-300/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Get in touch
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
              Ready to{" "}
              <span className="text-gradient-green">get started?</span>
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-text-body dark:text-text-dark-b">
              Write your email address so we can contact you. We respond to
              most inquiries within 24 hours.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              aria-label="Quick contact form"
            >
              <div className="relative flex-1">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-body/60 dark:text-text-dark-b/60"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-input border border-gray-300 bg-bg-light pl-11 pr-4 text-sm text-text-heading placeholder:text-gray-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-accent/20 dark:bg-bg-dark dark:text-text-dark-h dark:placeholder:text-text-dark-b/50"
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-input bg-primary-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-accent dark:text-bg-dark dark:hover:bg-accent-bright"
              >
                Get started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <p className="mt-6 text-sm text-text-body dark:text-text-dark-b">
              Or email us directly at{" "}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="font-medium text-primary-700 dark:text-accent hover:underline"
              >
                {siteConfig.author.email}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
