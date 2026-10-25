"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { type ComponentPropsWithRef, createContext, useContext } from "react";

import { cn } from "../cn";

export type DialogRootProps<Payload = unknown> = BaseDialog.Root.Props<Payload>;
export type DialogTriggerProps<Payload = unknown> = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Trigger<Payload>>,
  "className"
> & { className?: string };
export type DialogPortalProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Portal>,
  "className"
> & { className?: string };
export type DialogOverlayProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Backdrop>,
  "className"
> & { className?: string };
export type DialogViewportProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Viewport>,
  "className"
> & { className?: string };
export type DialogContentProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Popup>,
  "className"
> & { className?: string };
export type DialogHeaderProps = ComponentPropsWithRef<"div">;
export type DialogFooterProps = ComponentPropsWithRef<"div">;
export type DialogTitleProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Title>,
  "className"
> & { className?: string };
export type DialogDescriptionProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Description>,
  "className"
> & { className?: string };
export type DialogCloseProps = Omit<
  ComponentPropsWithRef<typeof BaseDialog.Close>,
  "className"
> & { className?: string };

const DialogModalContext = createContext<DialogRootProps["modal"]>(true);

function DialogRoot<Payload>({
  modal = true,
  ...props
}: DialogRootProps<Payload>) {
  return (
    <DialogModalContext value={modal}>
      <BaseDialog.Root {...props} modal={modal} />
    </DialogModalContext>
  );
}

function DialogTrigger<Payload>(props: DialogTriggerProps<Payload>) {
  return <BaseDialog.Trigger {...props} data-slot="dialog-trigger" />;
}

function DialogPortal(props: DialogPortalProps) {
  return <BaseDialog.Portal {...props} data-slot="dialog-portal" />;
}

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <BaseDialog.Backdrop
      {...props}
      data-slot="dialog-overlay"
      className={cn(
        "pointer-events-none fixed inset-0 isolate z-50",
        className,
      )}
    />
  );
}

function DialogViewport({ className, ...props }: DialogViewportProps) {
  // Modal viewports receive wheel events; nonmodal ones leave outside controls reachable.
  const modal = useContext(DialogModalContext);
  return (
    <BaseDialog.Viewport
      {...props}
      data-slot="dialog-viewport"
      className={cn(
        "fixed inset-0 z-50 flex items-center-safe justify-center overflow-y-auto overscroll-contain",
        modal === true ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
    />
  );
}

function DialogContent({ className, ...props }: DialogContentProps) {
  const modal = useContext(DialogModalContext);
  return (
    <BaseDialog.Popup
      {...props}
      data-slot="dialog-content"
      className={cn(
        "pointer-events-auto relative w-full min-w-0 shrink-0",
        modal !== true && "max-h-full overflow-y-auto",
        className,
      )}
    />
  );
}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      {...props}
      data-slot="dialog-header"
      className={cn("flex flex-col", className)}
    />
  );
}

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      {...props}
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end",
        className,
      )}
    />
  );
}

function DialogTitle(props: DialogTitleProps) {
  return <BaseDialog.Title {...props} data-slot="dialog-title" />;
}

function DialogDescription(props: DialogDescriptionProps) {
  return <BaseDialog.Description {...props} data-slot="dialog-description" />;
}

function DialogClose(props: DialogCloseProps) {
  return <BaseDialog.Close {...props} data-slot="dialog-close" />;
}

export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogViewport as Viewport,
  DialogContent as Content,
  DialogHeader as Header,
  DialogFooter as Footer,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogClose as Close,
};
