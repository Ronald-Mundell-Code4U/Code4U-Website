"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Code2, Smartphone, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/Button";

const trustPoints = [
  "Extensive work experience",
  "Flexible working conditions",
  "Productive and responsive team",
];

export function Hero() {
  const reduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.08,
      },
    },
  };

  return (
    <section className="relative isolate overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28">
      {/* Background layers */}
      <div
        className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark opacity-90"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 grid-backdrop opacity-60"
        aria-hidden="true"
      />
      {/* Decorative blurred orbs */}
      <div
        className="absolute -top-32 -right-32 -z-10 h-[480px] w-[480px] rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-20 -z-10 h-[420px] w-[420px] rounded-full bg-primary-300/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.div
              variants={variants}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 dark:text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              Code4U · Vancouver, BC
            </motion.div>

            <motion.h1
              variants={variants}
              className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
            >
              Software development &{" "}
              <span className="text-gradient-green">mobile solutions.</span>
            </motion.h1>

            <motion.p
              variants={variants}
              className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-text-body dark:text-text-dark-b"
            >
              Code4U is a Vancouver-based software studio. We design, build, and
              maintain websites and mobile apps, plus a full range of IT
              services and solutions to help growing businesses scale.
            </motion.p>

            <motion.ul
              variants={variants}
              className="mt-8 space-y-3"
              aria-label="Why work with us"
            >
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-sm md:text-base font-medium text-text-heading dark:text-text-dark-h"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-primary-700 dark:text-accent">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={variants}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button href="/contact" size="lg" withArrow>
                Work with us
              </Button>
              <Button href="/services" size="lg" variant="outline">
                See services
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero image panel with floating accents */}
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative mx-auto aspect-square max-w-md">
              <div
                className="absolute inset-0 rounded-card bg-gradient-to-br from-primary-200/40 via-accent/20 to-transparent blur-2xl"
                aria-hidden="true"
              />
              <div className="relative h-full w-full overflow-hidden rounded-card border border-accent/20 shadow-card dark:border-accent/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero.jpg"
                  alt="Code4U design and development team at work"
                  className="h-full w-full object-cover"
                />
                {/* Subtle dark overlay for badge readability */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-bg-dark/40 via-transparent to-bg-dark/20"
                  aria-hidden="true"
                />
                {/* Branded logo watermark in corner */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-bg-dark/60 backdrop-blur-sm px-3 py-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-icon.png"
                    alt=""
                    className="h-5 w-5"
                  />
                  <span className="font-display text-xs font-bold tracking-tight text-white">
                    Code<span className="text-accent">4</span>U
                  </span>
                </div>
              </div>

              {/* Floating accent: Web */}
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-4 -left-6 flex items-center gap-2 rounded-input border border-gray-200 bg-bg-light-card px-3 py-2 shadow-card dark:border-accent/20 dark:bg-bg-dark-card"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-primary-700 dark:text-accent">
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-text-heading dark:text-text-dark-h leading-tight">
                    Web
                  </p>
                  <p className="text-text-body dark:text-text-dark-b leading-tight">
                    Next.js · React
                  </p>
                </div>
              </motion.div>

              {/* Floating accent: Mobile */}
              <motion.div
                initial={{ opacity: 0, x: reduce ? 0 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="absolute top-1/3 -right-4 flex items-center gap-2 rounded-input border border-gray-200 bg-bg-light-card px-3 py-2 shadow-card dark:border-accent/20 dark:bg-bg-dark-card"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-primary-700 dark:text-accent">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-text-heading dark:text-text-dark-h leading-tight">
                    Mobile
                  </p>
                  <p className="text-text-body dark:text-text-dark-b leading-tight">
                    iOS · Android
                  </p>
                </div>
              </motion.div>

              {/* Floating accent: AI */}
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-input border border-gray-200 bg-bg-light-card px-3 py-2 shadow-card dark:border-accent/20 dark:bg-bg-dark-card"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-primary-700 dark:text-accent">
                  <BrainCircuit className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-text-heading dark:text-text-dark-h leading-tight">
                    AI
                  </p>
                  <p className="text-text-body dark:text-text-dark-b leading-tight">
                    Claude · RAG
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
