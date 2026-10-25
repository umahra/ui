import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Field as BaseField } from "@base-ui/react/field";
import { type ReactNode, useRef, useState } from "react";

import { ButtonPrimitive as Button } from "../src/button";
import { cn } from "../src/cn";
import { FieldPrimitive as Field } from "../src/field";
import { Heading } from "../src/heading";
import { LabelPrimitive as Label } from "../src/label";
import {
  RadioGroupPrimitive as RadioGroup,
  type RadioGroupItemProps,
} from "../src/radio";
import { Text } from "../src/text";

const radioClasses =
  "size-5 rounded-full border border-input data-checked:border-primary data-disabled:opacity-50 aria-invalid:border-destructive focus-visible:outline-ring";
const buttonClasses =
  "rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";

interface ConsumerRadioProps extends RadioGroupItemProps<string> {
  compact?: boolean;
}

function Radio({ compact, className, ...props }: ConsumerRadioProps) {
  return (
    <RadioGroup.Item
      {...props}
      className={cn(radioClasses, compact && "size-4", className)}
    >
      <RadioGroup.Indicator>
        <span
          className={cn(
            "size-2.5 rounded-full bg-primary",
            compact && "size-2",
          )}
        />
      </RadioGroup.Indicator>
    </RadioGroup.Item>
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

export function RadioGroupExamples({
  direction,
}: {
  direction: "ltr" | "rtl";
}) {
  const [value, setValue] = useState(1);
  const [cancel, setCancel] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [eventInfo, setEventInfo] = useState("No radio change yet.");
  const [submitted, setSubmitted] = useState("No radio submission yet.");
  const [resetKey, setResetKey] = useState(0);
  const [refs, setRefs] = useState(
    "Inspect group, item, indicator and native input refs.",
  );
  const groupRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLSpanElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <DirectionProvider direction={direction}>
      <section
        id="radio-group"
        aria-labelledby="radio-group-title"
        className="component-section"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">11 / Selection</p>
            <Heading as="h2" id="radio-group-title">
              Radio Group
            </Heading>
          </div>
          <code>RadioGroupPrimitive</code>
        </div>
        <Text className="section-description">
          Root coordinates selection. Compose Item with an optional Indicator.
          Consumers own spacing, sizes, graphics and appearance.
        </Text>
        <div className="examples-grid">
          <Example title="Primitive · optional and custom indicators">
            <RadioGroup.Root
              aria-label="Primitive radio choices"
              defaultValue="text"
            >
              <Label className="gap-2">
                <RadioGroup.Item value="text">Text item</RadioGroup.Item>Without
                Indicator
              </Label>
              <Label className="gap-2">
                <RadioGroup.Item value="custom">
                  <RadioGroup.Indicator keepMounted>
                    Selected
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                Custom Indicator
              </Label>
            </RadioGroup.Root>
            <Text className="text-sm text-muted-foreground">
              Tab into the group, use arrow keys and Space. The retained
              indicator is invisible while unchecked.
            </Text>
          </Example>
          <Example title="Consumer wrapper · typed values, state and cancellation">
            <Field.Set className="gap-3" data-invalid={invalid || undefined}>
              <Field.Legend id="radio-number-label">Priority</Field.Legend>
              <Field.Description
                id="radio-number-help"
                className="text-sm text-muted-foreground"
              >
                Numeric values, with the second option unavailable.
              </Field.Description>
              <RadioGroup.Root
                ref={groupRef}
                aria-labelledby="radio-number-label"
                aria-describedby={
                  invalid
                    ? "radio-number-help radio-number-error"
                    : "radio-number-help"
                }
                disabled={disabled}
                readOnly={readOnly}
                value={value}
                className="gap-3"
                onValueChange={(next, details) => {
                  if (cancel) details.cancel();
                  else setValue(next);
                  setEventInfo(
                    `${details.event.type}: ${next}${details.isCanceled ? " (canceled)" : ""}`,
                  );
                }}
              >
                {[1, 2, 3].map((number) => (
                  <Label key={number} className="gap-3">
                    <RadioGroup.Item
                      value={number}
                      disabled={number === 2}
                      aria-invalid={invalid || undefined}
                      ref={number === 1 ? itemRef : undefined}
                      inputRef={number === 1 ? inputRef : undefined}
                      className={radioClasses}
                      style={(state) => ({ opacity: state.disabled ? 0.4 : 1 })}
                      render={(props, state) => (
                        <span
                          {...props}
                          data-consumer-state={
                            state.checked ? "selected" : "idle"
                          }
                        />
                      )}
                    >
                      <RadioGroup.Indicator
                        keepMounted
                        ref={number === 1 ? indicatorRef : undefined}
                        className="size-2.5 rounded-full bg-primary"
                      />
                    </RadioGroup.Item>
                    Priority {number}
                    {number === 2 ? " (unavailable)" : ""}
                  </Label>
                ))}
              </RadioGroup.Root>
              {invalid && (
                <Field.Error
                  id="radio-number-error"
                  className="text-sm text-destructive"
                >
                  Choose an available priority.
                </Field.Error>
              )}
            </Field.Set>
            <div className="flex flex-wrap gap-3 text-sm">
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={cancel}
                  onChange={(event) => setCancel(event.target.checked)}
                />
                Cancel radio changes
              </Label>
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(event) => setDisabled(event.target.checked)}
                />
                Disable radio group
              </Label>
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={readOnly}
                  onChange={(event) => setReadOnly(event.target.checked)}
                />
                Read-only radio group
              </Label>
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={invalid}
                  onChange={(event) => setInvalid(event.target.checked)}
                />
                Invalid radio group
              </Label>
            </div>
            <p className="text-sm" aria-live="polite">
              Priority: {value}. {eventInfo}
            </p>
            <Button.Root
              className={buttonClasses}
              onClick={() => {
                setRefs(
                  `Group: ${groupRef.current?.tagName}; item: ${itemRef.current?.tagName}; indicator: ${indicatorRef.current?.tagName}; input: ${inputRef.current?.type}`,
                );
                itemRef.current?.focus();
              }}
            >
              Inspect radio refs
            </Button.Root>
            <p className="text-sm" aria-live="polite">
              {refs}
            </p>
          </Example>
          <Example title="Choice cards · wrapping labels and descriptions">
            <Field.Set className="gap-3">
              <Field.Legend id="radio-plan-label">Subscription</Field.Legend>
              <RadioGroup.Root
                aria-labelledby="radio-plan-label"
                defaultValue="starter"
                className="gap-3"
              >
                {(["starter", "pro"] as const).map((plan) => (
                  <Field.Label
                    key={plan}
                    className="rounded-lg border border-border p-4 has-[[data-checked]]:border-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring"
                  >
                    <Field.Root orientation="horizontal" className="gap-3">
                      <Radio
                        value={plan}
                        aria-describedby={`radio-${plan}-help`}
                      />
                      <Field.Content className="gap-1">
                        <Field.Title>
                          {plan === "starter" ? "Starter" : "Pro"}
                        </Field.Title>
                        <Field.Description
                          id={`radio-${plan}-help`}
                          className="text-sm text-muted-foreground"
                        >
                          {plan === "starter"
                            ? "For personal projects."
                            : "For growing teams."}
                        </Field.Description>
                      </Field.Content>
                    </Field.Root>
                  </Field.Label>
                ))}
              </RadioGroup.Root>
            </Field.Set>
          </Example>
          <Example title="Native forms · required, submit and consumer reset">
            <form
              id="radio-example-form"
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
                setSubmitted("Radio form reset to defaults.");
              }}
            >
              <RadioGroup.Root
                key={`billing-${resetKey}`}
                name="billing"
                defaultValue="monthly"
                aria-label="Billing frequency"
                className="flex flex-wrap gap-4"
              >
                <Label className="gap-2">
                  <Radio compact value="monthly" />
                  Monthly
                </Label>
                <Label className="gap-2">
                  <Radio compact value="yearly" />
                  Yearly
                </Label>
              </RadioGroup.Root>
              <Field.Set className="gap-3">
                <Field.Legend id="radio-delivery-label">
                  Delivery (required)
                </Field.Legend>
                <RadioGroup.Root
                  key={`delivery-${resetKey}`}
                  name="delivery"
                  required
                  aria-labelledby="radio-delivery-label"
                  className="gap-3"
                >
                  <div className="flex items-center gap-2">
                    <Radio
                      value="email"
                      id="radio-email"
                      nativeButton
                      render={<button type="button" />}
                    />
                    <Label htmlFor="radio-email">Email delivery</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      value="post"
                      id="radio-post"
                      nativeButton
                      render={<button type="button" />}
                    />
                    <Label htmlFor="radio-post">Postal delivery</Label>
                  </div>
                </RadioGroup.Root>
              </Field.Set>
              <div className="flex flex-wrap gap-2">
                <Button.Root type="submit" className={buttonClasses}>
                  Submit radios
                </Button.Root>
                <Button.Root type="reset" className={buttonClasses}>
                  Reset radios
                </Button.Root>
              </div>
            </form>
            <RadioGroup.Root
              key={`external-${resetKey}`}
              name="receipt"
              form="radio-example-form"
              defaultValue="yes"
              aria-label="External receipt choice"
              className="gap-2"
            >
              <Label className="gap-2">
                <Radio value="yes" />
                Receipt
              </Label>
              <Label className="gap-2">
                <Radio value="no" />
                No receipt
              </Label>
            </RadioGroup.Root>
            <p className="break-all text-sm" aria-live="polite">
              {submitted}
            </p>
          </Example>
          <Example title="Base UI Field · optional validation context">
            <BaseField.Root invalid name="contact" className="grid gap-3">
              <BaseField.Label>Contact preference</BaseField.Label>
              <BaseField.Description>
                Field supplies names, descriptions and invalid state.
              </BaseField.Description>
              <RadioGroup.Root defaultValue="chat" className="gap-3">
                <BaseField.Item>
                  <BaseField.Label className="flex items-center gap-2">
                    <Radio value="chat" />
                    Chat
                  </BaseField.Label>
                </BaseField.Item>
                <BaseField.Item>
                  <BaseField.Label className="flex items-center gap-2">
                    <Radio value="phone" />
                    Phone
                  </BaseField.Label>
                </BaseField.Item>
              </RadioGroup.Root>
              <BaseField.Error match className="text-sm text-destructive">
                Confirm your contact preference.
              </BaseField.Error>
            </BaseField.Root>
          </Example>
        </div>
      </section>
    </DirectionProvider>
  );
}
