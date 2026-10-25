import { type RefObject, useEffect, useState } from "react";

type Measurements = Record<string, Record<string, string>>;

// Measure specimens, never documentation chrome. All refresh sources share one frame.
export function useEffectiveStyles(scope: RefObject<HTMLElement | null>) {
  const [values, setValues] = useState<Measurements>({});
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    let frame = 0;
    let disposed = false;
    const read = () => {
      const next: Measurements = {};
      for (const element of root.querySelectorAll<HTMLElement>(
        "[data-measure]",
      )) {
        const styles = getComputedStyle(element);
        const entry: Record<string, string> = {};
        for (const property of (element.dataset.properties ?? "").split(",")) {
          entry[property] =
            styles.getPropertyValue(property).trim() || "Unavailable";
        }
        const token = element.dataset.token;
        if (token) {
          const declared = styles.getPropertyValue(token).trim();
          entry.declared = declared || "Missing / unresolved";
          if (
            !declared ||
            !CSS.supports(element.dataset.tokenProperty ?? "color", declared)
          ) {
            for (const property of (element.dataset.properties ?? "").split(
              ",",
            ))
              entry[property] = "Missing / unresolved";
          }
        }
        next[element.dataset.measure ?? ""] = entry;
      }
      setValues(next);
    };
    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(read);
    };
    const attributes = new MutationObserver(refresh);
    attributes.observe(root, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["class", "style", "dir"],
    });
    for (
      let parent = root.parentElement;
      parent;
      parent = parent.parentElement
    ) {
      attributes.observe(parent, {
        attributes: true,
        attributeFilter: ["class", "style", "dir"],
      });
    }
    const head = new MutationObserver(refresh);
    head.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["href", "media", "disabled"],
    });
    const resize = new ResizeObserver(refresh);
    resize.observe(root);
    for (const specimen of root.querySelectorAll("[data-measure]"))
      resize.observe(specimen);
    window.addEventListener("resize", refresh);
    document.fonts.addEventListener("loadingdone", refresh);
    void document.fonts.ready.then(refresh);
    refresh();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      attributes.disconnect();
      head.disconnect();
      resize.disconnect();
      window.removeEventListener("resize", refresh);
      document.fonts.removeEventListener("loadingdone", refresh);
    };
  }, [scope]);
  return values;
}
