/**
 * Conditionally join classNames, filtering out falsy values.
 * Lightweight alternative to clsx — keeps bundle small.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
