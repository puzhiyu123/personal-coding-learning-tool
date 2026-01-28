import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 shadow-md hover:shadow-lg",
        secondary:
          "bg-sand-800 text-sand-100 hover:bg-sand-700 focus:ring-sand-500 border border-sand-700",
        accent:
          "bg-coral-500 text-white hover:bg-coral-600 focus:ring-coral-500 shadow-md hover:shadow-lg",
        ghost:
          "bg-transparent text-sand-700 hover:bg-sand-200 dark:text-sand-300 dark:hover:bg-sand-800",
        outline:
          "bg-transparent border-2 border-teal-500 text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-6 py-3",
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
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${buttonVariants({ variant, size })} ${className}`} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
