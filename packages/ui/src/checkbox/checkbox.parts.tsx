"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type CheckboxRootProps = Omit<
  ComponentPropsWithRef<typeof BaseCheckbox.Root>,
  "className"
> & { className?: string };
export type CheckboxIndicatorProps = Omit<
  ComponentPropsWithRef<typeof BaseCheckbox.Indicator>,
  "className"
> & { className?: string };

function CheckboxRoot({ className, ...props }: CheckboxRootProps) {
  return (
    <BaseCheckbox.Root
      {...props}
      data-slot="checkbox"
      className={cn(
        "peer group/checkbox relative inline-flex shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-current",
        className,
      )}
    />
  );
}

function CheckboxIndicator({ className, ...props }: CheckboxIndicatorProps) {
  return (
    <BaseCheckbox.Indicator
      {...props}
      data-slot="checkbox-indicator"
      className={cn(
        "pointer-events-none inline-flex items-center justify-center not-data-checked:not-data-indeterminate:not-data-[ending-style]:invisible",
        className,
      )}
    />
  );
}

export { CheckboxRoot as Root, CheckboxIndicator as Indicator };
