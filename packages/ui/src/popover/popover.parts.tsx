"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type PopoverRootProps<Payload = unknown> =
  BasePopover.Root.Props<Payload>;
export type PopoverTriggerProps<Payload = unknown> = Omit<
  ComponentPropsWithRef<typeof BasePopover.Trigger<Payload>>,
  "className"
> & { className?: string };
export type PopoverPortalProps = Omit<
  ComponentPropsWithRef<typeof BasePopover.Portal>,
  "className"
> & { className?: string };
export type PopoverPositionerProps = Omit<
  ComponentPropsWithRef<typeof BasePopover.Positioner>,
  "className"
> & { className?: string };
export type PopoverContentProps = Omit<
  ComponentPropsWithRef<typeof BasePopover.Popup>,
  "className"
> & { className?: string };
export type PopoverHeaderProps = ComponentPropsWithRef<"div">;
export type PopoverTitleProps = Omit<
  ComponentPropsWithRef<typeof BasePopover.Title>,
  "className"
> & { className?: string };
export type PopoverDescriptionProps = Omit<
  ComponentPropsWithRef<typeof BasePopover.Description>,
  "className"
> & { className?: string };
export type PopoverCloseProps = Omit<
  ComponentPropsWithRef<typeof BasePopover.Close>,
  "className"
> & { className?: string };
export type PopoverHandle<Payload = unknown> = BasePopover.Handle<Payload>;

function PopoverRoot<Payload>(props: PopoverRootProps<Payload>) {
  return <BasePopover.Root {...props} />;
}

function PopoverTrigger<Payload>(props: PopoverTriggerProps<Payload>) {
  return <BasePopover.Trigger {...props} data-slot="popover-trigger" />;
}

function PopoverPortal(props: PopoverPortalProps) {
  return <BasePopover.Portal {...props} data-slot="popover-portal" />;
}

function PopoverPositioner({ className, ...props }: PopoverPositionerProps) {
  return (
    <BasePopover.Positioner
      {...props}
      data-slot="popover-positioner"
      className={cn("isolate z-50", className)}
    />
  );
}

function PopoverContent({ className, ...props }: PopoverContentProps) {
  return (
    <BasePopover.Popup
      {...props}
      data-slot="popover-content"
      className={cn(
        "relative flex max-h-(--available-height) max-w-(--available-width) flex-col overflow-auto overscroll-contain origin-(--transform-origin)",
        className,
      )}
    />
  );
}

function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return (
    <div
      {...props}
      data-slot="popover-header"
      className={cn("flex flex-col", className)}
    />
  );
}

function PopoverTitle(props: PopoverTitleProps) {
  return <BasePopover.Title {...props} data-slot="popover-title" />;
}

function PopoverDescription(props: PopoverDescriptionProps) {
  return <BasePopover.Description {...props} data-slot="popover-description" />;
}

function PopoverClose(props: PopoverCloseProps) {
  return <BasePopover.Close {...props} data-slot="popover-close" />;
}

function createHandle<Payload = unknown>(): PopoverHandle<Payload> {
  return BasePopover.createHandle<Payload>();
}

export {
  PopoverRoot as Root,
  PopoverTrigger as Trigger,
  PopoverPortal as Portal,
  PopoverPositioner as Positioner,
  PopoverContent as Content,
  PopoverHeader as Header,
  PopoverTitle as Title,
  PopoverDescription as Description,
  PopoverClose as Close,
  createHandle,
};
