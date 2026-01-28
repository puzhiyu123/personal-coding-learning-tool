import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-white border-sand-200 dark:bg-sand-900 dark:border-sand-800",
        elevated:
          "bg-white border-sand-200 shadow-warm-md dark:bg-sand-900 dark:border-sand-800",
        outline:
          "bg-transparent border-2 border-sand-300 dark:border-sand-700",
        muted:
          "bg-muted border-sand-200 dark:bg-sand-800 dark:border-sand-700",
        primary:
          "bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800",
        accent:
          "bg-accent-50 border-accent-200 dark:bg-accent-900/20 dark:border-accent-800",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hover: {
        true: "card-hover cursor-pointer hover:border-primary-400 dark:hover:border-primary-600",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hover: false,
    },
  }
);

interface CardProps extends VariantProps<typeof cardVariants> {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  children,
  variant,
  padding,
  hover,
  className,
}: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padding, hover }), className)}>
      {title && (
        <h2 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-4 font-display">
          {title}
        </h2>
      )}
      <div className="text-sand-600 dark:text-sand-400">{children}</div>
    </div>
  );
}

export { cardVariants };
