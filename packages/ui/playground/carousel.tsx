import { cn } from "cn";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { ButtonPrimitive as Button } from "../src/button";
import {
  CarouselPrimitive as Carousel,
  type CarouselApi,
  type CarouselItemProps,
} from "../src/carousel";
import { Heading } from "../src/heading";
import { InputPrimitive } from "../src/input";
import { LabelPrimitive as Label } from "../src/label";

const buttonClasses =
  "rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:opacity-40";

interface ConsumerSlideProps extends CarouselItemProps {
  featured?: boolean;
}

function ConsumerSlide({ featured, className, ...props }: ConsumerSlideProps) {
  return (
    <Carousel.Item
      {...props}
      className={cn(
        "flex min-h-36 items-center justify-center rounded-lg border border-border bg-muted p-4 text-center",
        featured && "bg-primary text-primary-foreground",
        className,
      )}
    />
  );
}

function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="example min-w-0">
      <p className="example-label">{title}</p>
      <div className="example-body">{children}</div>
    </div>
  );
}

function Position({ api }: { api: CarouselApi }) {
  const [position, setPosition] = useState("Waiting for viewport");
  useEffect(() => {
    if (!api) return;
    const update = () =>
      setPosition(
        api.scrollSnapList().length
          ? `Snap ${api.selectedScrollSnap() + 1} of ${api.scrollSnapList().length}`
          : "No slides",
      );
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);
  return (
    <output className="text-sm text-muted-foreground" aria-live="polite">
      {position}
    </output>
  );
}

export function CarouselExamples({ direction }: { direction: "ltr" | "rtl" }) {
  const [api, setApi] = useState<CarouselApi>();
  const [verticalApi, setVerticalApi] = useState<CarouselApi>();
  const [count, setCount] = useState(5);
  const [loop, setLoop] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [refStatus, setRefStatus] = useState("Not inspected");
  const [submitted, setSubmitted] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const refLifecycle = useRef({ mounts: 0, cleanups: 0 });
  const viewportCallback = useCallback((node: HTMLDivElement | null) => {
    viewportRef.current = node;
    if (!node) return;
    refLifecycle.current.mounts += 1;
    return () => {
      viewportRef.current = null;
      refLifecycle.current.cleanups += 1;
    };
  }, []);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section
      id="carousel"
      aria-labelledby="carousel-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">17 / Collections</p>
          <Heading as="h2" id="carousel-title">
            Carousel
          </Heading>
        </div>
        <code>CarouselPrimitive</code>
      </div>
      <p className="section-description">
        Focus the carousel itself for arrow shortcuts. Tab reaches controls and
        slide content. Spacing, cards, dimensions, and control appearance belong
        to these wrappers.
      </p>
      <div className="examples-grid">
        <Example title="Primitive · structural defaults / optional controls">
          <Carousel.Root aria-label="Plain carousel" dir={direction}>
            <Carousel.Viewport>
              <Carousel.Content>
                {[1, 2, 3].map((slide) => (
                  <Carousel.Item key={slide} aria-label={`${slide} of 3`}>
                    Plain slide {slide}
                  </Carousel.Item>
                ))}
              </Carousel.Content>
            </Carousel.Viewport>
          </Carousel.Root>
          <p className="mt-3 text-sm text-muted-foreground">
            No navigation buttons, spacing, card styles, or icon dependencies.
          </p>
        </Example>
        <Example title="Consumer wrapper · responsive / dynamic / events / forms">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted((value) => value + 1);
            }}
          >
            {mounted && (
              <Carousel.Root
                aria-label="Project carousel"
                aria-describedby="carousel-project-hint"
                dir={direction}
                opts={{ align: "start", loop }}
                setApi={setApi}
                onKeyDown={(event) => {
                  if (cancel) event.preventDefault();
                }}
              >
                <Carousel.Viewport
                  ref={viewportCallback}
                  className="rounded-lg"
                >
                  <Carousel.Content ref={contentRef} className="gap-4">
                    {Array.from({ length: count }, (_, index) => index + 1).map(
                      (slide) => (
                        <ConsumerSlide
                          key={slide}
                          featured={slide === 1}
                          aria-label={`${slide} of ${count}`}
                          className="basis-full lg:basis-[calc((100%-1rem)/2)]"
                        >
                          <div>
                            <p className="font-medium">Project {slide}</p>
                            <Label className="mt-3 block text-sm">
                              Project {slide} note
                              <InputPrimitive
                                className="mt-1 w-full rounded border border-input bg-background p-2 text-foreground"
                                defaultValue={`Draft ${slide}`}
                              />
                            </Label>
                          </div>
                        </ConsumerSlide>
                      ),
                    )}
                  </Carousel.Content>
                </Carousel.Viewport>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Carousel.Previous
                    className={buttonClasses}
                    onClick={(event) => {
                      if (cancel) event.preventDefault();
                    }}
                  >
                    Previous
                  </Carousel.Previous>
                  <Carousel.Next
                    ref={nextRef}
                    disabled={disableNext}
                    loading={loading}
                    onClick={(event) => {
                      if (cancel) event.preventDefault();
                    }}
                    style={(state) => ({
                      cursor: state.disabled ? "not-allowed" : "pointer",
                    })}
                    className={buttonClasses}
                  >
                    Next
                  </Carousel.Next>
                  <Position api={api} />
                </div>
              </Carousel.Root>
            )}
            <p
              id="carousel-project-hint"
              className="mt-3 text-sm text-muted-foreground"
            >
              Notes keep their arrow keys. Tab into an offscreen note to reveal
              its slide.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={loop}
                  onChange={(event) => setLoop(event.target.checked)}
                />
                Loop
              </Label>
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={cancel}
                  onChange={(event) => setCancel(event.target.checked)}
                />
                Cancel navigation
              </Label>
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disableNext}
                  onChange={(event) => setDisableNext(event.target.checked)}
                />
                Disable Next
              </Label>
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={loading}
                  onChange={(event) => setLoading(event.target.checked)}
                />
                Loading Next
              </Label>
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={mounted}
                  onChange={(event) => setMounted(event.target.checked)}
                />
                Mount carousel
              </Label>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button.Root
                className={buttonClasses}
                onClick={() => setCount((value) => value + 1)}
              >
                Add slide
              </Button.Root>
              <Button.Root
                className={buttonClasses}
                disabled={!count}
                onClick={() => setCount((value) => Math.max(0, value - 1))}
              >
                Remove slide
              </Button.Root>
              <Button.Root
                className={buttonClasses}
                disabled={!api}
                onClick={() => api?.scrollTo(0)}
              >
                First via API
              </Button.Root>
              <Button.Root
                className={buttonClasses}
                onClick={() =>
                  setRefStatus(
                    [
                      viewportRef.current?.dataset.slot,
                      contentRef.current?.dataset.slot,
                      nextRef.current?.dataset.slot,
                    ].join(" / ") +
                      `; callback mounts ${refLifecycle.current.mounts}, cleanups ${refLifecycle.current.cleanups}`,
                  )
                }
              >
                Inspect refs
              </Button.Root>
              <Button.Root type="submit" className={buttonClasses}>
                Submit example
              </Button.Root>
            </div>
            <p className="mt-3 text-sm" aria-live="polite">
              Refs: {refStatus}. Submissions: {submitted}.
            </p>
          </form>
        </Example>
        <Example title="Vertical · explicit viewport height / custom render">
          <Carousel.Root
            aria-label="Vertical carousel"
            orientation="vertical"
            dir={direction}
            setApi={setVerticalApi}
          >
            <Carousel.Viewport className="h-48 rounded-lg">
              <Carousel.Content className="gap-3">
                {[1, 2, 3].map((slide) => (
                  <ConsumerSlide key={slide} aria-label={`${slide} of 3`}>
                    Vertical slide {slide}
                  </ConsumerSlide>
                ))}
              </Carousel.Content>
            </Carousel.Viewport>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Carousel.Previous
                aria-label="Previous vertical slide"
                className={buttonClasses}
              >
                Up
              </Carousel.Previous>
              <Carousel.Next
                aria-label="Next vertical slide"
                render={<div />}
                nativeButton={false}
                className={buttonClasses}
              >
                Down
              </Carousel.Next>
              <Position api={verticalApi} />
            </div>
          </Carousel.Root>
        </Example>
        <Example title="RTL · direction option / consumer widths">
          <Carousel.Root
            aria-label="RTL carousel"
            opts={{ direction: "rtl", align: "start" }}
          >
            <Carousel.Viewport>
              <Carousel.Content className="gap-3">
                {[1, 2, 3, 4].map((slide) => (
                  <ConsumerSlide
                    key={slide}
                    aria-label={`${slide} of 4`}
                    className="basis-2/3"
                  >
                    RTL slide {slide}
                  </ConsumerSlide>
                ))}
              </Carousel.Content>
            </Carousel.Viewport>
            <div className="mt-3 flex gap-2">
              <Carousel.Previous
                aria-label="Previous RTL slide"
                className={buttonClasses}
              >
                Previous
              </Carousel.Previous>
              <Carousel.Next
                aria-label="Next RTL slide"
                className={buttonClasses}
              >
                Next
              </Carousel.Next>
            </div>
          </Carousel.Root>
        </Example>
      </div>
    </section>
  );
}
