import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactElement } from "react";

import { cn } from "./cn.js";

// Styles adapted from shadcn/ui (MIT); see LICENSE.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40 dark:bg-destructive/60 dark:hover:bg-destructive/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 px-3",
        default: "h-9 px-4",
        lg: "h-10 px-6",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonStyleProps = {
  variant?: NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
  size?: NonNullable<VariantProps<typeof buttonVariants>["size"]>;
};

export type ButtonProps = ButtonStyleProps &
  (
    | (ComponentPropsWithRef<"button"> & { asChild?: false })
    | (Omit<ComponentPropsWithRef<typeof Slot>, "children"> & {
        asChild: true;
        children: ReactElement;
      })
  );

export function Button(props: ButtonProps) {
  const { variant = "default", size = "default", className } = props;
  const sharedProps = {
    "data-slot": "button",
    "data-variant": variant,
    "data-size": size,
    className: cn(buttonVariants({ variant, size }), className),
  };

  if (props.asChild) {
    const {
      asChild: _asChild,
      variant: _variant,
      size: _size,
      className: _className,
      ...slotProps
    } = props;
    return <Slot {...slotProps} {...sharedProps} />;
  }

  const {
    asChild: _asChild,
    variant: _variant,
    size: _size,
    className: _className,
    type = "button",
    ...buttonProps
  } = props;
  return <button {...buttonProps} {...sharedProps} type={type} />;
}
