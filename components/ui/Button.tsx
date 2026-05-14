import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-200 ease-out rounded-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-primary-700 text-white hover:bg-primary-600 hover:shadow-glow active:translate-y-px",
  outline:
    "border border-primary-700/40 text-primary-800 dark:text-text-dark-h dark:border-accent/40 hover:bg-primary-700/5 dark:hover:bg-accent/10 hover:border-primary-700 dark:hover:border-accent",
  ghost:
    "text-primary-800 dark:text-accent hover:bg-primary-700/5 dark:hover:bg-accent/10",
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-base md:text-lg",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
  disabled?: never;
}

interface ActionButtonProps extends CommonProps {
  href?: never;
  external?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
    children,
  } = props;

  const classes = cn(base, variantClass[variant], sizeClass[size], className);

  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(classes, "group")}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cn(classes, "group")}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(classes, "group")}
    >
      {inner}
    </button>
  );
}
