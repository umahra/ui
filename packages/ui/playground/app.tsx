import { Field } from "@base-ui/react/field";
import { type ReactNode, useEffect, useState } from "react";

import { ButtonPrimitive as Button } from "../src/button";
import { DialogPrimitive as Dialog } from "../src/dialog";
import { Heading } from "../src/heading";
import {
  InputGroupPrimitive as InputGroup,
  InputPrimitive,
} from "../src/input";
import { LabelPrimitive } from "../src/label";
import { Text } from "../src/text";

import { AccordionExamples } from "./accordion";
import { BreadcrumbExamples } from "./breadcrumb";
import { ButtonGroupExamples } from "./button-group";
import { CarouselExamples } from "./carousel";
import { CheckboxExamples } from "./checkbox";
import { FieldExamples } from "./field";
import { LabelExamples, TextareaExamples } from "./form-primitives";
import { InputGroupExamples } from "./input-group";
import { PopoverExamples } from "./popover";
import { RadioGroupExamples } from "./radio-group";
import { SelectExamples } from "./select";
import { SheetExamples } from "./sheet";
import { SliderExamples } from "./slider";
import { SwitchExamples } from "./switch";

const buttonClasses =
  "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:opacity-50";
const inputClasses =
  "rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";

function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="example">
      <p className="example-label">{title}</p>
      <div className="example-body">{children}</div>
    </div>
  );
}

function ButtonExamples() {
  const [loading, setLoading] = useState(false);
  const [clicks, setClicks] = useState(0);

  return (
    <section
      id="button"
      aria-labelledby="button-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / Interaction</p>
          <Heading as="h2" id="button-title">
            Button
          </Heading>
        </div>
        <code>ButtonPrimitive</code>
      </div>
      <Text className="section-description">
        Root works on its own. Add Content and Loader when your wrapper needs a
        loading overlay.
      </Text>
      <div className="examples-grid">
        <Example title="Primitive · browser defaults">
          <Button.Root onClick={() => setClicks(clicks + 1)}>
            Click primitive
          </Button.Root>
          <Text
            className="mt-3 text-sm text-muted-foreground"
            aria-live="polite"
          >
            Activated {clicks} times
          </Text>
        </Example>
        <Example title="Consumer wrapper · optional loading">
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
        </Example>
      </div>
    </section>
  );
}

function InputExamples() {
  const [value, setValue] = useState("Ada Lovelace");
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [submitted, setSubmitted] = useState("No submission yet.");

  return (
    <section
      id="input"
      aria-labelledby="input-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / Forms</p>
          <Heading as="h2" id="input-title">
            Input
          </Heading>
        </div>
        <code>InputPrimitive</code>
      </div>
      <Text className="section-description">
        Native input semantics, Base UI composition, and consumer-owned
        appearance.
      </Text>
      <div className="examples-grid">
        <Example title="Primitive · structural styles only">
          <LabelPrimitive htmlFor="plain-input" className="mb-2 block text-sm">
            Name
          </LabelPrimitive>
          <InputPrimitive id="plain-input" defaultValue="Unstyled input" />
          <Text className="mt-4 text-sm text-muted-foreground">
            Tab into the field to inspect the native focus indicator.
          </Text>
        </Example>
        <Example title="Consumer wrapper · controlled state">
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
        </Example>
        <Example title="Native form · required, submit and reset">
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
            <Text className="text-sm text-muted-foreground" aria-live="polite">
              {submitted}
            </Text>
          </form>
        </Example>
        <Example title="Optional Base UI Field composition">
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
        </Example>
      </div>
    </section>
  );
}

function DialogExamples() {
  const [longContent, setLongContent] = useState(false);

  return (
    <section
      id="dialog"
      aria-labelledby="dialog-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">08 / Overlays</p>
          <Heading as="h2" id="dialog-title">
            Dialog
          </Heading>
        </div>
        <code>DialogPrimitive</code>
      </div>
      <Text className="section-description">
        Compose the portal, overlay, viewport, content, and optional layout
        parts. Check focus return, Escape, and scrolling.
      </Text>
      <Example title="Consumer wrapper · modal dialog">
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
                          longer than the viewport so you can inspect scrolling
                          and reach the footer on smaller screens.
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
      </Example>
    </section>
  );
}

