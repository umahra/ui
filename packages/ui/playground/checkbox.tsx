import { Field as BaseField } from "@base-ui/react/field";
import { useRef, useState } from "react";
import { ButtonPrimitive as Button } from "../src/button";
import {
  CheckboxPrimitive as CheckboxParts,
  type CheckboxRootProps,
} from "../src/checkbox";
import { cn } from "../src/cn";
import { FieldPrimitive as Field } from "../src/field";
import { LabelPrimitive as Label } from "../src/label";
import { Text } from "../src/text";
import type { DesignSystemComponent } from "../src/visualiser";

const checkboxClasses =
  "size-5 rounded border border-input data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground data-disabled:opacity-50 aria-invalid:border-destructive focus-visible:outline-ring";
const buttonClasses =
  "rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";

interface ConsumerCheckboxProps extends CheckboxRootProps {
  compact?: boolean;
}

function Checkbox({ compact, className, ...props }: ConsumerCheckboxProps) {
  return (
    <CheckboxParts.Root
      {...props}
      className={cn(checkboxClasses, compact && "size-4", className)}
    >
      <CheckboxParts.Indicator
        render={(indicatorProps, state) => (
          <span {...indicatorProps} aria-hidden="true">
            {state.indeterminate ? "−" : "✓"}
          </span>
        )}
      />
    </CheckboxParts.Root>
  );
}

