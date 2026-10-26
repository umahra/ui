import { type RefObject, useEffect, useState } from "react";

export function useEffectiveDirection(scope?: RefObject<HTMLElement | null>) {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  useEffect(() => {
    const element = scope?.current ?? document.body;
    const read = () =>
      setDirection(
        getComputedStyle(element).direction === "rtl" ? "rtl" : "ltr",
      );
    const observer = new MutationObserver(read);
    for (
      let parent: HTMLElement | null = element;
      parent;
      parent = parent.parentElement
    ) {
      observer.observe(parent, {
        attributes: true,
        attributeFilter: ["dir", "style", "class"],
      });
    }
    read();
    return () => observer.disconnect();
  }, [scope]);
  return direction;
}
