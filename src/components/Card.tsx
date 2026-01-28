import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-white border-sand-200 dark:bg-sand-900 dark:border-sand-800",
        elevated:
          "bg-white border-sand-200 shadow-lg dark:bg-sand-900 dark:border-sand-800",
        outline:
          "bg-transparent border-2 border-sand-300 dark:border-sand-700",
        teal:
          "bg-teal-50 border-teal-200 dark:bg-teal-900/20 dark:border-teal-800",
        coral:
          "bg-coral-50 border-coral-200 dark:bg-coral-900/20 dark:border-coral-800",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hover: {
        true: "hover:shadow-lg hover:border-teal-400 dark:hover:border-teal-600 cursor-pointer",
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
  className = "",
}: CardProps) {
  return (
    <div className={`${cardVariants({ variant, padding, hover })} ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-4">
          {title}
        </h2>
      )}
      <div className="text-sand-600 dark:text-sand-400">{children}</div>
    </div>
  );
}

export { cardVariants };
