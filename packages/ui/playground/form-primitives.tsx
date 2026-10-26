import { useRef, useState } from "react";
import { ButtonPrimitive as Button } from "../src/button";
import { InputPrimitive } from "../src/input";
import { LabelPrimitive } from "../src/label";
import { Text } from "../src/text";
import { TextareaPrimitive } from "../src/textarea";
import type { DesignSystemComponent } from "../src/visualiser";

const controlClasses =
  "rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";
const buttonClasses =
  "rounded border border-input px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";

export function useLabelExamples(): DesignSystemComponent {
  const [checked, setChecked] = useState(false);

  return {
    id: "label",
    name: "Label",
    description: "Text identifying a form control.",
    importCode: 'import { LabelPrimitive } from "@umahra/ui/label";',
    examples: [
      {
        title: "Primitive · explicit association",
        usage:
          '<LabelPrimitive htmlFor="name">Display name</LabelPrimitive>\n<InputPrimitive id="name" />',
        preview: (
          <div className="project-preview space-y-3">
            <LabelPrimitive htmlFor="label-name">Display name</LabelPrimitive>
            <InputPrimitive
              id="label-name"
              placeholder="Click the label to focus"
            />
          </div>
        ),
      },
      {
        title: "Consumer wrapper · wrapping label",
        usage:
          '<LabelPrimitive className="gap-2 text-sm">\n  <input type="checkbox" checked={checked} onChange={onChange} />\n  Send me updates\n</LabelPrimitive>',
        preview: (
          <div className="project-preview space-y-3">
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
        ),
      },
    ],
  };
}

export function useTextareaExamples(): DesignSystemComponent {
  const initialValue = "A shared textarea primitive.";
  const [value, setValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [result, setResult] = useState("No submission yet.");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return {
    id: "textarea",
    name: "Textarea",
    description: "A text field for longer, multi-line content.",
    importCode: 'import { TextareaPrimitive } from "@umahra/ui/textarea";',
    examples: [
      {
        title: "Primitive · native focus and resizing",
        usage:
          '<LabelPrimitive htmlFor="notes">Plain notes</LabelPrimitive>\n<TextareaPrimitive id="notes" rows={3} defaultValue="Notes" />',
        preview: (
          <div className="project-preview space-y-3">
            <LabelPrimitive htmlFor="plain-textarea">
              Plain notes
            </LabelPrimitive>
            <TextareaPrimitive
              id="plain-textarea"
              rows={3}
              defaultValue="Unstyled textarea"
            />
          </div>
        ),
      },
      {
        title: "Consumer wrapper · state, form and ref",
        usage:
          '<form onSubmit={onSubmit} onReset={onReset}>\n  <LabelPrimitive htmlFor="notes">Feedback</LabelPrimitive>\n  <TextareaPrimitive id="notes" name="notes" ref={textareaRef}\n    value={value} onChange={onChange} required\n    disabled={disabled} readOnly={readOnly} aria-invalid={invalid} />\n  <Button.Root type="submit">Submit</Button.Root>\n  <Button.Root type="reset">Reset</Button.Root>\n</form>',
        preview: (
          <form
            className="project-preview space-y-3"
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
        ),
      },
    ],
  };
}
