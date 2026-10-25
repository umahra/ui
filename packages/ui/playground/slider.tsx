import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Field as BaseField } from "@base-ui/react/field";
import { type ReactNode, useRef, useState } from "react";

import { ButtonPrimitive as Button } from "../src/button";
import { cn } from "../src/cn";
import { Heading } from "../src/heading";
import { LabelPrimitive } from "../src/label";
import {
  SliderPrimitive as Slider,
  type SliderRootProps,
  type SliderThumbProps,
} from "../src/slider";
import { Text } from "../src/text";

const buttonClasses =
  "rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";
const thumbClasses =
  "size-5 rounded-full border border-input bg-background has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring";

type ConsumerSliderProps<Value extends number | readonly number[]> =
  SliderRootProps<Value> & {
    label: string;
    thumbLabels?: string[];
    compact?: boolean;
    thumbProps?: SliderThumbProps;
  };

function ConsumerSlider<Value extends number | readonly number[]>({
  label,
  thumbLabels = [label],
  compact,
  className,
  thumbProps,
  ...props
}: ConsumerSliderProps<Value>) {
  return (
    <Slider.Root
      {...props}
      className={cn("space-y-2 data-disabled:opacity-50", className)}
    >
      <div className="flex items-center justify-between gap-3 text-sm">
        <Slider.Label>{label}</Slider.Label>
        <Slider.Value className="tabular-nums" />
      </div>
      <Slider.Control className={compact ? "h-6" : "h-10"}>
        <Slider.Track
          className={cn("h-1 rounded-full bg-muted", compact && "h-0.5")}
        >
          <Slider.Indicator className="rounded-full bg-primary" />
        </Slider.Track>
        {thumbLabels.map((name, index) => (
          <Slider.Thumb
            key={name}
            index={index}
            aria-label={thumbLabels.length > 1 ? name : undefined}
            {...thumbProps}
            className={cn(
              thumbClasses,
              compact && "size-3",
              thumbProps?.className,
            )}
          />
        ))}
      </Slider.Control>
    </Slider.Root>
  );
}

function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="example">
      <p className="example-label">{title}</p>
      <div className="example-body space-y-4">{children}</div>
    </div>
  );
}

