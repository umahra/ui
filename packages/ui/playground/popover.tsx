import { DirectionProvider } from "@base-ui/react/direction-provider";
import { cn } from "cn";
import { useRef, useState } from "react";

import { ButtonPrimitive as Button } from "../src/button";
import { DialogPrimitive as Dialog } from "../src/dialog";
import { Heading } from "../src/heading";
import { InputPrimitive } from "../src/input";
import { LabelPrimitive } from "../src/label";
import {
  PopoverPrimitive as Popover,
  type PopoverContentProps,
  type PopoverPositionerProps,
  type PopoverRootProps,
} from "../src/popover";

const buttonClasses =
  "rounded-md border border-input bg-background px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:opacity-50";

interface ConsumerPopoverProps extends PopoverContentProps {
  compact?: boolean;
}

function ConsumerPopover({
  compact,
  className,
  ...props
}: ConsumerPopoverProps) {
  return (
    <Popover.Content
      {...props}
      className={cn(
        "w-80 gap-4 rounded-lg border border-border bg-popover p-4 text-sm text-popover-foreground shadow-md data-starting-style:opacity-0 data-ending-style:opacity-0 transition-opacity motion-reduce:transition-none",
        compact && "w-56 gap-2 p-2",
        className,
      )}
    />
  );
}

