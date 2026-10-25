"use client";

import { Combobox as BaseSelect } from "@base-ui/react/combobox";
import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type SelectRootProps<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
> = Omit<BaseSelect.Root.Props<Value, Multiple, Item>, "modal">;
export type SelectLabelProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Label>,
  "className"
> & { className?: string };
export type SelectTriggerProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Trigger>,
  "className"
> & { className?: string };
export type SelectValueProps = BaseSelect.Value.Props;
export type SelectIconProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Icon>,
  "className"
> & { className?: string };
export type SelectInputProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Input>,
  "className"
> & { className?: string };
export type SelectInputGroupProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.InputGroup>,
  "className"
> & { className?: string };
export type SelectClearProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Clear>,
  "className"
> & { className?: string };
export type SelectPortalProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Portal>,
  "className"
> & { className?: string };
export type SelectPositionerProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Positioner>,
  "className"
> & { className?: string };
export type SelectContentProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Popup>,
  "className"
> & { className?: string };
export type SelectListProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.List>,
  "className"
> & { className?: string };
export type SelectItemProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Item>,
  "className"
> & { className?: string };
export type SelectItemIndicatorProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.ItemIndicator>,
  "className"
> & { className?: string };
export type SelectGroupProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Group>,
  "className"
> & { className?: string };
export type SelectGroupLabelProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.GroupLabel>,
  "className"
> & { className?: string };
export type SelectSeparatorProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Separator>,
  "className"
> & { className?: string };
export type SelectCollectionProps = BaseSelect.Collection.Props;
export type SelectEmptyProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Empty>,
  "className"
> & { className?: string };
export type SelectChipsProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Chips>,
  "className"
> & { className?: string };
export type SelectChipProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.Chip>,
  "className"
> & { className?: string };
export type SelectChipRemoveProps = Omit<
  ComponentPropsWithRef<typeof BaseSelect.ChipRemove>,
  "className"
> & { className?: string };

function SelectRoot<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
>(props: SelectRootProps<Value, Multiple, Item>) {
  return <BaseSelect.Root {...props} modal={false} />;
}

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <BaseSelect.Label
      {...props}
      data-slot="select-label"
      className={className}
    />
  );
}

