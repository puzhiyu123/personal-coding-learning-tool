import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles - using focus-visible for better accessibility
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
        secondary:
          "bg-sand-800 text-sand-100 hover:bg-sand-700 border border-sand-700",
        accent:
          "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700",
        outline:
          "border border-sand-300 bg-transparent hover:bg-sand-100 dark:border-sand-700 dark:hover:bg-sand-800",
        ghost:
          "hover:bg-sand-100 active:bg-sand-200 dark:hover:bg-sand-800 dark:active:bg-sand-700",
        link:
          "text-primary-600 underline-offset-4 hover:underline dark:text-primary-400",
        destructive:
          "bg-error text-white hover:bg-red-600 active:bg-red-700",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4",
        lg: "h-10 px-6",
        xl: "h-12 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export default function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
