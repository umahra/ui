"use client";

import type { ComponentPropsWithRef } from "react";

import {
  Root as ButtonRoot,
  type ButtonRootProps,
} from "../button/button.parts";
import { cn } from "../cn";
import { TextareaPrimitive, type TextareaProps } from "../textarea";
import { InputPrimitive, type InputProps } from "./input";

export type InputGroupRootProps = ComponentPropsWithRef<"div">;
export type InputGroupAddonProps = ComponentPropsWithRef<"div"> & {
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
};
export type InputGroupButtonProps = ButtonRootProps;
export type InputGroupTextProps = ComponentPropsWithRef<"span">;
export type InputGroupInputProps = InputProps;
export type InputGroupTextareaProps = TextareaProps;

function InputGroupRoot({ className, ...props }: InputGroupRootProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: This wraps one composite control, not a fieldset of separate fields.
    <div
      {...props}
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex w-full min-w-0 items-center has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:flex-col has-[[data-slot=input-group-control]:focus-visible]:outline-2",
        className,
      )}
    />
  );
}

const addonAlignClasses = {
  "inline-start": "order-first",
  "inline-end": "order-last",
  "block-start": "order-first w-full justify-start",
  "block-end": "order-last w-full justify-start",
};

function InputGroupAddon({
  className,
  align = "inline-start",
  onClick,
  ...props
}: InputGroupAddonProps) {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Pointer clicks focus the keyboard-accessible control; the addon is not another control.
    <div
      role="presentation"
      {...props}
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex cursor-text select-none items-center justify-center",
        addonAlignClasses[align],
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const interactiveTarget = (event.target as Element).closest(
          "button, a, input, textarea, select, label, summary, [role=button], [tabindex], [contenteditable]:not([contenteditable=false])",
        );
        if (
          interactiveTarget &&
          event.currentTarget.contains(interactiveTarget)
        ) {
          return;
        }
        event.currentTarget.parentElement
          ?.querySelector<HTMLElement>('[data-slot="input-group-control"]')
          ?.focus();
      }}
    />
  );
}

function InputGroupButton(props: InputGroupButtonProps) {
  return <ButtonRoot {...props} />;
}

function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      {...props}
      data-slot="input-group-text"
      className={cn("flex items-center [&_svg]:pointer-events-none", className)}
    />
  );
}

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <InputPrimitive
      {...props}
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none outline-none ring-0 focus-visible:ring-0",
        className,
      )}
    />
  );
}

function InputGroupTextarea({ className, ...props }: InputGroupTextareaProps) {
  return (
    <TextareaPrimitive
      {...props}
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent shadow-none outline-none ring-0 focus-visible:ring-0",
        className,
      )}
    />
  );
}

export {
  InputGroupRoot as Root,
  InputGroupAddon as Addon,
  InputGroupButton as Button,
  InputGroupText as Text,
  InputGroupInput as Input,
  InputGroupTextarea as Textarea,
};
