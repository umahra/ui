"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type InputProps = Omit<
  ComponentPropsWithRef<typeof BaseInput>,
  "className"
> & {
  className?: string;
};

export function InputPrimitive({ className, ...props }: InputProps) {
  return (
    <BaseInput
      data-slot="input"
      {...props}
      className={cn("w-full min-w-0", className)}
    />
  );
}