function SelectTrigger({ className, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      {...props}
      data-slot="select-trigger"
      className={cn(
        "flex min-w-0 items-center justify-between select-none disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-current [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
    />
  );
}

function SelectValue(props: SelectValueProps) {
  return <BaseSelect.Value {...props} />;
}

function SelectIcon({ className, children, ...props }: SelectIconProps) {
  return (
    <BaseSelect.Icon
      {...props}
      data-slot="select-icon"
      className={cn(
        "pointer-events-none inline-flex shrink-0 items-center justify-center",
        className,
      )}
    >
      {children ?? null}
    </BaseSelect.Icon>
  );
}

function SelectInput({ className, ...props }: SelectInputProps) {
  return (
    <BaseSelect.Input
      {...props}
      data-slot="select-input"
      className={cn("w-full min-w-0", className)}
    />
  );
}

function SelectInputGroup({ className, ...props }: SelectInputGroupProps) {
  return (
    <BaseSelect.InputGroup
      {...props}
      data-slot="select-input-group"
      className={cn(
        "relative flex w-full min-w-0 items-center focus-within:outline-2 focus-within:outline-current **:data-[slot=select-input]:outline-none",
        className,
      )}
    />
  );
}

function SelectClear({ className, children, ...props }: SelectClearProps) {
  return (
    <BaseSelect.Clear
      {...props}
      data-slot="select-clear"
      className={cn(
        "inline-flex shrink-0 items-center justify-center select-none focus-visible:outline-2 focus-visible:outline-current",
        className,
      )}
    >
      {children ?? null}
    </BaseSelect.Clear>
  );
}

function SelectPortal({ className, ...props }: SelectPortalProps) {
  return (
    <BaseSelect.Portal
      {...props}
      data-slot="select-portal"
      className={className}
    />
  );
}

function SelectPositioner({ className, ...props }: SelectPositionerProps) {
  return (
    <BaseSelect.Positioner
      {...props}
      data-slot="select-positioner"
      className={cn("isolate z-50", className)}
    />
  );
}

function SelectContent({ className, ...props }: SelectContentProps) {
  return (
    <BaseSelect.Popup
      {...props}
      data-slot="select-content"
      className={cn(
        "relative flex max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) flex-col overflow-hidden origin-(--transform-origin)",
        className,
      )}
    />
  );
}

function SelectList({ className, ...props }: SelectListProps) {
  return (
    <BaseSelect.List
      {...props}
      data-slot="select-list"
      className={cn(
        "relative min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain",
        className,
      )}
    />
  );
}

function SelectItem({ className, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      {...props}
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center select-none data-disabled:pointer-events-none data-highlighted:outline-2 data-highlighted:-outline-offset-2 data-highlighted:outline-current [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
    />
  );
}

function SelectItemIndicator({
  className,
  children,
  ...props
}: SelectItemIndicatorProps) {
  return (
    <BaseSelect.ItemIndicator
      {...props}
      data-slot="select-item-indicator"
      className={cn(
        "pointer-events-none inline-flex shrink-0 items-center justify-center not-data-selected:not-data-ending-style:invisible",
        className,
      )}
    >
      {children ?? null}
    </BaseSelect.ItemIndicator>
  );
}

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <BaseSelect.Group
      {...props}
      data-slot="select-group"
      className={className}
    />
  );
}

function SelectGroupLabel({ className, ...props }: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      {...props}
      data-slot="select-group-label"
      className={className}
    />
  );
}

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <BaseSelect.Separator
      {...props}
      data-slot="select-separator"
      className={cn("pointer-events-none shrink-0", className)}
    />
  );
}

function SelectCollection(props: SelectCollectionProps) {
  return <BaseSelect.Collection {...props} />;
}

function SelectEmpty({ className, ...props }: SelectEmptyProps) {
  return (
    <BaseSelect.Empty
      {...props}
      data-slot="select-empty"
      className={cn("shrink-0", className)}
    />
  );
}

function SelectChips({ className, ...props }: SelectChipsProps) {
  return (
    <BaseSelect.Chips
      {...props}
      data-slot="select-chips"
      className={cn("flex min-w-0 flex-1 flex-wrap items-center", className)}
    />
  );
}

function SelectChip({ className, ...props }: SelectChipProps) {
  return (
    <BaseSelect.Chip
      {...props}
      data-slot="select-chip"
      className={cn(
        "inline-flex min-w-0 items-center focus-visible:outline-2 focus-visible:outline-current",
        className,
      )}
    />
  );
}

function SelectChipRemove({
  className,
  children,
  ...props
}: SelectChipRemoveProps) {
  return (
    <BaseSelect.ChipRemove
      {...props}
      data-slot="select-chip-remove"
      className={cn(
        "inline-flex shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-current",
        className,
      )}
    >
      {children ?? null}
    </BaseSelect.ChipRemove>
  );
}

export {
  SelectRoot as Root,
  SelectLabel as Label,
  SelectTrigger as Trigger,
  SelectValue as Value,
  SelectIcon as Icon,
  SelectInput as Input,
  SelectInputGroup as InputGroup,
  SelectClear as Clear,
  SelectPortal as Portal,
  SelectPositioner as Positioner,
  SelectContent as Content,
  SelectList as List,
  SelectItem as Item,
  SelectItemIndicator as ItemIndicator,
  SelectGroup as Group,
  SelectGroupLabel as GroupLabel,
  SelectSeparator as Separator,
  SelectCollection as Collection,
  SelectEmpty as Empty,
  SelectChips as Chips,
  SelectChip as Chip,
  SelectChipRemove as ChipRemove,
};
