import { useRef, useState } from "react";

import {
  ButtonPrimitive as Button,
  type ButtonRootProps,
  ButtonGroupPrimitive as Group,
} from "../src/button";
import { cn } from "../src/cn";
import { Heading } from "../src/heading";
import { InputPrimitive } from "../src/input";
import { LabelPrimitive } from "../src/label";
import { PopoverPrimitive as Popover } from "../src/popover";
import { Text } from "../src/text";

interface ActionProps extends ButtonRootProps {
  compact?: boolean;
}

function Action({ compact, className, ...props }: ActionProps) {
  return (
    <Button.Root
      {...props}
      className={cn(
        "rounded-lg border border-input bg-background text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:opacity-50",
        compact ? "px-2 py-1" : "px-3 py-2",
        className,
      )}
    />
  );
}

export function ButtonGroupExamples() {
  const [action, setAction] = useState("No action yet");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section
      id="button-group"
      aria-labelledby="button-group-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / Interaction</p>
          <Heading as="h2" id="button-group-title">
            Button Group
          </Heading>
        </div>
        <code>ButtonGroupPrimitive · /button</code>
      </div>
      <Text className="section-description">
        Related actions with normal Tab navigation. Text and Separator are
        optional; wrappers own appearance, spacing and sizes.
      </Text>
      <div className="examples-grid">
        <div className="example">
          <p className="example-label">Primitive · browser defaults</p>
          <div className="example-body">
            <Group.Root aria-label="Plain actions">
              <Button.Root onClick={() => setAction("Plain copy")}>
                Copy
              </Button.Root>
              <Button.Root onClick={() => setAction("Plain paste")}>
                Paste
              </Button.Root>
            </Group.Root>
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Consumer wrapper · joined edges and focus
          </p>
          <div className="example-body">
            <Group.Root aria-label="Clipboard actions" ref={rootRef}>
              <Action
                onClick={() =>
                  setAction(
                    rootRef.current?.dataset.orientation === "horizontal"
                      ? "Copied · root ref attached"
                      : "Missing ref",
                  )
                }
              >
                Copy
              </Action>
              <Action onClick={() => setAction("Pasted")}>Paste</Action>
              <Action
                disabled
                onClick={() => setAction("Unexpected disabled action")}
              >
                Delete
              </Action>
            </Group.Root>
            <output
              className="mt-3 block text-sm text-muted-foreground"
              aria-live="polite"
            >
              {action}
            </output>
          </div>
        </div>
        <div className="example">
          <p className="example-label">Vertical · optional separator</p>
          <div className="example-body">
            <Group.Root orientation="vertical" aria-label="Zoom controls">
              <Action
                className="border-0 bg-muted"
                onClick={() => setAction("Zoomed in")}
              >
                Zoom in
              </Action>
              <Group.Separator
                orientation="horizontal"
                className="h-px bg-border"
              />
              <Action
                className="border-0 bg-muted"
                onClick={() => setAction("Zoomed out")}
              >
                Zoom out
              </Action>
            </Group.Root>
          </div>
        </div>
        <div className="example">
          <p className="example-label">Text as label · input, forms and refs</p>
          <div className="example-body">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(
                  `${new FormData(event.currentTarget).get("query")} · input ref ${inputRef.current ? "attached" : "missing"}`,
                );
              }}
            >
              <Group.Root aria-label="Search actions" className="w-full">
                <Group.Text
                  render={<LabelPrimitive htmlFor="group-query" />}
                  className="rounded-lg border border-input bg-muted px-2 text-sm"
                >
                  Find
                </Group.Text>
                <InputPrimitive
                  id="group-query"
                  name="query"
                  ref={inputRef}
                  defaultValue="Buttons"
                  className="w-0 rounded-lg border border-input px-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring"
                />
                <Action type="submit">Go</Action>
              </Group.Root>
              <output
                className="mt-3 block text-sm text-muted-foreground"
                aria-live="polite"
              >
                {submitted}
              </output>
            </form>
          </div>
        </div>
        <div className="example">
          <p className="example-label">Split action · popover and loading</p>
          <div className="example-body">
            <Popover.Root>
              <Group.Root aria-label="Save actions">
                <Action loading={loading} onClick={() => setAction("Saved")}>
                  <Button.Content>Save changes</Button.Content>
                  <Button.Loader>
                    <span aria-hidden="true">…</span>
                  </Button.Loader>
                </Action>
                <Group.Separator
                  aria-hidden="true"
                  className="w-px bg-border"
                />
                <Popover.Trigger
                  render={<Action aria-label="More save actions" />}
                >
                  ⌄
                </Popover.Trigger>
              </Group.Root>
              <Popover.Portal>
                <Popover.Positioner sideOffset={8}>
                  <Popover.Content className="rounded-lg border border-input bg-background p-3 shadow-md">
                    <Popover.Title className="text-sm font-medium">
                      Save options
                    </Popover.Title>
                    <Popover.Close
                      className="mt-2 rounded border border-input px-2 py-1 text-sm"
                      onClick={() => setAction("Saved a copy")}
                    >
                      Save a copy
                    </Popover.Close>
                  </Popover.Content>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
            <LabelPrimitive className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={loading}
                onChange={(event) => setLoading(event.target.checked)}
              />
              Loading first action
            </LabelPrimitive>
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Nested groups · consumer spacing and sizes
          </p>
          <div className="example-body">
            <Group.Root
              aria-label="History and formatting"
              className="flex-wrap gap-3"
            >
              <Group.Root aria-label="History">
                <Action compact onClick={() => setAction("Undo")}>
                  Undo
                </Action>
                <Action compact onClick={() => setAction("Redo")}>
                  Redo
                </Action>
              </Group.Root>
              <Group.Root aria-label="Formatting">
                <Action compact onClick={() => setAction("Bold action")}>
                  Bold
                </Action>
                <Action compact onClick={() => setAction("Italic action")}>
                  Italic
                </Action>
              </Group.Root>
            </Group.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
