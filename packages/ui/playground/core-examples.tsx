import { Field } from "@base-ui/react/field";
import { useState } from "react";
import { ButtonPrimitive as Button } from "../src/button";
import { DialogPrimitive as Dialog } from "../src/dialog";
import {
  InputGroupPrimitive as InputGroup,
  InputPrimitive,
} from "../src/input";
import { LabelPrimitive } from "../src/label";
import { Text } from "../src/text";
import type { DesignSystemComponent } from "../src/visualiser";

const buttonClasses =
  "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:opacity-50";
const inputClasses =
  "rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";

export function useButtonExamples(): DesignSystemComponent {
  const [loading, setLoading] = useState(false);
  const [clicks, setClicks] = useState(0);

  return {
    id: "button",
    name: "Button",
    description: "Actions in default, disabled and loading states.",
    importCode:
      'import { ButtonPrimitive as Button } from "@umahra/ui/button";',
    examples: [
      {
        title: "Primitive · browser defaults",
        usage:
          "<Button.Root onClick={onActivate}>Click primitive</Button.Root>",
        preview: (
          <div className="space-y-4">
            <Button.Root onClick={() => setClicks(clicks + 1)}>
              Click primitive
            </Button.Root>
            <Text
              className="mt-3 text-sm text-muted-foreground"
              aria-live="polite"
            >
              Activated {clicks} times
            </Text>
          </div>
        ),
      },
      {
        title: "Consumer wrapper · optional loading",
        usage:
          "<Button.Root loading={loading} className={buttonClasses}>\n  <Button.Content>Save changes</Button.Content>\n  <Button.Loader><Spinner /></Button.Loader>\n</Button.Root>\n<Button.Root disabled>Disabled</Button.Root>",
        preview: (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button.Root loading={loading} className={buttonClasses}>
                <Button.Content>Save changes</Button.Content>
                <Button.Loader>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                </Button.Loader>
              </Button.Root>
              <Button.Root disabled className={buttonClasses}>
                Disabled
              </Button.Root>
            </div>
            <LabelPrimitive className="mt-5 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={loading}
                onChange={(event) => setLoading(event.target.checked)}
              />
              Loading
            </LabelPrimitive>
          </div>
        ),
      },
    ],
  };
}

export function useInputExamples(): DesignSystemComponent {
  const [value, setValue] = useState("Ada Lovelace");
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [submitted, setSubmitted] = useState("No submission yet.");

  return {
    id: "input",
    name: "Input",
    description: "Text inputs for forms.",
    importCode: 'import { InputPrimitive } from "@umahra/ui/input";',
    examples: [
      {
        title: "Primitive · structural styles only",
        usage:
          '<LabelPrimitive htmlFor="name">Name</LabelPrimitive>\n<InputPrimitive id="name" defaultValue="Ada Lovelace" />',
        preview: (
          <div className="space-y-4">
            <LabelPrimitive
              htmlFor="plain-input"
              className="mb-2 block text-sm"
            >
              Name
            </LabelPrimitive>
            <InputPrimitive id="plain-input" defaultValue="Unstyled input" />
            <Text className="mt-4 text-sm text-muted-foreground">
              Tab into the field to inspect the native focus indicator.
            </Text>
          </div>
        ),
      },
      {
        title: "Consumer wrapper · controlled state",
        usage:
          "<InputPrimitive value={value} onValueChange={setValue}\n  disabled={disabled} readOnly={readOnly}\n  aria-invalid={invalid} className={inputClasses} />",
        preview: (
          <div className="space-y-4">
            <LabelPrimitive
              htmlFor="controlled-input"
              className="mb-2 block text-sm"
            >
              Full name
            </LabelPrimitive>
            <InputPrimitive
              id="controlled-input"
              value={value}
              onValueChange={setValue}
              disabled={disabled}
              readOnly={readOnly}
              aria-invalid={invalid || undefined}
              aria-describedby="name-hint"
              className={inputClasses}
            />
            <Text
              id="name-hint"
              className={`mt-2 text-sm ${invalid ? "text-destructive" : "text-muted-foreground"}`}
            >
              {invalid
                ? "Enter a valid name."
                : "Value is controlled by this example."}
            </Text>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <LabelPrimitive className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(event) => setDisabled(event.target.checked)}
                />
                Disabled
              </LabelPrimitive>
              <LabelPrimitive className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={invalid}
                  onChange={(event) => setInvalid(event.target.checked)}
                />
                Invalid
              </LabelPrimitive>
              <LabelPrimitive className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={readOnly}
                  onChange={(event) => setReadOnly(event.target.checked)}
                />
                Read only
              </LabelPrimitive>
            </div>
          </div>
        ),
      },
      {
        title: "Native form · required, submit and reset",
        usage:
          '<form onSubmit={onSubmit} onReset={onReset}>\n  <InputPrimitive name="email" type="email" required />\n  <Button.Root type="submit">Submit</Button.Root>\n  <Button.Root type="reset">Reset</Button.Root>\n</form>',
        preview: (
          <div className="space-y-4">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                setSubmitted(`Submitted ${data.get("email")}`);
              }}
              onReset={() => setSubmitted("Form reset.")}
              className="space-y-3"
            >
              <LabelPrimitive htmlFor="email-input" className="block text-sm">
                Email <span className="text-muted-foreground">(required)</span>
              </LabelPrimitive>
              <InputPrimitive
                id="email-input"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClasses}
              />
              <LabelPrimitive htmlFor="file-input" className="block text-sm">
                Attachment
              </LabelPrimitive>
              <InputPrimitive
                id="file-input"
                name="attachment"
                type="file"
                className={`${inputClasses} text-sm file:me-3 file:rounded file:border-0 file:bg-muted file:px-2 file:py-1 file:text-foreground`}
              />
              <div className="flex flex-wrap gap-2">
                <Button.Root type="submit" className={buttonClasses}>
                  Submit example
                </Button.Root>
                <Button.Root type="reset" className={buttonClasses}>
                  Reset
                </Button.Root>
              </div>
              <Text
                className="text-sm text-muted-foreground"
                aria-live="polite"
              >
                {submitted}
              </Text>
            </form>
          </div>
        ),
      },
      {
        title: "Optional Base UI Field composition",
        usage:
          '<BaseField.Root name="email">\n  <BaseField.Label>Email</BaseField.Label>\n  <InputPrimitive type="email" required />\n  <BaseField.Error />\n</BaseField.Root>',
        preview: (
          <div className="space-y-4">
            <Field.Root name="project" className="space-y-2">
              <Field.Label className="block text-sm">Project name</Field.Label>
              <InputPrimitive
                defaultValue="My design system"
                className={inputClasses}
              />
              <Field.Description className="text-sm text-muted-foreground">
                Label and description associations come from Field.
              </Field.Description>
            </Field.Root>
            <Text className="mt-5 text-sm text-muted-foreground">
              Styling hooks: data-disabled, aria-invalid, and Field state
              attributes.
            </Text>
          </div>
        ),
      },
    ],
  };
}

