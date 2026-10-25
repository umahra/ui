"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "../cn";

export type BreadcrumbLinkProps = useRender.ComponentProps<"a">;

export function Link({ className, render, ...props }: BreadcrumbLinkProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">({ className: cn(className) }, props),
    render,
    state: { slot: "breadcrumb-link" },
  });
}