export function useCheckboxExamples(): DesignSystemComponent {
  const [checked, setChecked] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [eventInfo, setEventInfo] = useState("No checkbox change yet.");
  const [tasks, setTasks] = useState([true, false]);
  const [resetKey, setResetKey] = useState(0);
  const [submitted, setSubmitted] = useState("No checkbox submission yet.");
  const [refs, setRefs] = useState("Inspect checkbox refs.");
  const rootRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const allChecked = tasks.every(Boolean);
  const mixed = tasks.some(Boolean) && !allChecked;

  return {
    id: "checkbox",
    name: "Checkbox",
    description: "Choices that can be selected independently.",
    importCode:
      'import { CheckboxPrimitive as Checkbox } from "@umahra/ui/checkbox";',
    examples: [
      {
        title: "Primitive · structural styles only",
        usage:
          '<Checkbox.Root aria-label="Accept terms"><Checkbox.Indicator>✓</Checkbox.Indicator></Checkbox.Root>',
        preview: (
          <div className="space-y-4">
            <Label className="gap-3">
              <CheckboxParts.Root defaultChecked>
                <CheckboxParts.Indicator keepMounted aria-hidden="true">
                  ✓
                </CheckboxParts.Indicator>
              </CheckboxParts.Root>
              Primitive checkbox
            </Label>
            <Label className="gap-3">
              <CheckboxParts.Root
                render={(props, state) => (
                  <span {...props}>
                    {state.checked ? "Selected" : "Choose"}
                  </span>
                )}
              />
              Root without Indicator
            </Label>
            <Text className="text-sm text-muted-foreground">
              No primitive size, border, color, spacing or bundled icon. Tab to
              inspect focus.
            </Text>
          </div>
        ),
      },
      {
        title: "Consumer wrapper · controlled state",
        usage:
          "<Checkbox.Root checked={checked} onCheckedChange={onCheckedChange}\n  className={checkboxClasses}><Checkbox.Indicator>✓</Checkbox.Indicator></Checkbox.Root>",
        preview: (
          <div className="space-y-4">
            <Label className="gap-3">
              <Checkbox
                checked={checked}
                disabled={disabled}
                readOnly={readOnly}
                aria-invalid={invalid || undefined}
                onCheckedChange={(next, details) => {
                  if (cancel) details.cancel();
                  else setChecked(next);
                  setEventInfo(
                    `Requested ${next}; canceled ${details.isCanceled}; event ${details.event.type}`,
                  );
                }}
              />
              Controlled notifications
            </Label>
            <div className="flex flex-wrap gap-4 text-sm">
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={cancel}
                  onChange={(e) => setCancel(e.target.checked)}
                />
                Cancel checkbox changes
              </Label>
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                Disable checkbox
              </Label>
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={readOnly}
                  onChange={(e) => setReadOnly(e.target.checked)}
                />
                Read-only checkbox
              </Label>
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={invalid}
                  onChange={(e) => setInvalid(e.target.checked)}
                />
                Invalid checkbox
              </Label>
            </div>
            <Text aria-live="polite" className="text-sm">
              Checked: {String(checked)}. {eventInfo}
            </Text>
            <Label className="gap-3">
              <Checkbox defaultChecked compact />
              Compact uncontrolled checkbox
            </Label>
          </div>
        ),
      },
      {
        title: "Mixed state · consumer-owned select all",
        usage:
          '<Checkbox.Root checked={allSelected} indeterminate={someSelected}\n  onCheckedChange={selectAll} aria-label="Select all" />',
        preview: (
          <div className="space-y-4">
            <Field.Set className="space-y-3">
              <Field.Legend className="text-sm font-medium">
                Tasks to include
              </Field.Legend>
              <Label className="gap-3">
                <Checkbox
                  checked={allChecked}
                  indeterminate={mixed}
                  onCheckedChange={(next) => setTasks(tasks.map(() => next))}
                />
                Select all tasks
              </Label>
              {tasks.map((selected, index) => (
                <Label
                  key={index === 0 ? "design" : "review"}
                  className="gap-3 ps-5"
                >
                  <Checkbox
                    checked={selected}
                    onCheckedChange={(next) =>
                      setTasks(
                        tasks.map((value, i) => (i === index ? next : value)),
                      )
                    }
                  />
                  {index === 0 ? "Design task" : "Review task"}
                </Label>
              ))}
            </Field.Set>
            <Text className="text-sm">
              Parent: {mixed ? "mixed" : allChecked ? "checked" : "unchecked"}.
              checked remains boolean.
            </Text>
          </div>
        ),
      },
      {
        title: "Sibling label · description and error",
        usage:
          '<Checkbox.Root id="terms" aria-describedby="terms-hint" aria-invalid={invalid} />\n<LabelPrimitive htmlFor="terms">Accept terms</LabelPrimitive>\n<Text id="terms-hint">Required to continue.</Text>',
        preview: (
          <div className="space-y-4">
            <Field.Root
              orientation="horizontal"
              data-invalid="true"
              className="gap-3"
            >
              <Checkbox
                id="checkbox-terms"
                nativeButton
                render={<button type="button" />}
                aria-invalid="true"
                aria-describedby="checkbox-terms-description checkbox-terms-error"
              />
              <Field.Content className="gap-1">
                <Field.Label htmlFor="checkbox-terms">
                  Accept checkbox terms
                </Field.Label>
                <Field.Description
                  id="checkbox-terms-description"
                  className="text-sm text-muted-foreground"
                >
                  Sibling labels target a native button root.
                </Field.Description>
                <Field.Error
                  id="checkbox-terms-error"
                  className="text-sm text-destructive"
                >
                  Please accept before continuing.
                </Field.Error>
              </Field.Content>
            </Field.Root>
          </div>
        ),
      },
      {
        title: "Native forms · required, values and reset",
        usage:
          '<form onSubmit={onSubmit} onReset={onReset}>\n  <Checkbox.Root name="terms" value="accepted" required />\n  <Button.Root type="submit">Submit</Button.Root>\n  <Button.Root type="reset">Reset</Button.Root>\n</form>',
        preview: (
          <div className="space-y-4">
            <form
              id="checkbox-form"
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
              <div key={resetKey} className="space-y-3">
                <Label className="gap-3">
                  <Checkbox name="consent" value="accepted" required />
                  Required checkbox consent
                </Label>
                <Label className="gap-3">
                  <Checkbox name="updates" value="yes" uncheckedValue="no" />
                  Checkbox updates
                </Label>
                <Label className="gap-3">
                  <Checkbox
                    name="disabled"
                    value="excluded"
                    disabled
                    defaultChecked
                  />
                  Disabled checkbox value
                </Label>
                <Label className="gap-3">
                  <Checkbox
                    name="readonly"
                    value="included"
                    readOnly
                    defaultChecked
                  />
                  Read-only checkbox value
                </Label>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button.Root type="submit" className={buttonClasses}>
                  Submit checkbox form
                </Button.Root>
                <Button.Root type="reset" className={buttonClasses}>
                  Reset checkbox form
                </Button.Root>
              </div>
            </form>
            <Label className="gap-3">
              <Checkbox
                key={resetKey}
                form="checkbox-form"
                name="external"
                defaultChecked
              />
              External checkbox form owner
            </Label>
            <Text aria-live="polite" className="break-all text-sm">
              {submitted}
            </Text>
            <Text className="text-sm text-muted-foreground">
              This consumer remounts uncontrolled checkboxes on reset.
            </Text>
          </div>
        ),
      },
      {
        title: "Custom indicator · keepMounted, refs and overrides",
        usage:
          '<Checkbox.Root ref={rootRef} inputRef={inputRef} aria-label="Custom checkbox">\n  <Checkbox.Indicator keepMounted className={indicatorClasses}>✓</Checkbox.Indicator>\n</Checkbox.Root>',
        preview: (
          <div className="space-y-4">
            <Label className="gap-3">
              <CheckboxParts.Root
                ref={rootRef}
                inputRef={inputRef}
                name="custom-checkbox"
                defaultChecked
                className={cn(checkboxClasses, "size-8 rounded-full")}
                style={(state) => ({
                  borderStyle: state.checked ? "solid" : "dashed",
                })}
              >
                <CheckboxParts.Indicator
                  ref={indicatorRef}
                  keepMounted
                  className="size-full rounded-full"
                  render={(props, state) => (
                    <span {...props} aria-hidden="true">
                      {state.checked ? "●" : "○"}
                    </span>
                  )}
                />
              </CheckboxParts.Root>
              Custom retained indicator
            </Label>
            <Button.Root
              className={buttonClasses}
              onClick={() => {
                setRefs(
                  `Root ${rootRef.current?.tagName}; indicator ${indicatorRef.current?.tagName}; input ${inputRef.current?.tagName}:${inputRef.current?.type}; checked ${inputRef.current?.checked}`,
                );
                rootRef.current?.focus();
              }}
            >
              Inspect checkbox refs
            </Button.Root>
            <Text aria-live="polite" className="text-sm">
              {refs}
            </Text>
            <Label className="gap-3">
              <CheckboxParts.Root className="size-6 border border-current data-checked:bg-primary" />
              No indicator · root state styling
            </Label>
            <Label className="gap-3">
              <CheckboxParts.Root className={checkboxClasses} defaultChecked>
                <CheckboxParts.Indicator
                  aria-hidden="true"
                  className="transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
                >
                  ✓
                </CheckboxParts.Indicator>
              </CheckboxParts.Root>
              Consumer exit animation
            </Label>
          </div>
        ),
      },
      {
        title: "Optional Base UI Field validation context",
        usage:
          '<BaseField.Root name="terms">\n  <BaseField.Label><Checkbox.Root required />Accept terms</BaseField.Label>\n  <BaseField.Error />\n</BaseField.Root>',
        preview: (
          <div className="space-y-4">
            <BaseField.Root name="base-checkbox" className="space-y-2">
              <BaseField.Label className="flex items-center gap-3">
                <Checkbox defaultChecked />
                Base Field checkbox
              </BaseField.Label>
              <BaseField.Description className="text-sm text-muted-foreground">
                Base UI supplies associations; Umahra Field is an optional
                native layout layer.
              </BaseField.Description>
            </BaseField.Root>
          </div>
        ),
      },
    ],
  };
}
