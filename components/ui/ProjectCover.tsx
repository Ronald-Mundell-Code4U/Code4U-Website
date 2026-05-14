import { Timer, Type, Home, BrainCircuit, type LucideIcon } from "lucide-react";

interface ProjectCoverProps {
  slug: string;
  title: string;
  className?: string;
}

interface CoverConfig {
  icon: LucideIcon;
  gradient: string;
  accent: string;
  pattern: "circles" | "grid" | "dots";
}

const COVERS: Record<string, CoverConfig> = {
  timeyourwod: {
    icon: Timer,
    gradient: "from-primary-700/90 via-primary-500 to-accent-bright",
    accent: "text-white",
    pattern: "circles",
  },
  letterforge: {
    icon: Type,
    gradient: "from-primary-900 via-primary-700 to-primary-500",
    accent: "text-primary-100",
    pattern: "grid",
  },
  "faiza-homes": {
    icon: Home,
    gradient: "from-primary-500 via-accent to-primary-300",
    accent: "text-primary-900",
    pattern: "dots",
  },
};

const FALLBACK: CoverConfig = {
  icon: BrainCircuit,
  gradient: "from-primary-700 via-primary-500 to-accent",
  accent: "text-white",
  pattern: "dots",
};

export function ProjectCover({ slug, title, className = "" }: ProjectCoverProps) {
  const cover = COVERS[slug] ?? FALLBACK;
  const Icon = cover.icon;

  return (
    <div
      role="img"
      aria-label={`${title} cover image`}
      className={`relative overflow-hidden rounded-card bg-gradient-to-br ${cover.gradient} ${className}`}
    >
      {/* Decorative pattern */}
      {cover.pattern === "circles" && (
        <svg
          className="absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 400 240"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="60" cy="60" r="120" stroke="white" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="80" stroke="white" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="1.5" />
          <circle cx="340" cy="180" r="100" stroke="white" strokeWidth="1.5" />
          <circle cx="340" cy="180" r="60" stroke="white" strokeWidth="1.5" />
        </svg>
      )}
      {cover.pattern === "grid" && (
        <svg
          className="absolute inset-0 h-full w-full opacity-20"
          viewBox="0 0 400 240"
          fill="none"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 36}
              y1="0"
              x2={i * 36}
              y2="240"
              stroke="white"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 36}
              x2="400"
              y2={i * 36}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>
      )}
      {cover.pattern === "dots" && (
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 400 240"
          fill="none"
          aria-hidden="true"
        >
          {Array.from({ length: 96 }).map((_, i) => {
            const x = (i % 12) * 36 + 18;
            const y = Math.floor(i / 12) * 30 + 15;
            return <circle key={i} cx={x} cy={y} r="2" fill="white" />;
          })}
        </svg>
      )}

      {/* Glow */}
      <div
        className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/30 blur-3xl"
        aria-hidden="true"
      />

      {/* Centered icon + title */}
      <div className={`relative flex h-full w-full flex-col items-center justify-center p-8 ${cover.accent}`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </div>
        <h4 className="mt-4 font-display text-xl font-extrabold tracking-tight text-center">
          {title}
        </h4>
      </div>
    </div>
  );
}
