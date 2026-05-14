"use client";

import { techStack } from "@/content/tech-stack";

// Split into two visually balanced rows
const half = Math.ceil(techStack.length / 2);
const row1 = techStack.slice(0, half);
const row2 = techStack.slice(half);

interface RowProps {
  items: string[];
  reverse?: boolean;
}

function MarqueeRow({ items, reverse = false }: RowProps) {
  // Duplicate items so the CSS transform creates a seamless loop
  const loop = [...items, ...items];

  return (
    <div
      className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]"
      role="presentation"
    >
      <ul
        className={`flex shrink-0 items-center gap-3 pr-3 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
        aria-hidden="true"
      >
        {loop.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 bg-bg-light-card px-5 py-2.5 text-sm font-medium text-text-heading whitespace-nowrap dark:border-accent/20 dark:bg-bg-dark-card dark:text-text-dark-h"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="py-16 md:py-20 bg-bg-light dark:bg-bg-dark border-y border-gray-200/60 dark:border-accent/10">
      <div className="container-page mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Technology Stack
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-text-heading dark:text-text-dark-h">
          The tools I work with daily.
        </h2>
      </div>

      {/* Screen reader fallback */}
      <p className="sr-only">
        Technologies and tools I use: {techStack.join(", ")}.
      </p>

      <div className="space-y-3">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