export function Playground() {
  const [dark, setDark] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);
  useEffect(() => {
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [rtl]);

  return (
    <div className="playground-shell">
      <header className="site-header">
        <a href="#top" className="brand">
          umahra<span>/ ui</span>
        </a>
        <div className="flex flex-wrap items-center gap-2">
          <Button.Root
            className={buttonClasses}
            aria-pressed={narrow}
            onClick={() => setNarrow(!narrow)}
          >
            Narrow canvas
          </Button.Root>
          <Button.Root
            className={buttonClasses}
            aria-pressed={rtl}
            onClick={() => setRtl(!rtl)}
          >
            RTL
          </Button.Root>
          <Button.Root
            className={buttonClasses}
            aria-pressed={dark}
            onClick={() => setDark(!dark)}
          >
            {dark ? "Light theme" : "Dark theme"}
          </Button.Root>
        </div>
      </header>
      <div className="playground-layout">
        <nav aria-label="Components" className="component-nav">
          <p className="eyebrow">Components</p>
          <a href="#typography">
            Typography <span>01</span>
          </a>
          <a href="#button">
            Button <span>02</span>
          </a>
          <a href="#button-group">
            Button Group <span>02</span>
          </a>
          <a href="#input">
            Input <span>03</span>
          </a>
          <a href="#input-group">
            Input Group <span>04</span>
          </a>
          <a href="#label">
            Label <span>05</span>
          </a>
          <a href="#textarea">
            Textarea <span>06</span>
          </a>
          <a href="#field">
            Field <span>07</span>
          </a>
          <a href="#dialog">
            Dialog <span>08</span>
          </a>
          <a href="#select">
            Select <span>09</span>
          </a>
          <a href="#switch">
            Switch <span>10</span>
          </a>
          <a href="#sheet">
            Sheet <span>11</span>
          </a>
          <a href="#radio-group">
            Radio Group <span>11</span>
          </a>
          <a href="#checkbox">
            Checkbox <span>12</span>
          </a>
          <a href="#popover">
            Popover <span>15</span>
          </a>
          <a href="#accordion">
            Accordion <span>16</span>
          </a>
          <a href="#slider">
            Slider <span>11</span>
          </a>
          <a href="#carousel">
            Carousel <span>17</span>
          </a>
          <a href="#breadcrumb">
            Breadcrumb <span>18</span>
          </a>
        </nav>
        <main
          id="top"
          className={`playground-main ${narrow ? "canvas-narrow" : ""}`}
        >
          <div className="intro">
            <p className="eyebrow">Development playground</p>
            <Heading as="h1">Build with the primitives.</Heading>
            <Text className="mt-4 max-w-xl text-muted-foreground">
              A shared place to inspect every component, compose your own
              wrappers, and check interaction across themes and layouts.
            </Text>
            <p className="mt-5 text-xs text-muted-foreground">
              Example styles belong to this playground. They are not library
              defaults.
            </p>
          </div>
          <section
            id="typography"
            aria-labelledby="typography-title"
            className="component-section"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / Foundations</p>
                <Heading as="h2" id="typography-title">
                  Typography
                </Heading>
              </div>
              <code>Heading · Text</code>
            </div>
            <Text className="section-description">
              Semantic headings and body text follow the consumer's theme
              tokens.
            </Text>
            <div className="examples-grid">
              <Example title="Heading · h1 through h6">
                <div className="space-y-5">
                  {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map(
                    (tag) => (
                      <div key={tag} className="flex items-baseline gap-4">
                        <span className="w-6 shrink-0 font-mono text-xs text-muted-foreground">
                          {tag}
                        </span>
                        <Heading as={tag}>The details matter.</Heading>
                      </div>
                    ),
                  )}
                </div>
              </Example>
              <Example title="Text · paragraph, inline and overrides">
                <Text>
                  Readable body text with your font, color, and responsive
                  typography tokens.
                </Text>
                <Text className="mt-4">
                  Use{" "}
                  <Text as="span" className="font-semibold">
                    inline emphasis
                  </Text>{" "}
                  inside a paragraph.
                </Text>
                <Text className="mt-4 text-sm text-muted-foreground">
                  A consumer class overrides size and color.
                </Text>
                <Heading as="h3" className="mt-6 text-2xl">
                  A heading with an override
                </Heading>
              </Example>
            </div>
          </section>
          <ButtonExamples />
          <ButtonGroupExamples />
          <InputExamples />
          <InputGroupExamples />
          <LabelExamples />
          <TextareaExamples />
          <FieldExamples />
          <DialogExamples />
          <SelectExamples />
          <SwitchExamples />
          <CheckboxExamples />
          <SliderExamples direction={rtl ? "rtl" : "ltr"} />
          <SheetExamples />
          <PopoverExamples direction={rtl ? "rtl" : "ltr"} />
          <RadioGroupExamples direction={rtl ? "rtl" : "ltr"} />
          <AccordionExamples />
          <CarouselExamples direction={rtl ? "rtl" : "ltr"} />
          <BreadcrumbExamples />
          <footer className="playground-footer">
            @umahra/ui · Local component showcase
          </footer>
        </main>
      </div>
    </div>
  );
}
