import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type ButtonGroupRootProps = ComponentPropsWithRef<"div"> & {
  orientation?: "horizontal" | "vertical";
};

const orientationClasses = {
  horizontal:
    "[&>[data-slot]:not(:last-child)]:rounded-e-none [&>[data-slot]:not(:first-child)]:rounded-s-none [&>[data-slot]+[data-slot]:not([data-slot=button-group-separator])]:border-s-0",
  vertical:
    "flex-col [&>[data-slot]:not(:last-child)]:rounded-b-none [&>[data-slot]:not(:first-child)]:rounded-t-none [&>[data-slot]+[data-slot]:not([data-slot=button-group-separator])]:border-t-0",
};

function ButtonGroupRoot({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupRootProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: This groups related actions and optional content, not form fields.
    <div
      {...props}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "flex w-fit min-w-0 items-stretch *:focus-visible:relative *:focus-visible:z-10 *:has-[:focus-visible]:relative *:has-[:focus-visible]:z-10 [&>input]:flex-1",
        orientationClasses[orientation],
        className,
      )}
    />
  );
}

export { ButtonGroupRoot as Root };
