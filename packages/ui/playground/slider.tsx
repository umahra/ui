import { Field as BaseField } from "@base-ui/react/field";
import { useRef, useState } from "react";
import { ButtonPrimitive as Button } from "../src/button";
import { cn } from "../src/cn";
import { LabelPrimitive } from "../src/label";
import {
  SliderPrimitive as Slider,
  type SliderRootProps,
  type SliderThumbProps,
} from "../src/slider";
import { Text } from "../src/text";
import type { DesignSystemComponent } from "../src/visualiser";

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

export function useSliderExamples(): DesignSystemComponent {
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

  return {
    id: "slider",
    name: "Slider",
    description: "A control for selecting a value or range.",
    importCode:
      'import { SliderPrimitive as Slider } from "@umahra/ui/slider";',
    examples: [
      {
        title: "Primitive · external geometry only",
        usage:
          '<Slider.Root defaultValue={40} aria-label="Volume">\n  <Slider.Control className="h-6 w-full">\n    <Slider.Track className="h-1 bg-muted"><Slider.Indicator className="bg-primary" /></Slider.Track>\n    <Slider.Thumb className="size-4 rounded-full bg-primary" />\n  </Slider.Control>\n</Slider.Root>',
        preview: (
          <div className="space-y-4">
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
          </div>
        ),
      },
      {
        title: "Consumer wrapper · controlled, events and cancellation",
        usage:
          "<Slider.Root value={value} onValueChange={onValueChange} onValueCommitted={onCommit}>\n  <Slider.Label>Volume</Slider.Label><Slider.Value />\n  <Slider.Control><Slider.Track><Slider.Indicator /></Slider.Track><Slider.Thumb /></Slider.Control>\n</Slider.Root>",
        preview: (
          <div className="space-y-4">
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
          </div>
        ),
      },
      {
        title: "Range · distinct names, minimum distance and collisions",
        usage:
          '<Slider.Root defaultValue={[20, 80]} minStepsBetweenValues={10}>\n  <Slider.Control><Slider.Track><Slider.Indicator /></Slider.Track>\n    <Slider.Thumb index={0} aria-label="Minimum" />\n    <Slider.Thumb index={1} aria-label="Maximum" />\n  </Slider.Control>\n</Slider.Root>',
        preview: (
          <div className="space-y-4">
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
          </div>
        ),
      },
      {
        title: "Multiple thumbs · explicit indexes and custom value output",
        usage:
          '<Slider.Root defaultValue={[20, 50, 80]}>\n  <Slider.Value>{values => values.join(" / ")}</Slider.Value>\n  <Slider.Control><Slider.Track />\n    <Slider.Thumb index={0} aria-label="First" /><Slider.Thumb index={1} aria-label="Second" />\n    <Slider.Thumb index={2} aria-label="Third" />\n  </Slider.Control>\n</Slider.Root>',
        preview: (
          <div className="space-y-4">
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
          </div>
        ),
      },
      {
        title: "Vertical · discrete steps, scalar value and centered alignment",
        usage:
          '<Slider.Root orientation="vertical" defaultValue={30} step={10}>\n  <Slider.Label>Level</Slider.Label>\n  <Slider.Control className="h-40 w-6"><Slider.Track className="w-1" /><Slider.Thumb /></Slider.Control>\n</Slider.Root>',
        preview: (
          <div className="space-y-4">
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
          </div>
        ),
      },
      {
        title: "Disabled and optional Base UI validation context",
        usage:
          "<Field.Root>\n  <Field.Label>Disabled level</Field.Label>\n  <Slider.Root disabled defaultValue={40}>\n    <Slider.Control><Slider.Track /><Slider.Thumb /></Slider.Control>\n  </Slider.Root>\n</Field.Root>",
        preview: (
          <div className="space-y-4">
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
          </div>
        ),
      },
      {
        title: "Optional companions · no label, output or filled indicator",
        usage:
          '<Slider.Root defaultValue={40}>\n  <Slider.Control><Slider.Track /><Slider.Thumb aria-label="Level" /></Slider.Control>\n</Slider.Root>',
        preview: (
          <div className="space-y-4">
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
          </div>
        ),
      },
      {
        title:
          "Native form · refs, render/style composition and consumer reset",
        usage:
          '<form onSubmit={onSubmit} onReset={onReset}>\n  <Slider.Root name="level" defaultValue={40} ref={rootRef}>\n    <Slider.Control><Slider.Track /><Slider.Thumb inputRef={inputRef} aria-label="Level" /></Slider.Control>\n  </Slider.Root>\n  <Button.Root type="submit">Submit</Button.Root><Button.Root type="reset">Reset</Button.Root>\n</form>',
        preview: (
          <div className="space-y-4">
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
          </div>
        ),
      },
    ],
  };
}
