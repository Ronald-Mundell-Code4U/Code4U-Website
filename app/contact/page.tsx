import type { Metadata } from "next";
import { Mail, MapPin, Linkedin, Clock, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Code4U for website development, mobile app projects, or consulting. We respond to most inquiries within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark opacity-70"
          aria-hidden="true"
        />
        <div className="container-page text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Ready to get started?
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Don&apos;t hesitate to{" "}
            <span className="text-gradient-green">contact us.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-text-body dark:text-text-dark-b">
            Tell us a bit about what you&apos;re building and what you need
            help with. We read every message and reply within 24 hours.
          </p>
        </div>
      </section>

      {/* Info + form */}
      <section className="pb-24 md:pb-32">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Info pane */}
            <aside className="lg:col-span-5">
              <div className="space-y-7">
                <ContactInfoItem
                  icon={Mail}
                  label="Email"
                  value={siteConfig.author.email}
                  href={`mailto:${siteConfig.author.email}`}
                />
                <ContactInfoItem
                  icon={Linkedin}
                  label="LinkedIn"
                  value="Ronald Mundell"
                  href={siteConfig.author.linkedin}
                  external
                />
                <ContactInfoItem
                  icon={MapPin}
                  label="Location"
                  value={`${siteConfig.company.hq} — ${siteConfig.company.serviceArea}`}
                />
                <ContactInfoItem
                  icon={Clock}
                  label="Response time"
                  value="Within 24 hours"
                />
              </div>

              <div className="mt-10 rounded-card border border-accent/20 bg-accent/5 p-6">
                <h2 className="font-display text-lg font-bold text-text-heading dark:text-text-dark-h">
                  Who we work with
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-text-body dark:text-text-dark-b">
                  <li className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      →
                    </span>
                    Founders and small businesses building new websites
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      →
                    </span>
                    Teams ready to launch a mobile app on iOS or Android
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      →
                    </span>
                    Businesses looking for ongoing maintenance or consulting
                  </li>
                </ul>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-card border border-gray-200/70 bg-bg-light-card p-7 md:p-10 shadow-card dark:border-accent/15 dark:bg-bg-dark-card">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface ContactInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function ContactInfoItem({
  icon: Icon,
  label,
  value,
  href,
  external,
}: ContactInfoItemProps) {
  const content = (
    <>
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-input bg-accent/15 text-primary-700 dark:text-accent">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-body/70 dark:text-text-dark-b/70">
          {label}
        </p>
        <p className="mt-1 text-base font-medium text-text-heading dark:text-text-dark-h">
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex items-center gap-4 transition-colors hover:opacity-80"
      >
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-4">{content}</div>;
}
