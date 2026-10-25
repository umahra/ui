import { useRef, useState } from "react";

import { ButtonPrimitive as Button } from "../src/button";
import { Heading } from "../src/heading";
import { InputPrimitive } from "../src/input";
import { LabelPrimitive } from "../src/label";
import { Text } from "../src/text";
import { TextareaPrimitive } from "../src/textarea";

const controlClasses =
  "rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";
const buttonClasses =
  "rounded border border-input px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";

export function LabelExamples() {
  const [checked, setChecked] = useState(false);

  return (
    <section
      id="label"
      aria-labelledby="label-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">05 / Forms</p>
          <Heading as="h2" id="label-title">
            Label
          </Heading>
        </div>
        <code>LabelPrimitive</code>
      </div>
      <Text className="section-description">
        Native labels associate with a control by htmlFor or by wrapping it.
        Input Group examples use the same primitive beside their controls.
      </Text>
      <div className="examples-grid">
        <div className="example">
          <p className="example-label">Primitive · explicit association</p>
          <div className="example-body space-y-3">
            <LabelPrimitive htmlFor="label-name">Display name</LabelPrimitive>
            <InputPrimitive
              id="label-name"
              placeholder="Click the label to focus"
            />
          </div>
        </div>
        <div className="example">
          <p className="example-label">Consumer wrapper · wrapping label</p>
          <div className="example-body space-y-3">
            <LabelPrimitive className="gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
              />
              Send me updates
            </LabelPrimitive>
            <Text className="text-sm text-muted-foreground" aria-live="polite">
              Updates {checked ? "enabled" : "disabled"}.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TextareaExamples() {
  const initialValue = "A shared textarea primitive.";
  const [value, setValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [result, setResult] = useState("No submission yet.");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section
      id="textarea"
      aria-labelledby="textarea-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">06 / Forms</p>
          <Heading as="h2" id="textarea-title">
            Textarea
          </Heading>
        </div>
        <code>TextareaPrimitive</code>
      </div>
      <Text className="section-description">
        Native textarea props, refs, and content sizing. Standalone focus stays
        visible; Input Group owns the focus indicator for its textarea.
      </Text>
      <div className="examples-grid">
        <div className="example">
          <p className="example-label">Primitive · native focus and resizing</p>
          <div className="example-body space-y-3">
            <LabelPrimitive htmlFor="plain-textarea">
              Plain notes
            </LabelPrimitive>
            <TextareaPrimitive
              id="plain-textarea"
              rows={3}
              defaultValue="Unstyled textarea"
            />
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Consumer wrapper · state, form and ref
          </p>
          <form
            className="example-body space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              setResult(
                `Submitted: ${data.get("notes") ?? "(disabled textarea omitted)"}`,
              );
            }}
            onReset={() => {
              setValue(initialValue);
              setDisabled(false);
              setReadOnly(false);
              setInvalid(false);
              setResult("Textarea form reset.");
            }}
          >
            <LabelPrimitive htmlFor="controlled-textarea" className="text-sm">
              Feedback (required)
            </LabelPrimitive>
            <TextareaPrimitive
              ref={textareaRef}
              id="controlled-textarea"
              name="notes"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              disabled={disabled}
              readOnly={readOnly}
              required
              aria-invalid={invalid || undefined}
              aria-describedby="textarea-hint"
              className={`${controlClasses} min-h-28 resize-y`}
            />
            <Text
              id="textarea-hint"
              className={`text-sm ${invalid ? "text-destructive" : "text-muted-foreground"}`}
            >
              {invalid
                ? "Please review your feedback."
                : `${value.length} characters. Resize vertically or add more lines.`}
            </Text>
            <div className="flex flex-wrap gap-4 text-sm">
              <LabelPrimitive className="gap-2">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(event) => setDisabled(event.target.checked)}
                />
                Disable textarea
              </LabelPrimitive>
              <LabelPrimitive className="gap-2">
                <input
                  type="checkbox"
                  checked={readOnly}
                  onChange={(event) => setReadOnly(event.target.checked)}
                />
                Read-only textarea
              </LabelPrimitive>
              <LabelPrimitive className="gap-2">
                <input
                  type="checkbox"
                  checked={invalid}
                  onChange={(event) => setInvalid(event.target.checked)}
                />
                Invalid textarea
              </LabelPrimitive>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button.Root type="submit" className={buttonClasses}>
                Submit textarea
              </Button.Root>
              <Button.Root type="reset" className={buttonClasses}>
                Reset textarea
              </Button.Root>
              <Button.Root
                className={buttonClasses}
                onClick={() => textareaRef.current?.focus()}
              >
                Focus textarea
              </Button.Root>
            </div>
            <Text className="text-sm text-muted-foreground" aria-live="polite">
              {result}
            </Text>
          </form>
        </div>
      </div>
    </section>
  );
}
