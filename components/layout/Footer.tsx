import Link from "next/link";
import Image from "next/image";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/content/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/70 dark:border-accent/10 bg-bg-light dark:bg-bg-dark">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/logo-icon.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="font-display font-bold text-xl tracking-tight text-text-heading dark:text-text-dark-h">
                Code<span className="text-accent">4</span>U
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-body dark:text-text-dark-b">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-text-body dark:text-text-dark-b">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>
                {siteConfig.company.hq} — {siteConfig.company.serviceArea}
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-text-heading dark:text-text-dark-h mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href="/services"
                    className="text-sm text-text-body dark:text-text-dark-b hover:text-primary-700 dark:hover:text-accent transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-text-heading dark:text-text-dark-h mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.nav
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-text-body dark:text-text-dark-b hover:text-primary-700 dark:hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-text-heading dark:text-text-dark-h mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="inline-flex items-center gap-2 text-sm text-text-body dark:text-text-dark-b hover:text-primary-700 dark:hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.author.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-body dark:text-text-dark-b hover:text-primary-700 dark:hover:text-accent transition-colors"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-body dark:text-text-dark-b hover:text-primary-700 dark:hover:text-accent transition-colors"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200/70 dark:border-accent/10 pt-6 text-center text-xs text-text-body dark:text-text-dark-b">
          <p>© {year} All rights reserved. Made by Code4U.</p>
        </div>
      </div>
    </footer>
  );
}
