"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type SheetRootProps<Payload = unknown> = BaseDialog.Root.Props<Payload>;
export type SheetTriggerProps<Payload = unknown> = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Trigger<Payload>>,
  "className"
> & { className?: string };
export type SheetPortalProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Portal>,
  "className"
> & { className?: string };
export type SheetOverlayProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Backdrop>,
  "className"
> & { className?: string };
export type SheetContentProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Popup>,
  "className"
> & {
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
};
export type SheetHeaderProps = ComponentPropsWithRef<"div">;
export type SheetFooterProps = ComponentPropsWithRef<"div">;
export type SheetTitleProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Title>,
  "className"
> & { className?: string };
export type SheetDescriptionProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Description>,
  "className"
> & { className?: string };
export type SheetCloseProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Close>,
  "className"
> & { className?: string };

const sideClasses = {
  top: "inset-x-0 top-0 h-auto",
  right: "inset-y-0 right-0 h-dvh",
  bottom: "inset-x-0 bottom-0 h-auto",
  left: "inset-y-0 left-0 h-dvh",
};

function SheetRoot<Payload>(props: SheetRootProps<Payload>) {
  return <BaseDialog.Root {...props} />;
}

function SheetTrigger<Payload>(props: SheetTriggerProps<Payload>) {
  return <BaseDialog.Trigger {...props} data-slot="sheet-trigger" />;
}

function SheetPortal(props: SheetPortalProps) {
  return <BaseDialog.Portal {...props} data-slot="sheet-portal" />;
}

function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <BaseDialog.Backdrop
      {...props}
      data-slot="sheet-overlay"
      className={cn(
        "pointer-events-none fixed inset-0 isolate z-50",
        className,
      )}
    />
  );
}

function SheetContent({
  className,
  side = "right",
  ...props
}: SheetContentProps) {
  return (
    <BaseDialog.Popup
      {...props}
      data-slot="sheet-content"
      data-side={side}
      className={cn(
        "pointer-events-auto fixed z-50 flex max-h-dvh min-w-0 max-w-full flex-col overflow-y-auto overscroll-contain",
        sideClasses[side],
        className,
      )}
    />
  );
}

function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      {...props}
      data-slot="sheet-header"
      className={cn("flex shrink-0 flex-col", className)}
    />
  );
}

function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      {...props}
      data-slot="sheet-footer"
      className={cn("flex shrink-0 flex-col", className)}
    />
  );
}

function SheetTitle(props: SheetTitleProps) {
  return <BaseDialog.Title {...props} data-slot="sheet-title" />;
}

function SheetDescription(props: SheetDescriptionProps) {
  return <BaseDialog.Description {...props} data-slot="sheet-description" />;
}

function SheetClose(props: SheetCloseProps) {
  return <BaseDialog.Close {...props} data-slot="sheet-close" />;
}

export {
  SheetRoot as Root,
  SheetTrigger as Trigger,
  SheetPortal as Portal,
  SheetOverlay as Overlay,
  SheetContent as Content,
  SheetHeader as Header,
  SheetFooter as Footer,
  SheetTitle as Title,
  SheetDescription as Description,
  SheetClose as Close,
};
