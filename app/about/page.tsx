import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Target, Sparkles, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Code4U was founded to help businesses navigate the ever-evolving era of technology. Our mission: make technology easy and accessible for every business.",
  alternates: { canonical: "/about" },
};

const journey = [
  {
    year: "2018",
    title: "The idea",
    body: "Over a long dinner about the future, we found ourselves talking about an app and a website and realised what we wanted to do: help turn other people's ideas and dreams into reality.",
  },
  {
    year: "2019",
    title: "Learning the craft",
    body: "We didn't know everything yet — but we knew exactly what we needed to learn. So we spent the next few years building, breaking, shipping, and getting ready.",
  },
  {
    year: "2023",
    title: "Code4U launches",
    body: "Through and out of the pandemic, while businesses paused and pivoted, we started Code4U. Multiple projects underway, steadily growing, reaching out to help.",
  },
  {
    year: "Future",
    title: "The next five years",
    body: "We're expanding our team and our reach with a single goal: helping as many people as possible realise their dreams through technology.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark opacity-80"
          aria-hidden="true"
        />
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                About Us
              </p>
              <h1 className="mt-3 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
                <span className="text-gradient-green">Code4U</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl leading-relaxed text-text-body dark:text-text-dark-b">
                Helping businesses find their footing — and then their stride
                — in the ever-evolving era of technology.
              </p>
            </div>
            <div className="lg:col-span-6">
              <SmartImage
                src="/images/about-hero.jpg"
                alt="The Code4U team collaborating"
                iconName="users"
                fallbackLabel="Team collaboration"
                className="aspect-[4/3] rounded-card shadow-card"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-16 md:pb-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-card border border-accent/20 bg-bg-light-card dark:bg-bg-dark-card p-10 md:p-16 text-center shadow-card">
            <div
              className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-primary-700 dark:text-accent mx-auto">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Our Mission
              </h2>
              <p className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight tracking-tight max-w-3xl mx-auto">
                {siteConfig.company.mission}
              </p>
              <div className="mt-8">
                <Button href="/contact" size="lg" withArrow>
                  Work with us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section-padding bg-primary-50/40 dark:bg-bg-dark-card border-y border-gray-200/60 dark:border-accent/10">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Journey"
            title="How we got here."
            description="A short story of where Code4U started, where we are now, and where we're heading next."
          />

          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((step, idx) => (
              <li
                key={step.year}
                className="relative flex flex-col rounded-card border border-gray-200/70 bg-bg-light-card p-7 shadow-card dark:border-accent/15 dark:bg-bg-dark"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-primary-700 dark:text-accent tabular-nums">
                    {idx + 1}
                  </span>
                  <span className="font-display text-2xl font-extrabold tracking-tight text-text-heading dark:text-text-dark-h">
                    {step.year}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-text-heading dark:text-text-dark-h">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body dark:text-text-dark-b">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-primary-700 dark:text-accent">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
              Our Location
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-text-body dark:text-text-dark-b">
              We work out of {siteConfig.company.hq}, Canada — and we help
              clients globally through strong remote practices.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-primary-50/40 dark:bg-bg-dark-card border-y border-gray-200/60 dark:border-accent/10">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Leadership"
            title="The people behind Code4U."
            align="center"
          />

          <div className="mt-14 mx-auto max-w-sm">
            <article className="rounded-card border border-gray-200/70 bg-bg-light-card p-5 shadow-card dark:border-accent/15 dark:bg-bg-dark text-center">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-primary-50 dark:bg-bg-dark-card">
                <Image
                  src="/ronald.png"
                  alt="Ronald Mundell, Founder of Code4U"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover object-[center_20%]"
                />
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
                <h3 className="text-lg font-bold text-text-heading dark:text-text-dark-h">
                  {siteConfig.author.name}
                </h3>
              </div>
              <p className="mt-1 text-sm text-text-body dark:text-text-dark-b">
                Founder
              </p>
              <a
                href={siteConfig.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-700 dark:text-accent hover:underline"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                Connect on LinkedIn
              </a>
            </article>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
