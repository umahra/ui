"use client";

// Adapted from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "cn";
import { type ComponentPropsWithRef, createContext, useContext } from "react";

export type DialogRootProps<Payload = unknown> = BaseDialog.Root.Props<Payload>;
export type DialogTriggerProps<Payload = unknown> = ComponentPropsWithRef<
  typeof BaseDialog.Trigger<Payload>
>;
export type DialogPortalProps = ComponentPropsWithRef<typeof BaseDialog.Portal>;
export type DialogOverlayProps = ComponentPropsWithRef<
  typeof BaseDialog.Backdrop
>;
export type DialogViewportProps = ComponentPropsWithRef<
  typeof BaseDialog.Viewport
>;
export type DialogContentProps = ComponentPropsWithRef<typeof BaseDialog.Popup>;
export type DialogHeaderProps = ComponentPropsWithRef<"div">;
export type DialogFooterProps = ComponentPropsWithRef<"div">;
export type DialogTitleProps = ComponentPropsWithRef<typeof BaseDialog.Title>;
export type DialogDescriptionProps = ComponentPropsWithRef<
  typeof BaseDialog.Description
>;
export type DialogCloseProps = ComponentPropsWithRef<typeof BaseDialog.Close>;

const DialogModalContext = createContext<DialogRootProps["modal"]>(true);

function mergeClassName<State>(
  base: string,
  className: string | ((state: State) => string | undefined) | undefined,
) {
  return typeof className === "function"
    ? (state: State) => cn(base, className(state))
    : cn(base, className);
}

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
      className={mergeClassName(
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
      className={mergeClassName(
        cn(
          "fixed inset-0 z-50 flex overflow-y-auto overscroll-contain p-4",
          modal === true ? "pointer-events-auto" : "pointer-events-none",
        ),
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
      className={mergeClassName(
        cn(
          "pointer-events-auto relative m-auto w-full min-w-0 shrink-0",
          modal !== true && "max-h-full overflow-y-auto",
        ),
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
      className={cn("flex flex-col gap-2", className)}
    />
  );
}

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      {...props}
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
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
