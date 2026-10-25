import type { ComponentPropsWithRef } from "react";

import { cn } from "../cn";

export type TextProps =
  | (ComponentPropsWithRef<"p"> & { as?: "p" })
  | (ComponentPropsWithRef<"span"> & { as: "span" });

export function Text(props: TextProps) {
  const className = cn("text-body", props.className);

  if (props.as === "span") {
    const { as: _as, ...spanProps } = props;
    return <span {...spanProps} data-slot="text" className={className} />;
  }

  const { as: _as, ...paragraphProps } = props;
  return <p {...paragraphProps} data-slot="text" className={className} />;
}
