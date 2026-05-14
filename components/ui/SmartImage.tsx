"use client";

import { useEffect, useRef, useState } from "react";
import {
  ImageOff,
  Compass,
  Code2,
  Smartphone,
  BrainCircuit,
  Users,
  type LucideIcon,
} from "lucide-react";

type IconName = "compass" | "code" | "smartphone" | "ai" | "users" | "image";

const ICONS: Record<IconName, LucideIcon> = {
  compass: Compass,
  code: Code2,
  smartphone: Smartphone,
  ai: BrainCircuit,
  users: Users,
  image: ImageOff,
};

interface SmartImageProps {
  src: string;
  alt: string;
  iconName?: IconName;
  fallbackLabel?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/**
 * Renders an image with a branded fallback when the file is missing.
 * Use this for placeholder photos that will be added to /public/ later.
 */
export function SmartImage({
  src,
  alt,
  iconName = "image",
  fallbackLabel,
  className = "",
  imgClassName = "",
  priority = false,
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const Icon = ICONS[iconName];

  // Catch race condition: image may have already 404'd before onError handler attached
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setErrored(true);
    }
  }, [src]);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-gradient-to-br from-primary-700/80 via-primary-500 to-accent-bright ${className}`}
      >
        <div
          className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          {fallbackLabel && (
            <p className="mt-3 text-sm font-semibold tracking-tight">
              {fallbackLabel}
            </p>
          )}
          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/70">
            Image placeholder
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onError={() => setErrored(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
