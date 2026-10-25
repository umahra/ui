import { type ReactNode, useRef, useState } from "react";

import { ButtonPrimitive as Button } from "../src/button";
import { Heading } from "../src/heading";
import { InputPrimitive } from "../src/input";
import { LabelPrimitive } from "../src/label";
import { SheetPrimitive as Sheet, type SheetContentProps } from "../src/sheet";
import { Text } from "../src/text";

const buttonClasses =
  "rounded-md border border-input bg-background px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:opacity-50";

interface ConsumerSheetProps extends SheetContentProps {
  children: ReactNode;
}

function ConsumerSheet({ children, className, ...props }: ConsumerSheetProps) {
  return (
    <Sheet.Portal>
      <Sheet.Overlay className="bg-black/40" />
      <Sheet.Content
        {...props}
        className={`w-full max-w-md gap-5 border border-border bg-background p-6 text-foreground shadow-xl ${className ?? ""}`}
      >
        {children}
      </Sheet.Content>
    </Sheet.Portal>
  );
}

export function SheetExamples() {
  const [longContent, setLongContent] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<true | false | "trap-focus">(false);
  const [outsideClicks, setOutsideClicks] = useState(0);
  const [events, setEvents] = useState("No Sheet events yet.");
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="sheet"
      aria-labelledby="sheet-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">11 / Overlays</p>
          <Heading as="h2" id="sheet-title">
            Sheet
          </Heading>
        </div>
        <code>SheetPrimitive</code>
      </div>
      <Text className="section-description">
        Four physical edges, explicit portal and overlay, and consumer-owned
        panel sizes. Compare focus, scrolling, and optional composition.
      </Text>
      <div className="examples-grid">
        <div className="example">
          <p className="example-label">
            Primitive · no overlay or layout companions
          </p>
          <div className="example-body">
            <Sheet.Root>
              <Sheet.Trigger>Open plain sheet</Sheet.Trigger>
              <Sheet.Portal>
                <Sheet.Content>
                  <Sheet.Title>Plain sheet</Sheet.Title>
                  <p>Browser appearance with structural positioning only.</p>
                  <Sheet.Close>Close plain sheet</Sheet.Close>
                </Sheet.Content>
              </Sheet.Portal>
            </Sheet.Root>
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Consumer wrapper · every edge and long content
          </p>
          <div className="example-body space-y-4">
            <div className="flex flex-wrap gap-2">
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <Sheet.Root key={side}>
                  <Sheet.Trigger
                    render={<Button.Root />}
                    className={buttonClasses}
                  >
                    Open {side} sheet
                  </Sheet.Trigger>
                  <ConsumerSheet
                    side={side}
                    className={
                      side === "top" || side === "bottom"
                        ? "max-w-none"
                        : undefined
                    }
                  >
                    <Sheet.Header className="gap-2">
                      <Sheet.Title className="text-xl font-semibold">
                        Settings · {side}
                      </Sheet.Title>
                      <Sheet.Description className="text-sm text-muted-foreground">
                        The wrapper owns this panel’s width, spacing, and
                        appearance.
                      </Sheet.Description>
                    </Sheet.Header>
                    <LabelPrimitive className="flex shrink-0 flex-col gap-2 text-sm">
                      Project name
                      <InputPrimitive
                        defaultValue="Umahra UI"
                        className="rounded-md border border-input bg-background px-3 py-2"
                      />
                    </LabelPrimitive>
                    {longContent &&
                      Array.from({ length: 20 }, (_, index) => (
                        <p
                          key={`sheet-section-${index + 1}`}
                          className="shrink-0 text-sm text-muted-foreground"
                        >
                          Section {index + 1}. Scroll inside the sheet to reach
                          the footer. The document stays locked while this modal
                          is open.
                        </p>
                      ))}
                    <Sheet.Footer className="mt-auto gap-2">
                      <Sheet.Root>
                        <Sheet.Trigger className={buttonClasses}>
                          Open nested sheet
                        </Sheet.Trigger>
                        <ConsumerSheet side="bottom" className="max-w-none">
                          <Sheet.Title className="font-semibold">
                            Nested sheet
                          </Sheet.Title>
                          <Sheet.Description>
                            Escape closes this sheet first.
                          </Sheet.Description>
                          <Sheet.Close className={buttonClasses}>
                            Close nested sheet
                          </Sheet.Close>
                        </ConsumerSheet>
                      </Sheet.Root>
                      <Sheet.Close className={buttonClasses}>
                        Close {side} sheet
                      </Sheet.Close>
                    </Sheet.Footer>
                  </ConsumerSheet>
                </Sheet.Root>
              ))}
            </div>
            <LabelPrimitive className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={longContent}
                onChange={(event) => setLongContent(event.target.checked)}
              />
              Long sheet content
            </LabelPrimitive>
            <Sheet.Root>
              <Sheet.Trigger disabled className={buttonClasses}>
                Disabled sheet trigger
              </Sheet.Trigger>
            </Sheet.Root>
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Controlled · modal modes, refs and events
          </p>
          <div className="example-body space-y-4">
            <LabelPrimitive className="flex flex-col gap-2 text-sm">
              Sheet mode
              <select
                className="rounded-md border border-input bg-background px-3 py-2"
                value={String(mode)}
                onChange={(event) =>
                  setMode(
                    event.target.value === "true"
                      ? true
                      : event.target.value === "false"
                        ? false
                        : "trap-focus",
                  )
                }
              >
                <option value="false">Nonmodal</option>
                <option value="true">Modal</option>
                <option value="trap-focus">Trap focus only</option>
              </select>
            </LabelPrimitive>
            <Sheet.Root
              open={open}
              modal={mode}
              disablePointerDismissal
              onOpenChange={(nextOpen, details) => {
                setOpen(nextOpen);
                setEvents(`${nextOpen ? "Open" : "Close"}: ${details.reason}`);
              }}
              onOpenChangeComplete={(nextOpen) => {
                if (nextOpen && contentRef.current)
                  setEvents(
                    `Opened: ${contentRef.current.dataset.side}, ref attached`,
                  );
              }}
            >
              <Sheet.Trigger className={buttonClasses}>
                Open controlled sheet
              </Sheet.Trigger>
              <Sheet.Portal>
                <Sheet.Overlay className="bg-black/10" />
                <Sheet.Content
                  ref={contentRef}
                  side="left"
                  initialFocus={inputRef}
                  className="w-72 gap-4 border-e border-border bg-background p-5 text-foreground"
                  style={(state) => ({ opacity: state.open ? 1 : undefined })}
                >
                  <Sheet.Title className="font-semibold">
                    Controlled sheet
                  </Sheet.Title>
                  <Sheet.Description className="text-sm text-muted-foreground">
                    Outside presses stay open. Modal locks page scrolling;
                    nonmodal and trap-focus leave outside pointer controls
                    reachable.
                  </Sheet.Description>
                  <InputPrimitive
                    ref={inputRef}
                    aria-label="Initial sheet focus"
                    defaultValue="Focused on open"
                    className="rounded-md border border-input px-3 py-2"
                  />
                  <Sheet.Close className={buttonClasses}>
                    Close controlled sheet
                  </Sheet.Close>
                </Sheet.Content>
              </Sheet.Portal>
            </Sheet.Root>
            <Button.Root
              className={buttonClasses}
              onClick={() => setOutsideClicks(outsideClicks + 1)}
            >
              Outside sheet counter: {outsideClicks}
            </Button.Root>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {events}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
