import type { Metadata } from "next";
import { Check } from "lucide-react";
import { services } from "@/content/services";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Consulting, website development, and mobile app development from Code4U — a Vancouver-based software studio building IT solutions for growing businesses.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark opacity-70"
          aria-hidden="true"
        />
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Our Services
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-3xl">
            IT services and solutions{" "}
            <span className="text-gradient-green">for growing businesses.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-text-body dark:text-text-dark-b">
            We are experts in website and mobile application development, plus
            consulting to help you figure out the right next step. Three core
            services, one accountable partner.
          </p>
        </div>
      </section>

      {/* Service blocks */}
      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <div className="space-y-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.slug}
                  className="group relative grid gap-8 rounded-card border border-gray-200/70 bg-bg-light-card p-8 md:p-10 lg:p-12 shadow-card transition-all duration-300 hover:border-accent/40 dark:border-accent/15 dark:bg-bg-dark-card dark:hover:border-accent/50 lg:grid-cols-12"
                >
                  {/* Left: title + intro */}
                  <div className="lg:col-span-5">
                    {service.image && (
                      <SmartImage
                        src={service.image}
                        alt={`${service.title} illustration`}
                        iconName={
                          service.slug === "consulting"
                            ? "compass"
                            : service.slug === "website-development"
                              ? "code"
                              : service.slug === "mobile-development"
                                ? "smartphone"
                                : "ai"
                        }
                        fallbackLabel={service.title}
                        className="mb-6 aspect-[16/10] rounded-card"
                      />
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-input bg-accent/10 text-primary-700 dark:text-accent">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="font-display text-3xl font-bold text-gray-200 dark:text-accent/20 tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-6 text-2xl md:text-3xl font-extrabold leading-tight text-text-heading dark:text-text-dark-h">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-text-body dark:text-text-dark-b">
                      {service.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Right: offerings */}
                  <div className="lg:col-span-7 lg:border-l lg:border-gray-200/60 dark:lg:border-accent/15 lg:pl-10">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      What we offer
                    </h3>
                    <ul className="mt-5 space-y-3.5">
                      {service.offerings.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-base leading-relaxed text-text-body dark:text-text-dark-b"
                        >
                          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-primary-700 dark:text-accent">
                            <Check
                              className="h-3 w-3"
                              aria-hidden="true"
                              strokeWidth={3}
                            />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-24 md:pb-32">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-card border border-accent/20 bg-bg-light-card dark:bg-bg-dark-card p-10 md:p-14 text-center shadow-card">
            <div
              className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <SectionHeading
                title="Not sure exactly what you need?"
                description="Send us a quick message describing where you are and what you're trying to build. We'll help you find the right starting point."
                align="center"
              />
              <div className="mt-8">
                <Button href="/contact" size="lg" withArrow>
                  Start a conversation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
