import { type ReactNode, useRef, useState } from "react";

import { ButtonPrimitive as Button } from "../src/button";
import { DialogPrimitive as Dialog } from "../src/dialog";
import { FieldPrimitive as Field } from "../src/field";
import { Heading } from "../src/heading";
import { LabelPrimitive } from "../src/label";
import {
  SelectPrimitive as Select,
  type SelectListProps,
  type SelectTriggerProps,
} from "../src/select";
import { Text } from "../src/text";

const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
const regions = [
  {
    value: "Regions 1–20",
    items: Array.from(
      { length: 20 },
      (_, i) => `Region ${String(i + 1).padStart(2, "0")}`,
    ),
  },
  {
    value: "Regions 21–40",
    items: Array.from(
      { length: 20 },
      (_, i) => `Region ${String(i + 21).padStart(2, "0")}`,
    ),
  },
];
const plans = [
  { id: "starter", label: "Starter", description: "For a small project" },
  { id: "team", label: "Team", description: "For a growing team" },
];
const triggerClasses =
  "w-full gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm data-placeholder:text-muted-foreground disabled:opacity-50 aria-invalid:border-destructive focus-visible:outline-ring";
const buttonClasses =
  "rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";
const inputClasses =
  "px-3 py-2 text-sm placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring";
const itemClasses =
  "gap-2 px-3 py-2 text-sm data-disabled:opacity-40 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:outline-ring";
const groupClasses =
  "rounded-md border border-input bg-background focus-within:outline-ring";
const popupClasses =
  "max-h-72 rounded-md border border-border bg-popover text-popover-foreground shadow-md";

interface ConsumerTriggerProps extends SelectTriggerProps {
  compact?: boolean;
}

function ConsumerTrigger({
  compact,
  className = "",
  children,
  ...props
}: ConsumerTriggerProps) {
  return (
    <Select.Trigger
      {...props}
      className={`${triggerClasses} ${compact ? "py-1 text-xs" : ""} ${className}`}
    >
      <span className="min-w-0 flex-1 truncate text-start">
        {children ?? <Select.Value placeholder="Choose fruit" />}
      </span>
      <Select.Icon className="size-4">⌄</Select.Icon>
    </Select.Trigger>
  );
}

function ConsumerPopup({
  children,
  searchLabel,
}: {
  children: SelectListProps["children"];
  searchLabel?: string;
}) {
  return (
    <Select.Portal>
      <Select.Positioner sideOffset={4} align="start">
        <Select.Content className={popupClasses} aria-label={searchLabel}>
          {searchLabel && (
            <Select.Input
              aria-label={searchLabel}
              placeholder="Search…"
              className={`${inputClasses} shrink-0 border-b border-input`}
            />
          )}
          <Select.Empty>
            <p className="px-3 py-2 text-sm text-muted-foreground">
              No items found.
            </p>
          </Select.Empty>
          <Select.List className="max-h-60">{children}</Select.List>
        </Select.Content>
      </Select.Positioner>
    </Select.Portal>
  );
}