export function useDialogExamples(): DesignSystemComponent {
  const [longContent, setLongContent] = useState(false);

  return {
    id: "dialog",
    name: "Dialog",
    description: "A window displayed over the page for focused tasks.",
    importCode:
      'import { DialogPrimitive as Dialog } from "@umahra/ui/dialog";',
    examples: [
      {
        title: "Consumer wrapper · modal dialog",
        usage:
          '<Dialog.Root>\n  <Dialog.Trigger>Open dialog</Dialog.Trigger>\n  <Dialog.Portal>\n    <Dialog.Overlay className="bg-black/40" />\n    <Dialog.Content className={dialogClasses}>\n      <Dialog.Title>Create project</Dialog.Title>\n      <Dialog.Description>Project details</Dialog.Description>\n      <Dialog.Close>Cancel</Dialog.Close>\n    </Dialog.Content>\n  </Dialog.Portal>\n</Dialog.Root>',
        preview: (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-5">
              <Dialog.Root>
                <Dialog.Trigger className={buttonClasses}>
                  Open dialog
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/40" />
                  <Dialog.Viewport className="p-4">
                    <Dialog.Content className="max-w-lg rounded-xl border border-border bg-background p-6 text-foreground shadow-xl">
                      <Dialog.Header className="gap-2">
                        <Dialog.Title className="text-xl font-semibold">
                          Project settings
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-muted-foreground">
                          A composed dialog with consumer-owned appearance.
                        </Dialog.Description>
                      </Dialog.Header>
                      <div className="my-6 space-y-4">
                        <LabelPrimitive
                          htmlFor="dialog-project"
                          className="block text-sm"
                        >
                          Project name
                        </LabelPrimitive>
                        <InputGroup.Root className="rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:outline-hidden">
                          <InputGroup.Input
                            id="dialog-project"
                            defaultValue="Umahra UI"
                            className="px-3 py-2"
                          />
                          <InputGroup.Addon className="ps-3 text-sm text-muted-foreground">
                            <InputGroup.Text>Project /</InputGroup.Text>
                          </InputGroup.Addon>
                        </InputGroup.Root>
                        {longContent &&
                          Array.from({ length: 14 }, (_, index) => (
                            <Text
                              key={`paragraph-${index + 1}`}
                              className="text-sm text-muted-foreground"
                            >
                              Section {index + 1}. This content makes the dialog
                              longer than the viewport so you can inspect
                              scrolling and reach the footer on smaller screens.
                            </Text>
                          ))}
                      </div>
                      <Dialog.Footer className="gap-2">
                        <Dialog.Close className={buttonClasses}>
                          Cancel
                        </Dialog.Close>
                        <Dialog.Close
                          className={`${buttonClasses} border-primary bg-primary text-primary-foreground hover:bg-primary/90`}
                        >
                          Save settings
                        </Dialog.Close>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Viewport>
                </Dialog.Portal>
              </Dialog.Root>
              <LabelPrimitive className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={longContent}
                  onChange={(event) => setLongContent(event.target.checked)}
                />
                Long content
              </LabelPrimitive>
            </div>
          </div>
        ),
      },
    ],
  };
}
