"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type AccordionRootProps<Value = string> = Omit<
  BaseAccordion.Root.Props<Value>,
  "className"
> & { className?: string };
export type AccordionItemProps = Omit<
  ComponentPropsWithRef<typeof BaseAccordion.Item>,
  "className"
> & { className?: string };
export type AccordionHeaderProps = Omit<
  ComponentPropsWithRef<typeof BaseAccordion.Header>,
  "className"
> & { className?: string };
export type AccordionTriggerProps = Omit<
  ComponentPropsWithRef<typeof BaseAccordion.Trigger>,
  "className"
> & { className?: string };
export type AccordionContentProps = Omit<
  ComponentPropsWithRef<typeof BaseAccordion.Panel>,
  "className"
> & { className?: string };

function AccordionRoot<Value>({
  className,
  ...props
}: AccordionRootProps<Value>) {
  return (
    <BaseAccordion.Root
      {...props}
      data-slot="accordion"
      className={cn("flex w-full min-w-0 flex-col", className)}
    />
  );
}

function AccordionItem(props: AccordionItemProps) {
  return <BaseAccordion.Item {...props} data-slot="accordion-item" />;
}

function AccordionHeader({ className, ...props }: AccordionHeaderProps) {
  return (
    <BaseAccordion.Header
      {...props}
      data-slot="accordion-header"
      className={cn("flex", className)}
    />
  );
}

function AccordionTrigger({ className, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger
      {...props}
      data-slot="accordion-trigger"
      className={cn(
        "relative flex min-w-0 flex-1 items-start justify-between text-start focus-visible:outline-2 focus-visible:outline-current",
        className,
      )}
    />
  );
}

function AccordionContent({ className, ...props }: AccordionContentProps) {
  return (
    <BaseAccordion.Panel
      {...props}
      data-slot="accordion-content"
      className={cn("overflow-hidden", className)}
    />
  );
}

export {
  AccordionRoot as Root,
  AccordionItem as Item,
  AccordionHeader as Header,
  AccordionTrigger as Trigger,
  AccordionContent as Content,
};
