import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type BreadcrumbRootProps = ComponentPropsWithRef<"nav">;
export type BreadcrumbListProps = ComponentPropsWithRef<"ol">;
export type BreadcrumbItemProps = ComponentPropsWithRef<"li">;
export type BreadcrumbPageProps = ComponentPropsWithRef<"span">;
export type BreadcrumbSeparatorProps = ComponentPropsWithRef<"li">;
export type BreadcrumbEllipsisProps = ComponentPropsWithRef<"span">;

function BreadcrumbRoot({ className, ...props }: BreadcrumbRootProps) {
  return (
    <nav
      aria-label="breadcrumb"
      {...props}
      data-slot="breadcrumb"
      className={className}
    />
  );
}

function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      {...props}
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center wrap-anywhere", className)}
    />
  );
}

function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <li
      {...props}
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center", className)}
    />
  );
}

function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    // biome-ignore lint/a11y/useFocusableInteractive lint/a11y/useSemanticElements: The current page preserves upstream disabled link semantics outside the tab order.
    <span
      {...props}
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={className}
    />
  );
}

function BreadcrumbSeparator({
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      {...props}
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={className}
    />
  );
}

function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      {...props}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center justify-center", className)}
    />
  );
}

export {
  BreadcrumbRoot as Root,
  BreadcrumbList as List,
  BreadcrumbItem as Item,
  BreadcrumbPage as Page,
  BreadcrumbSeparator as Separator,
  BreadcrumbEllipsis as Ellipsis,
};
