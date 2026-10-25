"use client";

import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";

import { cn } from "../cn";

export type RadioGroupRootProps<Value = string> = Omit<
  BaseRadioGroup.Props<Value>,
  "className"
> & { className?: string };
export type RadioGroupItemProps<Value = string> = Omit<
  BaseRadio.Root.Props<Value>,
  "className"
> & { className?: string };
export type RadioGroupIndicatorProps = Omit<
  BaseRadio.Indicator.Props,
  "className"
> & { className?: string };

function RadioGroupRoot<Value>({
  className,
  ...props
}: RadioGroupRootProps<Value>) {
  return (
    <BaseRadioGroup
      {...props}
      data-slot="radio-group"
      className={cn("grid w-full", className)}
    />
  );
}

function RadioGroupItem<Value>({
  className,
  ...props
}: RadioGroupItemProps<Value>) {
  return (
    <BaseRadio.Root
      {...props}
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative inline-flex shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-current",
        className,
      )}
    />
  );
}

function RadioGroupIndicator({
  className,
  ...props
}: RadioGroupIndicatorProps) {
  return (
    <BaseRadio.Indicator
      {...props}
      data-slot="radio-group-indicator"
      className={cn(
        "pointer-events-none inline-flex items-center justify-center not-data-checked:not-data-[ending-style]:invisible",
        className,
      )}
    />
  );
}

export {
  RadioGroupRoot as Root,
  RadioGroupItem as Item,
  RadioGroupIndicator as Indicator,
};
