import { useRef, useState } from "react";
import { ButtonPrimitive as Button } from "../src/button";
import { cn } from "../src/cn";
import { FieldPrimitive as Field } from "../src/field";
import { LabelPrimitive } from "../src/label";
import { SwitchPrimitive, type SwitchRootProps } from "../src/switch";
import { Text } from "../src/text";
import type { DesignSystemComponent } from "../src/visualiser";

const trackClasses =
  "h-6 w-11 rounded-full p-0.5 data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-50 aria-invalid:outline-2 aria-invalid:outline-destructive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const buttonClasses =
  "rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";

interface ConsumerSwitchProps extends SwitchRootProps {
  compact?: boolean;
}

function Switch({ compact, className, ...props }: ConsumerSwitchProps) {
  return (
    <SwitchPrimitive.Root
      {...props}
      className={cn(trackClasses, compact && "h-5 w-8", className)}
    >
      <SwitchPrimitive.Thumb
        className={cn("size-5 rounded-full bg-background", compact && "size-4")}
      />
    </SwitchPrimitive.Root>
  );
}

export function useSwitchExamples(): DesignSystemComponent {
  const [checked, setChecked] = useState(false);
  const [cancelChange, setCancelChange] = useState(false);
  const [eventInfo, setEventInfo] = useState("No change yet.");
  const [resetKey, setResetKey] = useState(0);
  const [submitted, setSubmitted] = useState("No submission yet.");
  const [refs, setRefs] = useState("Inspect the root, thumb and input refs.");
  const rootRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return {
    id: "switch",
    name: "Switch",
    description: "A control for turning a setting on or off.",
    importCode:
      'import { SwitchPrimitive, type SwitchRootProps } from "@umahra/ui/switch";',
    examples: [
      {
        title: "Primitive · structural styles only",
        usage:
          '<SwitchPrimitive.Root aria-label="Notifications" defaultChecked>\n  <SwitchPrimitive.Thumb />\n</SwitchPrimitive.Root>',
        preview: (
          <div className="space-y-4">
            <LabelPrimitive className="gap-3">
              <SwitchPrimitive.Root
                aria-label="Primitive switch"
                defaultChecked
              >
                <SwitchPrimitive.Thumb
                  render={(props, state) => (
                    <span {...props}>{state.checked ? "On" : "Off"}</span>
                  )}
                />
              </SwitchPrimitive.Root>
              Primitive switch
            </LabelPrimitive>
            <LabelPrimitive className="gap-3">
              <SwitchPrimitive.Root aria-label="Root without thumb">
                Text control
              </SwitchPrimitive.Root>
              Root without Thumb
            </LabelPrimitive>
            <Text className="text-sm text-muted-foreground">
              Tab into these controls to inspect browser focus. No default size,
              color, padding, border or outline suppression.
            </Text>
          </div>
        ),
      },
      {
        title: "Consumer wrapper · controlled state and cancellation",
        usage:
          'function Switch(props: SwitchRootProps) {\n  return <SwitchPrimitive.Root {...props}\n    className="h-6 w-11 rounded-full p-0.5 data-checked:bg-primary data-unchecked:bg-input">\n    <SwitchPrimitive.Thumb className="size-5 rounded-full bg-background" />\n  </SwitchPrimitive.Root>;\n}\n<Switch checked={checked} onCheckedChange={onCheckedChange} aria-label="Notifications" />',
        preview: (
          <div className="space-y-4">
            <Field.Root orientation="horizontal" className="gap-4">
              <Field.Content className="gap-1">
                <Field.Label htmlFor="switch-notifications">
                  Notifications
                </Field.Label>
                <Field.Description
                  id="switch-notifications-help"
                  className="text-sm text-muted-foreground"
                >
                  Receive updates when work completes.
                </Field.Description>
              </Field.Content>
              <Switch
                id="switch-notifications"
                nativeButton
                render={<button type="button" />}
                aria-describedby="switch-notifications-help"
                checked={checked}
                onCheckedChange={(next, details) => {
                  if (cancelChange) details.cancel();
                  else setChecked(next);
                  setEventInfo(
                    `${details.event.type}: ${next ? "on" : "off"}${details.isCanceled ? " (canceled)" : ""}`,
                  );
                }}
              />
            </Field.Root>
            <LabelPrimitive className="gap-2 text-sm">
              <input
                type="checkbox"
                checked={cancelChange}
                onChange={(event) => setCancelChange(event.target.checked)}
              />
              Cancel changes
            </LabelPrimitive>
            <p className="text-sm" aria-live="polite">
              {eventInfo}
            </p>
          </div>
        ),
      },
      {
        title: "Consumer states · disabled, read-only and invalid",
        usage:
          '<Switch disabled defaultChecked aria-label="Disabled" />\n<Switch readOnly defaultChecked aria-label="Read only" />\n<Switch aria-invalid aria-label="Invalid" />',
        preview: (
          <div className="space-y-4">
            <LabelPrimitive className="gap-3">
              <Switch disabled /> Disabled off
            </LabelPrimitive>
            <LabelPrimitive className="gap-3">
              <Switch disabled defaultChecked /> Disabled on
            </LabelPrimitive>
            <LabelPrimitive className="gap-3">
              <Switch readOnly defaultChecked /> Read-only
            </LabelPrimitive>
            <Field.Root data-invalid className="gap-2">
              <Field.Label className="gap-3">
                <Switch
                  required
                  aria-invalid
                  aria-describedby="switch-consent-error"
                />
                Required consent
              </Field.Label>
              <Field.Error
                id="switch-consent-error"
                className="text-sm text-destructive"
              >
                Consent is required.
              </Field.Error>
            </Field.Root>
          </div>
        ),
      },
      {
        title: "Form submission · uncontrolled state and reset",
        usage:
          '<form onSubmit={onSubmit} onReset={onReset}>\n  <Switch name="notifications" value="enabled" defaultChecked aria-label="Notifications" />\n  <Button.Root type="submit">Submit</Button.Root><Button.Root type="reset">Reset</Button.Root>\n</form>',
        preview: (
          <div className="space-y-4">
            <form
              id="switch-form"
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(
                  JSON.stringify([
                    ...new FormData(event.currentTarget).entries(),
                  ]),
                );
              }}
              onReset={() => {
                setResetKey((key) => key + 1);
                setSubmitted("Reset to defaults.");
              }}
            >
              <LabelPrimitive className="gap-3">
                <Switch
                  key={resetKey}
                  name="email"
                  value="yes"
                  uncheckedValue="no"
                  defaultChecked
                />
                Email updates
              </LabelPrimitive>
              <div className="flex flex-wrap gap-2">
                <Button.Root type="submit" className={buttonClasses}>
                  Submit switches
                </Button.Root>
                <Button.Root type="reset" className={buttonClasses}>
                  Reset switches
                </Button.Root>
              </div>
            </form>
            <LabelPrimitive className="gap-3">
              <Switch
                key={resetKey}
                form="switch-form"
                name="external"
                value="enabled"
              />
              Outside the form
            </LabelPrimitive>
            <p className="break-all text-sm" aria-live="polite">
              {submitted}
            </p>
            <Text className="text-sm text-muted-foreground">
              The consumer remounts uncontrolled switches on reset; controlled
              wrappers reset their checked state in onReset.
            </Text>
          </div>
        ),
      },
      {
        title: "Consumer dimensions · LTR and RTL",
        usage:
          '<div dir="rtl"><Switch compact aria-label="Compact notifications" /></div>',
        preview: (
          <div className="space-y-4">
            {(["ltr", "rtl"] as const).map((dir) => (
              <div
                key={dir}
                dir={dir}
                className="flex flex-wrap items-center gap-4"
              >
                <LabelPrimitive className="gap-2">
                  <Switch compact aria-label={`${dir} compact`} />
                  {dir} compact
                </LabelPrimitive>
                <LabelPrimitive className="gap-2">
                  <Switch defaultChecked aria-label={`${dir} default`} />
                  {dir} default
                </LabelPrimitive>
                <LabelPrimitive className="gap-2">
                  <SwitchPrimitive.Root
                    className={cn(trackClasses, "h-8 w-20 p-1")}
                    aria-label={`${dir} wide`}
                  >
                    <SwitchPrimitive.Thumb className="size-6 rounded-full bg-background" />
                  </SwitchPrimitive.Root>
                  {dir} wide
                </LabelPrimitive>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Composition · refs, render and style callbacks",
        usage:
          '<SwitchPrimitive.Root ref={rootRef} inputRef={inputRef}\n  render={<button aria-label="Composed switch" />}\n  style={state => ({ opacity: state.disabled ? 0.5 : 1 })}>\n  <SwitchPrimitive.Thumb ref={thumbRef} />\n</SwitchPrimitive.Root>',
        preview: (
          <div className="space-y-4">
            <LabelPrimitive className="gap-3">
              <SwitchPrimitive.Root
                ref={rootRef}
                inputRef={inputRef}
                aria-label="Composed switch"
                className={trackClasses}
                style={(state) => ({ opacity: state.checked ? 1 : 0.7 })}
                render={(props, state) => (
                  <span
                    {...props}
                    data-consumer-state={state.checked ? "on" : "off"}
                  />
                )}
              >
                <SwitchPrimitive.Thumb
                  ref={thumbRef}
                  className="size-5 rounded-full bg-background"
                />
              </SwitchPrimitive.Root>
              Composed switch
            </LabelPrimitive>
            <Button.Root
              type="button"
              className={buttonClasses}
              onClick={() => {
                setRefs(
                  `Root: ${rootRef.current?.tagName}; thumb: ${thumbRef.current?.tagName}; input: ${inputRef.current?.type}`,
                );
                rootRef.current?.focus();
              }}
            >
              Inspect switch refs
            </Button.Root>
            <p className="text-sm" aria-live="polite">
              {refs}
            </p>
          </div>
        ),
      },
    ],
  };
}
