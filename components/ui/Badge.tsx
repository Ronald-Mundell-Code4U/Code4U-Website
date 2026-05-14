import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "solid" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variantClass = {
    default:
      "bg-primary-50 text-primary-800 dark:bg-accent/10 dark:text-accent border border-primary-100 dark:border-accent/20",
    solid: "bg-primary-700 text-white",
    outline:
      "bg-transparent border border-primary-700/30 text-primary-800 dark:border-accent/40 dark:text-accent",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide whitespace-nowrap",
        variantClass,
        className,
      )}
    >
      {children}
    </span>
  );
}