export function PopoverExamples({ direction }: { direction: "ltr" | "rtl" }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<PopoverRootProps["modal"]>(false);
  const [preventOutside, setPreventOutside] = useState(false);
  const [events, setEvents] = useState("No popover events yet.");
  const [side, setSide] = useState<PopoverPositionerProps["side"]>("bottom");
  const [align, setAlign] = useState<PopoverPositionerProps["align"]>("start");
  const [long, setLong] = useState(false);
  const [customContainer, setCustomContainer] = useState(false);
  const [handle] = useState(() => Popover.createHandle<{ name: string }>());
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <DirectionProvider direction={direction}>
      <section
        id="popover"
        aria-labelledby="popover-title"
        className="component-section"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">15 / Overlays</p>
            <Heading as="h2" id="popover-title">
              Popover
            </Heading>
          </div>
          <code>PopoverPrimitive</code>
        </div>
        <p className="section-description">
          Explicit portals and positioning, optional semantic companions, and
          consumer-owned appearance.
        </p>
        <div className="examples-grid">
          <div className="example">
            <p className="example-label">Primitive · browser defaults</p>
            <div className="example-body flex flex-wrap items-start gap-3">
              <Popover.Root>
                <Popover.Trigger>Open plain popover</Popover.Trigger>
                <Popover.Portal>
                  <Popover.Positioner>
                    <Popover.Content aria-label="Plain popover">
                      <p>
                        Structural styles only. Header, Title and Description
                        are optional.
                      </p>
                      <Popover.Close>Close plain popover</Popover.Close>
                    </Popover.Content>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
              <Popover.Root>
                <Popover.Trigger disabled>
                  Disabled popover trigger
                </Popover.Trigger>
              </Popover.Root>
            </div>
          </div>
          <div className="example">
            <p className="example-label">
              Consumer wrapper · placement and scrolling
            </p>
            <div className="example-body space-y-4">
              <LabelPrimitive className="flex flex-col gap-2">
                Popover side
                <select
                  value={side}
                  onChange={(event) =>
                    setSide(
                      event.target.value as PopoverPositionerProps["side"],
                    )
                  }
                >
                  {(
                    [
                      "top",
                      "bottom",
                      "left",
                      "right",
                      "inline-start",
                      "inline-end",
                    ] as const
                  ).map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </LabelPrimitive>
              <LabelPrimitive className="flex flex-col gap-2">
                Popover alignment
                <select
                  value={align}
                  onChange={(event) =>
                    setAlign(
                      event.target.value as PopoverPositionerProps["align"],
                    )
                  }
                >
                  {(["start", "center", "end"] as const).map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </LabelPrimitive>
              <LabelPrimitive className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={long}
                  onChange={(event) => setLong(event.target.checked)}
                />{" "}
                Long popover content
              </LabelPrimitive>
              <LabelPrimitive className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={customContainer}
                  onChange={(event) => setCustomContainer(event.target.checked)}
                />{" "}
                Custom portal container
              </LabelPrimitive>
              <Popover.Root>
                <Popover.Trigger
                  render={<Button.Root />}
                  className={buttonClasses}
                >
                  Open styled popover
                </Popover.Trigger>
                <Popover.Portal
                  container={customContainer ? containerRef : undefined}
                  keepMounted
                >
                  <Popover.Positioner side={side} align={align} sideOffset={8}>
                    <ConsumerPopover>
                      <Popover.Header className="shrink-0 gap-1">
                        <Popover.Title className="font-semibold">
                          Display settings
                        </Popover.Title>
                        <Popover.Description className="text-muted-foreground">
                          Position and scroll this consumer wrapper.
                        </Popover.Description>
                      </Popover.Header>
                      <LabelPrimitive className="flex shrink-0 flex-col gap-2">
                        Display name
                        <InputPrimitive
                          defaultValue="Umahra"
                          className="rounded border border-input px-3 py-2"
                        />
                      </LabelPrimitive>
                      {long &&
                        Array.from({ length: 24 }, (_, index) => (
                          <p
                            key={`popover-row-${index + 1}`}
                            className="shrink-0"
                          >
                            Preference {index + 1}: scroll to the final close
                            control.
                          </p>
                        ))}
                      <Popover.Root>
                        <Popover.Trigger
                          className={cn(buttonClasses, "shrink-0")}
                        >
                          Open nested popover
                        </Popover.Trigger>
                        <Popover.Portal>
                          <Popover.Positioner side="inline-end" sideOffset={8}>
                            <ConsumerPopover compact>
                              <Popover.Title>Nested popover</Popover.Title>
                              <Popover.Close className={buttonClasses}>
                                Close nested popover
                              </Popover.Close>
                            </ConsumerPopover>
                          </Popover.Positioner>
                        </Popover.Portal>
                      </Popover.Root>
                      <Popover.Close className={cn(buttonClasses, "shrink-0")}>
                        Done with settings
                      </Popover.Close>
                    </ConsumerPopover>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
              <div ref={containerRef} data-popover-container="custom" />
            </div>
          </div>
          <div className="example">
            <p className="example-label">
              Controlled · focus, modes, cancellation and refs
            </p>
            <div className="example-body space-y-4">
              <LabelPrimitive className="flex flex-col gap-2">
                Popover mode
                <select
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
              <LabelPrimitive className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={preventOutside}
                  onChange={(event) => setPreventOutside(event.target.checked)}
                />{" "}
                Prevent outside dismissal
              </LabelPrimitive>
              <Popover.Root
                open={open}
                modal={mode}
                onOpenChange={(nextOpen, details) => {
                  if (preventOutside && details.reason === "outside-press") {
                    details.cancel();
                    setEvents("Outside dismissal cancelled");
                    return;
                  }
                  setOpen(nextOpen);
                  setEvents(
                    `${nextOpen ? "Open" : "Close"}: ${details.reason}`,
                  );
                }}
                onOpenChangeComplete={(nextOpen) => {
                  if (nextOpen && contentRef.current)
                    setEvents(
                      `Opened: ${contentRef.current.dataset.side}, ref attached`,
                    );
                }}
              >
                <Popover.Trigger className={buttonClasses}>
                  Open controlled popover
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Positioner sideOffset={8}>
                    <ConsumerPopover
                      ref={contentRef}
                      compact
                      initialFocus={inputRef}
                      style={(state) => ({
                        outlineStyle: state.open ? "solid" : undefined,
                      })}
                    >
                      <Popover.Title className="font-semibold">
                        Controlled popover
                      </Popover.Title>
                      <Popover.Description>
                        Focus starts in the input and returns to the trigger.
                      </Popover.Description>
                      <InputPrimitive
                        ref={inputRef}
                        aria-label="Initial popover focus"
                        defaultValue="Focused on open"
                        className="min-w-0 rounded border border-input px-2 py-1"
                      />
                      <Popover.Close className={buttonClasses}>
                        Close controlled popover
                      </Popover.Close>
                    </ConsumerPopover>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
              <output className="block text-sm text-muted-foreground">
                {events}
              </output>
            </div>
          </div>
          <div className="example">
            <p className="example-label">Detached triggers · typed payloads</p>
            <div className="example-body flex flex-wrap gap-2">
              {(["Activity", "Notifications"] as const).map((name) => (
                <Popover.Trigger
                  key={name}
                  id={`popover-${name}`}
                  handle={handle}
                  payload={{ name }}
                  className={buttonClasses}
                >
                  {name}
                </Popover.Trigger>
              ))}
              <Popover.Root handle={handle}>
                {({ payload }) => (
                  <Popover.Portal>
                    <Popover.Positioner sideOffset={8}>
                      <ConsumerPopover compact>
                        <Popover.Title>{payload?.name}</Popover.Title>
                        <Popover.Description>
                          Content follows the active detached trigger.
                        </Popover.Description>
                        <Popover.Close className={buttonClasses}>
                          Close detached popover
                        </Popover.Close>
                      </ConsumerPopover>
                    </Popover.Positioner>
                  </Popover.Portal>
                )}
              </Popover.Root>
            </div>
          </div>
          <div className="example">
            <p className="example-label">Composition · inside Dialog</p>
            <div className="example-body">
              <Dialog.Root>
                <Dialog.Trigger className={buttonClasses}>
                  Open popover dialog
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/30" />
                  <Dialog.Viewport>
                    <Dialog.Content className="max-w-md gap-4 rounded-xl border border-border bg-background p-6 text-foreground">
                      <Dialog.Title>Dialog with a popover</Dialog.Title>
                      <Dialog.Description>
                        Escape dismisses the innermost overlay first.
                      </Dialog.Description>
                      <Popover.Root>
                        <Popover.Trigger className={buttonClasses}>
                          Open dialog popover
                        </Popover.Trigger>
                        <Popover.Portal>
                          <Popover.Positioner sideOffset={8}>
                            <ConsumerPopover compact>
                              <Popover.Title>
                                Popover inside Dialog
                              </Popover.Title>
                              <Popover.Close className={buttonClasses}>
                                Close dialog popover
                              </Popover.Close>
                            </ConsumerPopover>
                          </Popover.Positioner>
                        </Popover.Portal>
                      </Popover.Root>
                      <Dialog.Close className={buttonClasses}>
                        Close popover dialog
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Viewport>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </section>
    </DirectionProvider>
  );
}
