"use client";

import { useDirection } from "@base-ui/react/direction-provider";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  type ComponentPropsWithRef,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Root as ButtonRoot,
  type ButtonRootProps,
} from "../button/button.parts";
import { cn } from "../cn";

export type CarouselApi = UseEmblaCarouselType[1];
export type CarouselOptions = NonNullable<
  Parameters<typeof useEmblaCarousel>[0]
>;
export type CarouselPlugins = NonNullable<
  Parameters<typeof useEmblaCarousel>[1]
>;
export type CarouselRootProps = ComponentPropsWithRef<"div"> & {
  opts?: CarouselOptions;
  plugins?: CarouselPlugins;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};
export type CarouselViewportProps = ComponentPropsWithRef<"div">;
export type CarouselContentProps = ComponentPropsWithRef<"div">;
export type CarouselItemProps = ComponentPropsWithRef<"div">;
export type CarouselPreviousProps = ButtonRootProps;
export type CarouselNextProps = ButtonRootProps;

type CarouselContextValue = {
  carouselRef: UseEmblaCarouselType[0];
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};
const CarouselContext = createContext<CarouselContextValue | null>(null);
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context)
    throw new Error("Carousel parts require CarouselPrimitive.Root.");
  return context;
}

function CarouselRoot({
  orientation = "horizontal",
  opts,
  plugins,
  setApi,
  dir,
  className,
  children,
  onKeyDown,
  tabIndex = 0,
  ...props
}: CarouselRootProps) {
  const inheritedDirection = useDirection();
  const direction =
    dir === "rtl" || dir === "ltr"
      ? dir
      : (opts?.direction ?? inheritedDirection);
  const { [reducedMotionQuery]: reducedOptions, ...breakpoints } =
    opts?.breakpoints ?? {};
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      direction,
      breakpoints: {
        ...breakpoints,
        [reducedMotionQuery]: {
          ...reducedOptions,
          duration: 0,
        },
      },
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const onSelect = useCallback((instance: NonNullable<CarouselApi>) => {
    setCanScrollPrev(instance.canScrollPrev());
    setCanScrollNext(instance.canScrollNext());
  }, []);
  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    if (!api) return;
    setApi?.(api);
    return () => setApi?.(undefined);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      {/* biome-ignore lint/a11y/useSemanticElements: Keep the upstream div and caller-overridable carousel region/group role. */}
      <div
        role="region"
        aria-roledescription="carousel"
        {...props}
        dir={direction}
        data-slot="carousel"
        data-orientation={orientation}
        tabIndex={tabIndex}
        className={cn("relative min-w-0", className)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            event.defaultPrevented ||
            event.target !== event.currentTarget ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey
          )
            return;
          const previousKey =
            orientation === "vertical"
              ? "ArrowUp"
              : direction === "rtl"
                ? "ArrowRight"
                : "ArrowLeft";
          const nextKey =
            orientation === "vertical"
              ? "ArrowDown"
              : direction === "rtl"
                ? "ArrowLeft"
                : "ArrowRight";
          if (event.key === previousKey) {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === nextKey) {
            event.preventDefault();
            scrollNext();
          }
        }}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselViewport({ ref, className, ...props }: CarouselViewportProps) {
  const { carouselRef, orientation } = useCarousel();
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      carouselRef(node);
      const cleanup = typeof ref === "function" ? ref(node) : undefined;
      if (ref && typeof ref !== "function") ref.current = node;
      return () => {
        carouselRef(null);
        if (typeof cleanup === "function") cleanup();
        else if (typeof ref === "function") ref(null);
        else if (ref) ref.current = null;
      };
    },
    [carouselRef, ref],
  );
  return (
    <div
      {...props}
      ref={mergedRef}
      data-slot="carousel-viewport"
      data-orientation={orientation}
      className={cn("min-w-0 overflow-hidden", className)}
    />
  );
}

function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { orientation } = useCarousel();
  return (
    <div
      {...props}
      data-slot="carousel-content"
      data-orientation={orientation}
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "touch-pan-y touch-pinch-zoom"
          : "h-full flex-col touch-pan-x touch-pinch-zoom",
        className,
      )}
    />
  );
}

function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();
  return (
    // biome-ignore lint/a11y/useSemanticElements: ARIA slide groups are not native fieldsets of form controls.
    <div
      role="group"
      aria-roledescription="slide"
      {...props}
      data-slot="carousel-item"
      data-orientation={orientation}
      className={cn("min-h-0 min-w-0 shrink-0 grow-0 basis-full", className)}
    />
  );
}

function CarouselPrevious({
  disabled,
  onClick,
  className,
  ...props
}: CarouselPreviousProps) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <ButtonRoot
      aria-label="Previous slide"
      {...props}
      data-slot="carousel-previous"
      disabled={disabled || !canScrollPrev}
      className={cn("touch-manipulation", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) scrollPrev();
      }}
    />
  );
}

function CarouselNext({
  disabled,
  onClick,
  className,
  ...props
}: CarouselNextProps) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <ButtonRoot
      aria-label="Next slide"
      {...props}
      data-slot="carousel-next"
      disabled={disabled || !canScrollNext}
      className={cn("touch-manipulation", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) scrollNext();
      }}
    />
  );
}

export {
  CarouselRoot as Root,
  CarouselViewport as Viewport,
  CarouselContent as Content,
  CarouselItem as Item,
  CarouselPrevious as Previous,
  CarouselNext as Next,
};
