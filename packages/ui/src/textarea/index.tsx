import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type TextareaProps = ComponentPropsWithRef<"textarea">;

export function TextareaPrimitive({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      {...props}
      className={cn("flex field-sizing-content w-full min-w-0", className)}
    />
  );
}
