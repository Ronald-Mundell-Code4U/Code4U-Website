"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Detect scroll for backdrop blur effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-bg-light/80 backdrop-blur-lg border-b border-gray-200/60 dark:bg-bg-dark/80 dark:border-accent/10"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav
        className="container-page flex h-16 md:h-20 items-center justify-between"
        aria-label="Primary"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Code4U home"
        >
          <Image
            src="/logo-icon.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-8 w-8 md:h-9 md:w-9 transition-transform group-hover:rotate-12"
          />
          <span className="font-display font-bold text-lg md:text-xl tracking-tight text-text-heading dark:text-text-dark-h">
            Code<span className="text-accent">4</span>U
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative inline-flex h-10 items-center px-3 lg:px-4 text-sm font-medium transition-colors rounded-input",
                    active
                      ? "text-primary-800 dark:text-accent"
                      : "text-text-body hover:text-primary-800 dark:text-text-dark-b dark:hover:text-accent",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute left-3 right-3 lg:left-4 lg:right-4 bottom-1 h-0.5 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-accent/20 text-text-heading dark:text-text-dark-h"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={cn(
          "md:hidden fixed inset-x-0 top-16 bottom-0 bg-bg-light dark:bg-bg-dark transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        <ul className="container-page flex flex-col gap-1 py-6">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-card px-4 py-4 text-lg font-medium border transition-colors",
                    active
                      ? "border-accent/40 bg-accent/5 text-primary-800 dark:text-accent"
                      : "border-transparent text-text-heading dark:text-text-dark-h hover:bg-primary-50 dark:hover:bg-accent/5",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      active ? "bg-accent" : "bg-transparent",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
