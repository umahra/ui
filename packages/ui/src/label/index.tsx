import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type LabelProps = ComponentPropsWithRef<"label">;

export function LabelPrimitive({ className, ...props }: LabelProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Consumers associate this label using htmlFor or a wrapped control through props.
    <label
      data-slot="label"
      {...props}
      className={cn(
        "flex select-none items-center group-data-[disabled=true]:pointer-events-none",
        className,
      )}
    />
  );
}
