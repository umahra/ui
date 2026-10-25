"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { useRender } from "@base-ui/react/use-render";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type ButtonGroupTextProps = useRender.ComponentProps<
  "div",
  { slot: "button-group-text" }
>;
export type ButtonGroupSeparatorProps = Omit<
  ComponentPropsWithRef<typeof BaseSeparator>,
  "className"
> & { className?: string };

function ButtonGroupText({
  className,
  render,
  ...props
}: ButtonGroupTextProps) {
  return useRender({
    defaultTagName: "div",
    render,
    state: { slot: "button-group-text" },
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center [&_svg]:pointer-events-none",
          className,
        ),
      },
      props,
    ),
  });
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <BaseSeparator
      {...props}
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn("relative shrink-0 self-stretch", className)}
    />
  );
}

export { ButtonGroupText as Text, ButtonGroupSeparator as Separator };
