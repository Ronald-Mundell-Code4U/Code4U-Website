import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "section";
}

export function Card({
  children,
  className,
  interactive = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-gray-200/70 bg-bg-light-card p-6 md:p-8 shadow-card",
        "dark:border-accent/15 dark:bg-bg-dark-card",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary-700/40 dark:hover:border-accent/50",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
