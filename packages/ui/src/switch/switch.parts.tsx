"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type SwitchRootProps = Omit<
  ComponentPropsWithRef<typeof BaseSwitch.Root>,
  "className"
> & {
  className?: string;
};
export type SwitchThumbProps = Omit<
  ComponentPropsWithRef<typeof BaseSwitch.Thumb>,
  "className"
> & {
  className?: string;
};

function SwitchRoot({ className, ...props }: SwitchRootProps) {
  return (
    <BaseSwitch.Root
      {...props}
      data-slot="switch"
      className={cn(
        "peer group/switch relative inline-grid shrink-0 items-center data-disabled:cursor-not-allowed",
        className,
      )}
    />
  );
}

function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  return (
    <BaseSwitch.Thumb
      {...props}
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none col-start-1 row-start-1 block justify-self-start data-checked:justify-self-end",
        className,
      )}
    />
  );
}

export { SwitchRoot as Root, SwitchThumb as Thumb };
