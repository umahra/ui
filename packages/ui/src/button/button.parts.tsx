"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type ButtonRootProps = Omit<
  ComponentPropsWithRef<typeof BaseButton>,
  "className"
> & {
  className?: string;
  "data-slot"?: string;
  loading?: boolean;
};
export type ButtonContentProps = ComponentPropsWithRef<"span">;
export type ButtonLoaderProps = Omit<
  ComponentPropsWithRef<"span">,
  "aria-hidden"
>;

const rootClasses =
  "group/button relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap data-disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0";

function ButtonRoot({
  "data-slot": slot = "button-root",
  loading = false,
  disabled = false,
  focusableWhenDisabled = loading,
  className,
  ...props
}: ButtonRootProps) {
  return (
    <BaseButton
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={focusableWhenDisabled}
      aria-busy={loading || props["aria-busy"]}
      data-slot={slot}
      data-loading={loading || undefined}
      className={cn(rootClasses, className)}
    />
  );
}

function ButtonContent({ className, ...props }: ButtonContentProps) {
  return (
    <span
      {...props}
      data-slot="button-content"
      className={cn(
        "inline-flex items-center justify-center group-data-[loading=true]/button:opacity-0",
        className,
      )}
    />
  );
}

function ButtonLoader({ className, ...props }: ButtonLoaderProps) {
  return (
    <span
      {...props}
      data-slot="button-loader"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 hidden items-center justify-center group-data-[loading=true]/button:flex",
        className,
      )}
    />
  );
}

export { ButtonRoot as Root, ButtonContent as Content, ButtonLoader as Loader };
