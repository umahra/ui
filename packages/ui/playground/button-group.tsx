import { useRef, useState } from "react";
import {
  ButtonPrimitive as Button,
  type ButtonRootProps,
  ButtonGroupPrimitive as Group,
} from "../src/button";
import { cn } from "../src/cn";
import { InputPrimitive } from "../src/input";
import { LabelPrimitive } from "../src/label";
import { PopoverPrimitive as Popover } from "../src/popover";
import type { DesignSystemComponent } from "../src/visualiser";

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

export function useButtonGroupExamples(): DesignSystemComponent {
  const [action, setAction] = useState("No action yet");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return {
    id: "button-group",
    name: "Button Group",
    description: "Related actions arranged in a group.",
    importCode:
      'import { ButtonGroupPrimitive as Group, ButtonPrimitive as Button } from "@umahra/ui/button";',
    examples: [
      {
        title: "Primitive · browser defaults",
        usage:
          '<Group.Root aria-label="Clipboard actions">\n  <Button.Root>Copy</Button.Root>\n  <Button.Root>Paste</Button.Root>\n</Group.Root>',
        preview: (
          <div className="project-preview">
            <Group.Root aria-label="Plain actions">
              <Button.Root onClick={() => setAction("Plain copy")}>
                Copy
              </Button.Root>
              <Button.Root onClick={() => setAction("Plain paste")}>
                Paste
              </Button.Root>
            </Group.Root>
          </div>
        ),
      },
      {
        title: "Consumer wrapper · joined edges and focus",
        usage:
          '<Group.Root aria-label="Clipboard actions">\n  <Action onClick={copy}>Copy</Action>\n  <Action onClick={paste}>Paste</Action>\n  <Action disabled>Delete</Action>\n</Group.Root>',
        preview: (
          <div className="project-preview">
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
        ),
      },
      {
        title: "Vertical · optional separator",
        usage:
          '<Group.Root orientation="vertical" aria-label="Zoom">\n  <Action>Zoom in</Action>\n  <Group.Separator orientation="horizontal" />\n  <Action>Zoom out</Action>\n</Group.Root>',
        preview: (
          <div className="project-preview">
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
        ),
      },
      {
        title: "Text as label · input, forms and refs",
        usage:
          '<Group.Root aria-label="Search actions">\n  <Group.Text render={<LabelPrimitive htmlFor="query" />}>Find</Group.Text>\n  <InputPrimitive id="query" name="query" />\n  <Action type="submit">Go</Action>\n</Group.Root>',
        preview: (
          <div className="project-preview">
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
        ),
      },
      {
        title: "Split action · popover and loading",
        usage:
          '<Popover.Root>\n  <Group.Root aria-label="Save actions">\n    <Action loading={loading}>Save</Action>\n    <Popover.Trigger render={<Action aria-label="More save actions" />}>⌄</Popover.Trigger>\n  </Group.Root>\n  <Popover.Portal>\n    <Popover.Positioner><Popover.Content>\n      <Popover.Title>Save options</Popover.Title>\n      <Popover.Close>Save a copy</Popover.Close>\n    </Popover.Content></Popover.Positioner>\n  </Popover.Portal>\n</Popover.Root>',
        preview: (
          <div className="project-preview">
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
        ),
      },
      {
        title: "Nested groups · consumer spacing and sizes",
        usage:
          '<Group.Root aria-label="History and formatting" className="flex-wrap gap-3">\n  <Group.Root aria-label="History"><Action compact>Undo</Action><Action compact>Redo</Action></Group.Root>\n  <Group.Root aria-label="Formatting"><Action compact>Bold</Action></Group.Root>\n</Group.Root>',
        preview: (
          <div className="project-preview">
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
        ),
      },
    ],
  };
}