export function SliderExamples({ direction }: { direction: "ltr" | "rtl" }) {
  const [value, setValue] = useState(40);
  const [cancel, setCancel] = useState(false);
  const [change, setChange] = useState("No change yet.");
  const [commit, setCommit] = useState("No commit yet.");
  const [collision, setCollision] = useState<"push" | "swap" | "none">("push");
  const [resetKey, setResetKey] = useState(0);
  const [submitted, setSubmitted] = useState("No submission yet.");
  const [refs, setRefs] = useState(
    "Inspect root, thumb and nested input refs.",
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <DirectionProvider direction={direction}>
      <section
        id="slider"
        aria-labelledby="slider-title"
        className="component-section"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">11 / Forms</p>
            <Heading as="h2" id="slider-title">
              Slider
            </Heading>
          </div>
          <code>SliderPrimitive</code>
        </div>
        <Text className="section-description">
          Compose single, range and multiple thumbs. Consumers own dimensions,
          spacing and appearance. Try keyboard arrows, Home/End, Page Up/Down,
          dragging, RTL and the narrow canvas.
        </Text>
        <div className="examples-grid">
          <Example title="Primitive · external geometry only">
            <Slider.Root defaultValue={30}>
              <Slider.Label>Primitive level</Slider.Label>
              <Slider.Value />
              <Slider.Control style={{ height: 40 }}>
                <Slider.Track style={{ height: 1, background: "currentColor" }}>
                  <Slider.Indicator />
                </Slider.Track>
                <Slider.Thumb index={0}>◆</Slider.Thumb>
              </Slider.Control>
            </Slider.Root>
            <Text className="text-sm text-muted-foreground">
              Only this example supplies a control height, track line and text
              thumb. Tab to see the primitive's focus fallback.
            </Text>
          </Example>
          <Example title="Consumer wrapper · controlled, events and cancellation">
            <ConsumerSlider
              label="Volume"
              value={value}
              onValueChange={(next, details) => {
                if (cancel) details.cancel();
                else setValue(next);
                setChange(
                  `${details.reason}: ${next}${details.isCanceled ? " (canceled)" : ""}`,
                );
              }}
              onValueCommitted={(next, details) =>
                setCommit(`${details.reason}: ${next}`)
              }
            />
            <LabelPrimitive className="gap-2 text-sm">
              <input
                type="checkbox"
                checked={cancel}
                onChange={(event) => setCancel(event.target.checked)}
              />
              Cancel slider changes
            </LabelPrimitive>
            <p className="text-sm" aria-live="polite">
              Change: {change}
              <br />
              Commit: {commit}
            </p>
          </Example>
          <Example title="Range · distinct names, minimum distance and collisions">
            <ConsumerSlider
              key={collision}
              label="Price range"
              defaultValue={[20, 70]}
              thumbLabels={["Minimum price", "Maximum price"]}
              step={5}
              minStepsBetweenValues={2}
              thumbCollisionBehavior={collision}
              format={{
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }}
              locale="en-US"
            />
            <LabelPrimitive className="gap-2 text-sm">
              Collision behavior
              <select
                className="rounded border border-input bg-background p-1"
                value={collision}
                onChange={(event) =>
                  setCollision(event.target.value as typeof collision)
                }
              >
                <option value="push">Push</option>
                <option value="swap">Swap</option>
                <option value="none">Stop</option>
              </select>
            </LabelPrimitive>
          </Example>
          <Example title="Multiple thumbs · explicit indexes and custom value output">
            <Slider.Root defaultValue={[15, 45, 85]} className="space-y-2">
              <Slider.Label className="text-sm">Breakpoints</Slider.Label>
              <Slider.Value className="block text-sm tabular-nums">
                {(formatted) => formatted.join(" / ")}
              </Slider.Value>
              <Slider.Control className="h-10">
                <Slider.Track className="h-1 rounded bg-muted">
                  <Slider.Indicator className="bg-primary" />
                </Slider.Track>
                {[
                  "First breakpoint",
                  "Second breakpoint",
                  "Third breakpoint",
                ].map((name, index) => (
                  <Slider.Thumb
                    key={name}
                    index={index}
                    aria-label={name}
                    className={thumbClasses}
                  />
                ))}
              </Slider.Control>
            </Slider.Root>
            <ConsumerSlider
              label="Compact consumer dimensions"
              defaultValue={65}
              compact
            />
          </Example>
          <Example title="Vertical · discrete steps, scalar value and centered alignment">
            <div className="h-64">
              <Slider.Root
                orientation="vertical"
                defaultValue={50}
                step={10}
                largeStep={20}
                thumbAlignment="center"
                className="flex h-full items-center gap-6"
              >
                <div className="space-y-2 text-sm">
                  <Slider.Label>Gain</Slider.Label>
                  <Slider.Value />
                </div>
                <Slider.Control className="w-10">
                  <Slider.Track className="w-1 rounded-full bg-muted">
                    <Slider.Indicator className="bg-primary" />
                  </Slider.Track>
                  <Slider.Thumb index={0} className={thumbClasses} />
                </Slider.Control>
              </Slider.Root>
            </div>
          </Example>
          <Example title="Disabled and optional Base UI validation context">
            <ConsumerSlider label="Disabled level" defaultValue={60} disabled />
            <BaseField.Root invalid>
              <ConsumerSlider
                label="Invalid level"
                defaultValue={90}
                className="text-destructive"
                thumbProps={{
                  "aria-describedby": "slider-invalid-help",
                  className: "border-destructive",
                }}
              />
              <BaseField.Description
                id="slider-invalid-help"
                className="text-sm text-destructive"
              >
                Choose a level below 80.
              </BaseField.Description>
            </BaseField.Root>
          </Example>
          <Example title="Optional companions · no label, output or filled indicator">
            <Slider.Root defaultValue={25}>
              <Slider.Control className="h-10">
                <Slider.Track className="h-1 rounded-full bg-muted" />
                <Slider.Thumb
                  index={0}
                  aria-label="Balance without companions"
                  className={thumbClasses}
                />
              </Slider.Control>
            </Slider.Root>
            <Text className="text-sm text-muted-foreground">
              An accessible thumb name replaces the visible label.
            </Text>
          </Example>
          <Example title="Native form · refs, render/style composition and consumer reset">
            <form
              className="space-y-4"
              onReset={() => setResetKey((key) => key + 1)}
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(
                  JSON.stringify([
                    ...new FormData(event.currentTarget).entries(),
                  ]),
                );
              }}
            >
              <Slider.Root
                key={resetKey}
                name="level"
                defaultValue={35}
                ref={rootRef}
                render={<div data-consumer="slider" />}
                style={(state) => ({ opacity: state.dragging ? 0.7 : 1 })}
              >
                <Slider.Label className="text-sm">Form level</Slider.Label>
                <Slider.Value className="text-sm tabular-nums" />
                <Slider.Control className="h-10">
                  <Slider.Track className="h-1 bg-muted">
                    <Slider.Indicator className="bg-primary" />
                  </Slider.Track>
                  <Slider.Thumb
                    index={0}
                    ref={thumbRef}
                    inputRef={inputRef}
                    className={thumbClasses}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") event.preventDefault();
                    }}
                  />
                </Slider.Control>
              </Slider.Root>
              <ConsumerSlider
                key={`range-${resetKey}`}
                label="Form range"
                name="range"
                defaultValue={[10, 80]}
                thumbLabels={["Form minimum", "Form maximum"]}
              />
              <div className="flex flex-wrap gap-2">
                <Button.Root type="submit" className={buttonClasses}>
                  Submit slider form
                </Button.Root>
                <Button.Root type="reset" className={buttonClasses}>
                  Reset slider form
                </Button.Root>
                <Button.Root
                  type="button"
                  className={buttonClasses}
                  onClick={() => {
                    setRefs(
                      `${rootRef.current?.tagName} / ${thumbRef.current?.tagName} / ${inputRef.current?.tagName}[${inputRef.current?.type}]`,
                    );
                    inputRef.current?.focus();
                  }}
                >
                  Inspect slider refs
                </Button.Root>
              </div>
              <p className="break-all text-sm" aria-live="polite">
                {submitted}
              </p>
              <p className="text-sm" aria-live="polite">
                {refs}
              </p>
            </form>
          </Example>
        </div>
      </section>
    </DirectionProvider>
  );
}