function Choice({ item }: { item: string }) {
  return (
    <Select.Item
      value={item}
      disabled={item === "Grapes"}
      className={itemClasses}
    >
      <span className="min-w-0 flex-1">{item}</span>
      <Select.ItemIndicator keepMounted className="size-4">
        ✓
      </Select.ItemIndicator>
    </Select.Item>
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

export function SelectExamples() {
  const [fruit, setFruit] = useState<string | null>("Apple");
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [multiple, setMultiple] = useState<string[]>(["Apple", "Banana"]);
  const [chipDisabled, setChipDisabled] = useState(false);
  const [chipReadOnly, setChipReadOnly] = useState(false);
  const [submitted, setSubmitted] = useState("No submission yet.");
  const [event, setEvent] = useState("No trigger event yet.");
  const [plan, setPlan] = useState<(typeof plans)[number] | null>(
    plans[0] ?? null,
  );
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <section
      id="select"
      aria-labelledby="select-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">09 / Selection</p>
          <Heading as="h2" id="select-title">
            Select
          </Heading>
        </div>
        <code>SelectPrimitive</code>
      </div>
      <Text className="section-description">
        Searchable selection powered by Base UI Combobox. Compose a familiar
        button with search inside its popup, or show selected items as removable
        chips in the control.
      </Text>
      <div className="examples-grid">
        <Example title="Primitive · search with browser defaults">
          <Select.Root items={fruits} defaultValue="Banana">
            <LabelPrimitive htmlFor="plain-select">Plain fruit</LabelPrimitive>
            <Select.Input id="plain-select" placeholder="Search fruit" />
            <Select.Portal>
              <Select.Positioner>
                <Select.Content>
                  <Select.Empty>No items found.</Select.Empty>
                  <Select.List>
                    {(item: string) => (
                      <Select.Item
                        key={item}
                        value={item}
                        disabled={item === "Grapes"}
                      >
                        {item}
                      </Select.Item>
                    )}
                  </Select.List>
                </Select.Content>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          <Text className="text-xs text-muted-foreground">
            Input works without an input group, trigger, clear button, or
            indicators. Browser focus stays visible.
          </Text>
        </Example>

        <Example title="Button trigger · search inside the dropdown">
          <form
            className="space-y-3"
            onReset={() => {
              setFruit("Apple");
              setOpen(false);
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(
                `Fruit: ${new FormData(e.currentTarget).get("fruit")}`,
              );
            }}
          >
            <Field.Root className="gap-2" data-invalid={invalid || undefined}>
              <Field.Label
                htmlFor="select-form-fruit"
                className="text-sm font-medium"
              >
                Favorite fruit
              </Field.Label>
              <Select.Root
                items={fruits}
                value={fruit}
                onValueChange={setFruit}
                open={open}
                onOpenChange={setOpen}
                name="fruit"
                required
                disabled={disabled}
                readOnly={readOnly}
              >
                <ConsumerTrigger
                  id="select-form-fruit"
                  ref={trigger}
                  aria-invalid={invalid || undefined}
                  aria-describedby="select-fruit-description"
                  aria-errormessage={invalid ? "select-fruit-error" : undefined}
                  render={<button type="button" />}
                  onFocus={() =>
                    setEvent(
                      `Focused ${trigger.current?.tagName.toLowerCase()}`,
                    )
                  }
                  onClick={() => setEvent("Consumer click received")}
                  style={(state) => ({
                    cursor: state.readOnly ? "default" : undefined,
                  })}
                />
                <ConsumerPopup searchLabel="Search favorite fruit">
                  {(item: string) => <Choice key={item} item={item} />}
                </ConsumerPopup>
              </Select.Root>
              <Field.Description
                id="select-fruit-description"
                className="text-xs text-muted-foreground"
              >
                Grapes is unavailable. Search matches labels. Page scrolling
                stays available.
              </Field.Description>
              {invalid && (
                <Field.Error
                  id="select-fruit-error"
                  className="text-xs text-destructive"
                >
                  Choose an available fruit.
                </Field.Error>
              )}
            </Field.Root>
            <div className="flex flex-wrap gap-2">
              <Button.Root type="submit" className={buttonClasses}>
                Submit fruit
              </Button.Root>
              <Button.Root type="reset" className={buttonClasses}>
                Reset fruit
              </Button.Root>
              <Button.Root
                type="button"
                className={buttonClasses}
                onClick={() => setFruit(null)}
              >
                Clear fruit
              </Button.Root>
              <Button.Root
                type="button"
                className={buttonClasses}
                onClick={() => setOpen(!open)}
              >
                Toggle fruit popup
              </Button.Root>
            </div>
          </form>
          <div className="flex flex-wrap gap-3 text-xs">
            <LabelPrimitive className="gap-1">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disable fruit
            </LabelPrimitive>
            <LabelPrimitive className="gap-1">
              <input
                type="checkbox"
                checked={readOnly}
                onChange={(e) => setReadOnly(e.target.checked)}
              />
              Read-only fruit
            </LabelPrimitive>
            <LabelPrimitive className="gap-1">
              <input
                type="checkbox"
                checked={invalid}
                onChange={(e) => setInvalid(e.target.checked)}
              />
              Invalid fruit
            </LabelPrimitive>
          </div>
          <Text className="text-xs text-muted-foreground" aria-live="polite">
            Value: {fruit ?? "none"}; popup: {open ? "open" : "closed"}. {event}
          </Text>
        </Example>

        <Example title="Multiple · selected items inside the control">
          <form
            className="space-y-3"
            onReset={() => setMultiple(["Apple", "Banana"])}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(
                `Fruits: ${new FormData(e.currentTarget).getAll("fruits").join(", ") || "empty"}`,
              );
            }}
          >
            <Select.Root
              items={fruits}
              multiple
              value={multiple}
              onValueChange={setMultiple}
              name="fruits"
              disabled={chipDisabled}
              readOnly={chipReadOnly}
              onOpenChange={(nextOpen, details) => {
                if (!nextOpen && details.reason === "item-press")
                  details.cancel();
              }}
            >
              <LabelPrimitive
                htmlFor="select-fruits"
                className="mb-2 text-sm font-medium"
              >
                Fruit collection
              </LabelPrimitive>
              <Select.InputGroup
                className={`${groupClasses} gap-2 p-2 data-disabled:opacity-50`}
              >
                <Select.Value>
                  {(selected: string[]) => (
                    <Select.Chips
                      className="gap-1"
                      aria-label={
                        selected.length ? "Selected fruits" : undefined
                      }
                    >
                      {selected.map((item) => (
                        <Select.Chip
                          key={item}
                          aria-label={item}
                          aria-description="Press Backspace or Delete to remove"
                          className="gap-1 rounded bg-muted ps-2 text-sm focus-visible:outline-ring"
                        >
                          <span>{item}</span>
                          <Select.ChipRemove
                            aria-label={`Remove ${item}`}
                            className="size-6 rounded hover:bg-accent focus-visible:outline-ring"
                          >
                            ×
                          </Select.ChipRemove>
                        </Select.Chip>
                      ))}
                      <Select.Input
                        id="select-fruits"
                        placeholder={selected.length ? "" : "Choose fruits"}
                        aria-description={
                          selected.length
                            ? "From the start of the input, use the arrow keys to focus selected items."
                            : undefined
                        }
                        className="w-auto min-w-20 flex-1 px-1 py-1 text-sm"
                      />
                    </Select.Chips>
                  )}
                </Select.Value>
                <Select.Clear
                  aria-label="Clear selected fruits"
                  className="size-6"
                >
                  ×
                </Select.Clear>
                <Select.Trigger
                  aria-label="Open fruit options"
                  className="size-6"
                >
                  <Select.Icon>⌄</Select.Icon>
                </Select.Trigger>
              </Select.InputGroup>
              <ConsumerPopup>
                {(item: string) => <Choice key={item} item={item} />}
              </ConsumerPopup>
            </Select.Root>
            <div className="flex flex-wrap gap-2">
              <Button.Root type="submit" className={buttonClasses}>
                Submit fruits
              </Button.Root>
              <Button.Root type="reset" className={buttonClasses}>
                Reset fruits
              </Button.Root>
            </div>
          </form>
          <div className="flex flex-wrap gap-3 text-xs">
            <LabelPrimitive className="gap-1">
              <input
                type="checkbox"
                checked={chipDisabled}
                onChange={(e) => setChipDisabled(e.target.checked)}
              />
              Disable chips
            </LabelPrimitive>
            <LabelPrimitive className="gap-1">
              <input
                type="checkbox"
                checked={chipReadOnly}
                onChange={(e) => setChipReadOnly(e.target.checked)}
              />
              Read-only chips
            </LabelPrimitive>
          </div>
          <Text className="text-xs text-muted-foreground">
            Each selected item is visible and removable. Search and chip
            keyboard navigation come from Base UI. This wrapper keeps the popup
            open after picking an item.
          </Text>
        </Example>

        <Example title="Single · inline input, clear and compact trigger">
          <Select.Root items={fruits} defaultValue="Blueberry">
            <LabelPrimitive
              htmlFor="inline-fruit"
              className="mb-2 text-sm font-medium"
            >
              Inline fruit
            </LabelPrimitive>
            <Select.InputGroup className={`${groupClasses} gap-1`}>
              <Select.Input
                id="inline-fruit"
                placeholder="Search fruit"
                className={inputClasses}
              />
              <Select.Clear aria-label="Clear inline fruit" className="size-8">
                ×
              </Select.Clear>
              <Select.Trigger
                aria-label="Open inline fruit options"
                className="size-8"
              >
                <Select.Icon>⌄</Select.Icon>
              </Select.Trigger>
            </Select.InputGroup>
            <ConsumerPopup>
              {(item: string) => <Choice key={item} item={item} />}
            </ConsumerPopup>
          </Select.Root>
        </Example>

        <Example title="Grouped · filter a long list instead of scanning">
          <Select.Root items={regions} defaultValue="Region 20">
            <Select.Label className="mb-2 text-sm font-medium">
              Region
            </Select.Label>
            <ConsumerTrigger compact>
              <Select.Value placeholder="Choose region" />
            </ConsumerTrigger>
            <ConsumerPopup searchLabel="Search regions">
              {(group: (typeof regions)[number]) => (
                <Select.Group key={group.value} items={group.items}>
                  <Select.GroupLabel className="px-3 py-2 text-xs text-muted-foreground">
                    {group.value}
                  </Select.GroupLabel>
                  <Select.Collection>
                    {(item: string) => <Choice key={item} item={item} />}
                  </Select.Collection>
                  <Select.Separator className="h-px bg-border" />
                </Select.Group>
              )}
            </ConsumerPopup>
          </Select.Root>
          <Text className="text-xs text-muted-foreground">
            Try “32”, an unmatched search, or Home/End after opening. Groups
            follow the filtered collection.
          </Text>
        </Example>

        <Example title="Objects · labels, equality and submitted IDs">
          <Select.Root
            items={plans}
            value={plan}
            onValueChange={setPlan}
            name="plan"
            itemToStringLabel={(item) => item.label}
            itemToStringValue={(item) => item.id}
            isItemEqualToValue={(a, b) => a.id === b.id}
          >
            <Select.Label className="mb-2 text-sm font-medium">
              Subscription plan
            </Select.Label>
            <ConsumerTrigger>
              <Select.Value placeholder="Choose plan" />
            </ConsumerTrigger>
            <ConsumerPopup searchLabel="Search plans">
              {(item: (typeof plans)[number]) => (
                <Select.Item
                  key={item.id}
                  value={{ ...item }}
                  className={itemClasses}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block">{item.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              )}
            </ConsumerPopup>
          </Select.Root>
          <Text className="text-xs text-muted-foreground" aria-live="polite">
            Plan: {plan?.id ?? "none"}
          </Text>
        </Example>

        <Example title="Dialog · nested searchable popup">
          <Dialog.Root>
            <Dialog.Trigger className={buttonClasses}>
              Open select dialog
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/40" />
              <Dialog.Viewport className="p-4">
                <Dialog.Content className="max-w-sm space-y-4 rounded-lg border border-border bg-background p-5 shadow-lg">
                  <Dialog.Title className="font-semibold">
                    Choose within a dialog
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-muted-foreground">
                    Escape closes the select first, then the dialog.
                  </Dialog.Description>
                  <Select.Root items={fruits} defaultValue="Apple">
                    <Select.Label className="mb-2 text-sm font-medium">
                      Dialog fruit
                    </Select.Label>
                    <ConsumerTrigger />
                    <ConsumerPopup searchLabel="Search dialog fruit">
                      {(item: string) => <Choice key={item} item={item} />}
                    </ConsumerPopup>
                  </Select.Root>
                  <Dialog.Close className={buttonClasses}>
                    Close select dialog
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Viewport>
            </Dialog.Portal>
          </Dialog.Root>
        </Example>
      </div>
      <Text className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {submitted}
      </Text>
    </section>
  );
}
