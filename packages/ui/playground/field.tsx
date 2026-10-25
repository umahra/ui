import { useState } from "react";

import { ButtonPrimitive as Button } from "../src/button";
import { FieldPrimitive as Field } from "../src/field";
import { Heading } from "../src/heading";
import {
  InputGroupPrimitive as InputGroup,
  InputPrimitive,
} from "../src/input";
import { LabelPrimitive } from "../src/label";
import { Text } from "../src/text";
import { TextareaPrimitive } from "../src/textarea";

const controlClasses =
  "rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";
const buttonClasses =
  "rounded border border-input px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";
const separatorClasses =
  "h-5 [&_[data-slot=separator]]:h-px [&_[data-slot=separator]]:bg-border [&_[data-slot=field-separator-content]]:bg-background [&_[data-slot=field-separator-content]]:px-2";

export function FieldExamples() {
  const [invalid, setInvalid] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState("No field submission yet.");
  const errors = invalid
    ? [
        undefined,
        { message: "Use a work email address." },
        { message: "Use a work email address." },
        ...(multiple
          ? [{ message: "Contact your administrator for access." }]
          : []),
      ]
    : [];

  return (
    <section
      id="field"
      aria-labelledby="field-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">07 / Composition</p>
          <Heading as="h2" id="field-title">
            Field
          </Heading>
        </div>
        <code>FieldPrimitive</code>
      </div>
      <Text className="section-description">
        Compose labels, controls, descriptions, and errors with explicit IDs.
        Field owns layout; your form owns validation, appearance, and spacing.
      </Text>
      <div className="examples-grid">
        <div className="example">
          <p className="example-label">Primitive · vertical layout</p>
          <div className="example-body">
            <Field.Root>
              <Field.Label htmlFor="field-name">Account name</Field.Label>
              <InputPrimitive
                id="field-name"
                defaultValue="Ada"
                aria-describedby="field-name-description"
              />
              <Field.Description id="field-name-description">
                Visible to your team.
              </Field.Description>
            </Field.Root>
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Consumer wrapper · errors and native form
          </p>
          <form
            className="example-body space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (invalid) {
                setSubmitted("Resolve the field errors before submitting.");
                return;
              }
              setSubmitted(
                `Field submitted: ${new FormData(event.currentTarget).get("workEmail")}`,
              );
            }}
            onReset={() => {
              setInvalid(false);
              setMultiple(false);
              setSubmitted("Field form reset.");
            }}
          >
            <Field.Root
              data-invalid={invalid || undefined}
              className="gap-2 data-[invalid=true]:text-destructive"
            >
              <Field.Label
                htmlFor="field-email"
                className="text-sm font-medium"
              >
                Work email
              </Field.Label>
              <InputPrimitive
                id="field-email"
                name="workEmail"
                type="email"
                defaultValue="ada@example.com"
                required
                aria-invalid={invalid || undefined}
                aria-describedby={`field-email-description${invalid ? " field-email-error" : ""}`}
                className={controlClasses}
              />
              <Field.Description
                id="field-email-description"
                className="text-sm text-muted-foreground"
              >
                Used for account notifications.
              </Field.Description>
              <Field.Error
                id="field-email-error"
                errors={errors}
                className="text-sm text-destructive [&_ul]:list-inside [&_ul]:list-disc"
              />
            </Field.Root>
            <div className="flex flex-wrap gap-4 text-sm">
              <LabelPrimitive className="gap-2">
                <input
                  type="checkbox"
                  checked={invalid}
                  onChange={(event) => setInvalid(event.target.checked)}
                />
                Show field errors
              </LabelPrimitive>
              <LabelPrimitive className="gap-2">
                <input
                  type="checkbox"
                  checked={multiple}
                  onChange={(event) => setMultiple(event.target.checked)}
                />
                Multiple field errors
              </LabelPrimitive>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button.Root type="submit" className={buttonClasses}>
                Submit field
              </Button.Root>
              <Button.Root type="reset" className={buttonClasses}>
                Reset field
              </Button.Root>
            </div>
            <Text className="text-sm text-muted-foreground" aria-live="polite">
              {submitted}
            </Text>
          </form>
        </div>
        <div className="example md:col-span-2">
          <p className="example-label">
            Responsive field group · input group, textarea and fieldset
          </p>
          <div className="example-body space-y-5">
            <Field.Set
              className="gap-4"
              disabled={disabled}
              aria-describedby="field-profile-description"
            >
              <Field.Legend className="text-base font-medium">
                Profile details
              </Field.Legend>
              <Field.Description
                id="field-profile-description"
                className="text-sm text-muted-foreground"
              >
                Rows become columns when this group is narrow.
              </Field.Description>
              <Field.Group className="gap-5">
                <Field.Root orientation="responsive" className="gap-4">
                  <Field.Content className="gap-0.5">
                    <Field.Label
                      htmlFor="field-website"
                      className="text-sm font-medium"
                    >
                      Profile website
                    </Field.Label>
                    <Field.Description
                      id="field-website-description"
                      className="text-sm text-muted-foreground"
                    >
                      Your public profile address.
                    </Field.Description>
                  </Field.Content>
                  <InputGroup.Root
                    dir="ltr"
                    className="rounded-md border border-input focus-within:ring-2 focus-within:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:outline-hidden @md/field-group:w-1/2"
                  >
                    <InputGroup.Input
                      id="field-website"
                      defaultValue="example.com"
                      aria-describedby="field-website-description"
                      className="px-3 py-2 text-sm disabled:opacity-50"
                    />
                    <InputGroup.Addon className="ps-3">
                      <InputGroup.Text className="text-sm text-muted-foreground">
                        https://
                      </InputGroup.Text>
                    </InputGroup.Addon>
                  </InputGroup.Root>
                </Field.Root>
                <Field.Separator className={separatorClasses}>
                  More details
                </Field.Separator>
                <Field.Root orientation="responsive" className="gap-4">
                  <Field.Label
                    htmlFor="field-biography"
                    className="text-sm font-medium"
                  >
                    Biography
                  </Field.Label>
                  <TextareaPrimitive
                    id="field-biography"
                    defaultValue="Tell your team about yourself."
                    className={`${controlClasses} min-h-20 @md/field-group:w-1/2`}
                  />
                </Field.Root>
                <Field.Separator className={separatorClasses} />
                <Field.Root orientation="horizontal" className="gap-2">
                  <input
                    id="field-updates"
                    type="checkbox"
                    aria-describedby="field-updates-description"
                  />
                  <Field.Content className="gap-0.5">
                    <Field.Label
                      htmlFor="field-updates"
                      className="text-sm font-medium"
                    >
                      Profile notifications
                    </Field.Label>
                    <Field.Description
                      id="field-updates-description"
                      className="text-sm text-muted-foreground"
                    >
                      Email me when my public profile changes.
                    </Field.Description>
                  </Field.Content>
                </Field.Root>
              </Field.Group>
            </Field.Set>
            <LabelPrimitive className="gap-2 text-sm">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(event) => setDisabled(event.target.checked)}
              />
              Disable profile fieldset
            </LabelPrimitive>
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Horizontal choice card · label, title and content
          </p>
          <div className="example-body">
            <Field.Label
              htmlFor="field-choice"
              className="rounded-md border border-border p-4 has-[:checked]:border-ring has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring"
            >
              <Field.Root orientation="horizontal" className="gap-3">
                <input
                  id="field-choice"
                  type="checkbox"
                  aria-labelledby="field-choice-title"
                  aria-describedby="field-choice-description"
                />
                <Field.Content className="gap-0.5">
                  <Field.Title
                    id="field-choice-title"
                    className="text-sm font-medium"
                  >
                    Product announcements
                  </Field.Title>
                  <Field.Description
                    id="field-choice-description"
                    className="text-sm text-muted-foreground"
                  >
                    Receive occasional news about new features.
                  </Field.Description>
                </Field.Content>
              </Field.Root>
            </Field.Label>
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Error content · optional and consumer-owned
          </p>
          <div className="example-body space-y-3">
            <Field.Error
              errors={errors}
              className="text-sm text-destructive [&_ul]:list-inside [&_ul]:list-disc"
            >
              Explicit children override the supplied error array.
            </Field.Error>
            <Field.Error errors={[undefined, {}, { message: "" }]} />
            <Text className="text-sm text-muted-foreground">
              Empty errors render nothing. Duplicate messages appear once.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
