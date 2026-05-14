import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark opacity-80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 grid-backdrop opacity-50"
        aria-hidden="true"
      />
      <div className="container-page text-center">
        <p className="font-display text-7xl md:text-9xl font-extrabold text-gradient-green leading-none tracking-tight">
          404
        </p>
        <h1 className="mt-6 text-3xl md:text-4xl font-bold text-text-heading dark:text-text-dark-h">
          Page not found.
        </h1>
        <p className="mt-4 max-w-md mx-auto text-base text-text-body dark:text-text-dark-b">
          The page you&apos;re looking for has moved, been renamed, or never
          existed. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="md" withArrow>
            Back to home
          </Button>
          <Button href="/contact" size="md" variant="outline">
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
