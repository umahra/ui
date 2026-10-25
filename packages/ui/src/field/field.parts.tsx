import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";
import { LabelPrimitive, type LabelProps } from "../label";

export type FieldRootProps = ComponentPropsWithRef<"div"> & {
  orientation?: "vertical" | "horizontal" | "responsive";
};
export type FieldSetProps = ComponentPropsWithRef<"fieldset">;
export type FieldLegendProps = ComponentPropsWithRef<"legend">;
export type FieldGroupProps = ComponentPropsWithRef<"div">;
export type FieldContentProps = ComponentPropsWithRef<"div">;
export type FieldLabelProps = LabelProps;
export type FieldTitleProps = ComponentPropsWithRef<"div">;
export type FieldDescriptionProps = ComponentPropsWithRef<"p">;
export type FieldSeparatorProps = ComponentPropsWithRef<"div">;
export type FieldErrorProps = ComponentPropsWithRef<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
};

const orientationClasses = {
  vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
  horizontal:
    "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto",
  responsive:
    "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto",
};

function FieldRoot({
  className,
  orientation = "vertical",
  ...props
}: FieldRootProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: This groups one field's parts; Set supplies fieldset semantics for multiple controls.
    <div
      {...props}
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(
        "group/field flex w-full min-w-0",
        orientationClasses[orientation],
        className,
      )}
    />
  );
}

function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset
      {...props}
      data-slot="field-set"
      className={cn("flex min-w-0 flex-col", className)}
    />
  );
}

function FieldLegend({ className, ...props }: FieldLegendProps) {
  return <legend {...props} data-slot="field-legend" className={className} />;
}

function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      {...props}
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full min-w-0 flex-col",
        className,
      )}
    />
  );
}

function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      {...props}
      data-slot="field-content"
      className={cn(
        "group/field-content flex min-w-0 flex-1 flex-col",
        className,
      )}
    />
  );
}

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <LabelPrimitive
      {...props}
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label w-fit has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className,
      )}
    />
  );
}

function FieldTitle({ className, ...props }: FieldTitleProps) {
  return (
    <div
      {...props}
      data-slot="field-label"
      className={cn("flex w-fit items-center", className)}
    />
  );
}

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return <p {...props} data-slot="field-description" className={className} />;
}

function FieldSeparator({
  className,
  children,
  ...props
}: FieldSeparatorProps) {
  return (
    <div
      {...props}
      data-slot="field-separator"
      data-content={!!children}
      className={cn("relative flex w-full justify-center", className)}
    >
      <BaseSeparator
        data-slot="separator"
        className="absolute inset-x-0 top-1/2 w-full"
      />
      {children && (
        <span
          data-slot="field-separator-content"
          className="relative block w-fit"
        >
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: FieldErrorProps) {
  let content = children;
  if (!content) {
    const messages = [
      ...new Set(
        errors?.flatMap((error) => (error?.message ? [error.message] : [])) ??
          [],
      ),
    ];
    content =
      messages.length === 1 ? (
        messages[0]
      ) : messages.length > 1 ? (
        <ul className="flex flex-col">
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      ) : null;
  }
  if (!content) return null;
  return (
    <div {...props} role="alert" data-slot="field-error" className={className}>
      {content}
    </div>
  );
}

export {
  FieldRoot as Root,
  FieldSet as Set,
  FieldLegend as Legend,
  FieldGroup as Group,
  FieldContent as Content,
  FieldLabel as Label,
  FieldTitle as Title,
  FieldDescription as Description,
  FieldSeparator as Separator,
  FieldError as Error,
};
