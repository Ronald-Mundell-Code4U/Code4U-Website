"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "code4u_cookie_consent";

type Choice = "accepted" | "declined" | null;

export function CookieBanner() {
  const [choice, setChoice] = useState<Choice>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") {
        setChoice(stored);
      }
    } catch {
      // Ignore — localStorage may be disabled
    }
  }, []);

  const save = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore
    }
    setChoice(value);
  };

  if (!mounted || choice !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-40 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
    >
      <div className="relative rounded-card border border-gray-200 bg-bg-light-card p-5 shadow-card dark:border-accent/20 dark:bg-bg-dark-card">
        <button
          type="button"
          onClick={() => save("declined")}
          aria-label="Dismiss"
          className="absolute top-3 right-3 text-text-body hover:text-text-heading dark:text-text-dark-b dark:hover:text-text-dark-h transition-colors"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <h2 className="font-display text-base font-semibold text-text-heading dark:text-text-dark-h">
          We use cookies
        </h2>
        <p className="mt-1.5 text-sm text-text-body dark:text-text-dark-b leading-relaxed pr-4">
          This site uses analytics cookies to understand how visitors interact
          with the site. You can decline without affecting functionality.
        </p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={() => save("accepted")}>
            Accept
          </Button>
          <Button size="sm" variant="outline" onClick={() => save("declined")}>
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
