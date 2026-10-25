import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

const headingVariants = cva("", {
  variants: {
    as: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
    },
  },
});

export type HeadingProps = ComponentPropsWithRef<"h2"> & {
  as: NonNullable<VariantProps<typeof headingVariants>["as"]>;
};

export function Heading({ as: Component, className, ...props }: HeadingProps) {
  return (
    <Component
      {...props}
      data-slot="heading"
      className={cn(headingVariants({ as: Component }), className)}
    />
  );
}
