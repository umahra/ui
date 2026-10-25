"use client";

import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentPropsWithRef, Ref } from "react";

import { cn } from "../cn";

export type SliderRootProps<
  Value extends number | readonly number[] = number | readonly number[],
> = Omit<BaseSlider.Root.Props<Value>, "className"> & {
  className?: string;
  ref?: Ref<HTMLDivElement>;
};
export type SliderControlProps = Omit<
  ComponentPropsWithRef<typeof BaseSlider.Control>,
  "className"
> & { className?: string };
export type SliderTrackProps = Omit<
  ComponentPropsWithRef<typeof BaseSlider.Track>,
  "className"
> & { className?: string };
export type SliderIndicatorProps = Omit<
  ComponentPropsWithRef<typeof BaseSlider.Indicator>,
  "className"
> & { className?: string };
export type SliderThumbProps = Omit<
  ComponentPropsWithRef<typeof BaseSlider.Thumb>,
  "className"
> & { className?: string };
export type SliderLabelProps = Omit<
  ComponentPropsWithRef<typeof BaseSlider.Label>,
  "className"
> & { className?: string };
export type SliderValueProps = Omit<
  ComponentPropsWithRef<typeof BaseSlider.Value>,
  "className"
> & { className?: string };

function SliderRoot<Value extends number | readonly number[]>({
  className,
  thumbAlignment = "edge",
  ...props
}: SliderRootProps<Value>) {
  return (
    <BaseSlider.Root
      {...props}
      thumbAlignment={thumbAlignment}
      data-slot="slider"
      className={cn(
        "min-w-0 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
        className,
      )}
    />
  );
}

function SliderControl({ className, ...props }: SliderControlProps) {
  return (
    <BaseSlider.Control
      {...props}
      data-slot="slider-control"
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col",
        className,
      )}
    />
  );
}

function SliderTrack({ className, ...props }: SliderTrackProps) {
  return (
    <BaseSlider.Track
      {...props}
      data-slot="slider-track"
      className={cn("relative grow select-none overflow-hidden", className)}
    />
  );
}

function SliderIndicator({ className, ...props }: SliderIndicatorProps) {
  return (
    <BaseSlider.Indicator
      {...props}
      data-slot="slider-indicator"
      className={cn(
        "select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        className,
      )}
    />
  );
}

function SliderThumb({ className, ...props }: SliderThumbProps) {
  return (
    <BaseSlider.Thumb
      {...props}
      data-slot="slider-thumb"
      className={cn(
        "block shrink-0 select-none has-[:focus-visible]:outline-2",
        className,
      )}
    />
  );
}

function SliderLabel({ className, ...props }: SliderLabelProps) {
  return (
    <BaseSlider.Label
      {...props}
      data-slot="slider-label"
      className={cn(className)}
    />
  );
}

function SliderValue({ className, ...props }: SliderValueProps) {
  return (
    <BaseSlider.Value
      {...props}
      data-slot="slider-value"
      className={cn(className)}
    />
  );
}

export {
  SliderRoot as Root,
  SliderControl as Control,
  SliderTrack as Track,
  SliderIndicator as Indicator,
  SliderThumb as Thumb,
  SliderLabel as Label,
  SliderValue as Value,
};
