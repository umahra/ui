import { useRef, useState } from "react";
import {
  AccordionPrimitive as Accordion,
  type AccordionTriggerProps,
} from "../src/accordion";
import { ButtonPrimitive as Button } from "../src/button";
import { cn } from "../src/cn";
import { LabelPrimitive as Label } from "../src/label";
import type { DesignSystemComponent } from "../src/visualiser";

const buttonClasses =
  "rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";
const contentClasses =
  "h-(--accordion-panel-height) transition-[height] duration-200 data-[starting-style]:h-0 data-[ending-style]:h-0 motion-reduce:transition-none";

interface ConsumerTriggerProps extends AccordionTriggerProps {
  compact?: boolean;
}

function AccordionTrigger({
  compact,
  className,
  children,
  ...props
}: ConsumerTriggerProps) {
  return (
    <Accordion.Trigger
      {...props}
      className={cn(
        "group gap-3 rounded-sm px-1 py-4 text-sm font-medium hover:underline focus-visible:outline-ring data-disabled:opacity-50",
        compact && "py-2",
        className,
      )}
    >
      {children}
      <span aria-hidden="true" className="shrink-0 group-aria-expanded:hidden">
        +
      </span>
      <span
        aria-hidden="true"
        className="hidden shrink-0 group-aria-expanded:inline"
      >
        −
      </span>
    </Accordion.Trigger>
  );
}

export function useAccordionExamples(): DesignSystemComponent {
  const [value, setValue] = useState<number[]>([1]);
  const [multiple, setMultiple] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [eventInfo, setEventInfo] = useState("No accordion change yet.");
  const [refs, setRefs] = useState(
    "Inspect all five refs and focus the first trigger.",
  );
  const [extra, setExtra] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return {
    id: "accordion",
    name: "Accordion",
    description: "Sections that expand to reveal more content.",
    importCode:
      'import { AccordionPrimitive as Accordion } from "@umahra/ui/accordion";',
    examples: [
      {
        title: "Primitive · single item, no icons",
        usage:
          '<Accordion.Root defaultValue={["first"]}>\n  <Accordion.Item value="first">\n    <Accordion.Header><Accordion.Trigger>Question</Accordion.Trigger></Accordion.Header>\n    <Accordion.Content>Answer</Accordion.Content>\n  </Accordion.Item>\n</Accordion.Root>',
        preview: (
          <div className="space-y-4">
            <Accordion.Root defaultValue={["first"]}>
              <Accordion.Item value="first">
                <Accordion.Header>
                  <Accordion.Trigger>
                    First primitive question
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  Plain content with browser typography.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="disabled" disabled>
                <Accordion.Header>
                  <Accordion.Trigger>
                    Disabled primitive question
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  This item cannot be opened.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="last">
                <Accordion.Header>
                  <Accordion.Trigger>Last primitive question</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <a
                    href="#accordion"
                    className="underline focus-visible:outline-2"
                  >
                    Focusable answer link
                  </a>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
            <p className="text-sm text-muted-foreground">
              Opening another item closes the first. Closing the open item
              leaves all items collapsed.
            </p>
          </div>
        ),
      },
      {
        title: "Consumer wrapper · typed state, events, refs and motion",
        usage:
          "<Accordion.Root value={value} onValueChange={onValueChange}\n  multiple={multiple} disabled={disabled}>\n  <Accordion.Item value={1}>\n    <Accordion.Header><Trigger>Question</Trigger></Accordion.Header>\n    <Accordion.Content className={panelClasses}>Answer</Accordion.Content>\n  </Accordion.Item>\n</Accordion.Root>",
        preview: (
          <div className="space-y-4">
            <Accordion.Root
              ref={rootRef}
              value={value}
              multiple={multiple}
              disabled={disabled}
              onValueChange={(next, details) => {
                if (cancel) details.cancel();
                else setValue(next);
                setEventInfo(
                  `${details.reason}: [${next.join(", ")}]${details.isCanceled ? " (canceled)" : ""}`,
                );
              }}
            >
              {[1, 2, 3].map((number) => (
                <Accordion.Item
                  key={number}
                  value={number}
                  ref={number === 1 ? itemRef : undefined}
                  className="not-last:border-b"
                >
                  <Accordion.Header
                    ref={number === 1 ? headerRef : undefined}
                    render={(props) => <h4 {...props} />}
                  >
                    <AccordionTrigger
                      ref={number === 1 ? triggerRef : undefined}
                      compact={number === 3}
                      render={(props, state) => (
                        <button
                          {...props}
                          data-consumer-state={
                            state.open ? "expanded" : "collapsed"
                          }
                        />
                      )}
                      style={(state) => ({
                        cursor: state.disabled ? "not-allowed" : "pointer",
                      })}
                    >
                      Question {number}
                    </AccordionTrigger>
                  </Accordion.Header>
                  <Accordion.Content
                    ref={number === 1 ? contentRef : undefined}
                    className={contentClasses}
                    style={(state) => ({
                      fontStyle: state.open ? "normal" : "italic",
                    })}
                  >
                    <div className="space-y-3 px-1 pb-4 text-sm text-muted-foreground">
                      <p>
                        Answer {number}. The icon and height transition belong
                        to this wrapper.
                      </p>
                      <a
                        href="#accordion"
                        className="inline-block underline focus-visible:outline-2"
                      >
                        Answer {number} link
                      </a>
                      {number === 1 && (
                        <>
                          <Button.Root
                            className={buttonClasses}
                            onClick={() => setExtra(!extra)}
                          >
                            Toggle additional answer
                          </Button.Root>
                          {extra && (
                            <p>
                              Additional content grows the open panel without a
                              fixed height.
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
            <div className="flex flex-wrap gap-3 text-sm">
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={multiple}
                  onChange={(event) => {
                    setMultiple(event.target.checked);
                    setValue((current) => current.slice(0, 1));
                  }}
                />
                Allow multiple answers
              </Label>
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={cancel}
                  onChange={(event) => setCancel(event.target.checked)}
                />
                Cancel accordion changes
              </Label>
              <Label className="gap-2">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(event) => setDisabled(event.target.checked)}
                />
                Disable accordion
              </Label>
            </div>
            <p className="text-sm" aria-live="polite">
              Expanded: [{value.join(", ")}]. {eventInfo}
            </p>
            <Button.Root
              className={buttonClasses}
              onClick={() => {
                setRefs(
                  `Root: ${rootRef.current?.tagName}; item: ${itemRef.current?.tagName}; header: ${headerRef.current?.tagName}; trigger: ${triggerRef.current?.tagName}; content: ${contentRef.current?.tagName ?? "unmounted"}`,
                );
                triggerRef.current?.focus();
              }}
            >
              Inspect accordion refs
            </Button.Root>
            <p className="text-sm" aria-live="polite">
              {refs}
            </p>
          </div>
        ),
      },
      {
        title: "Mounting · preserve an answer draft",
        usage:
          '<Accordion.Content keepMounted>\n  <textarea aria-label="Answer draft" />\n</Accordion.Content>',
        preview: (
          <div className="space-y-4">
            <Accordion.Root keepMounted>
              <Accordion.Item value="draft">
                <Accordion.Header>
                  <AccordionTrigger>Retained answer draft</AccordionTrigger>
                </Accordion.Header>
                <Accordion.Content>
                  <div className="space-y-2 p-1">
                    <Label htmlFor="accordion-draft">Draft</Label>
                    <input
                      id="accordion-draft"
                      className="w-full rounded border border-input px-3 py-2 text-sm focus-visible:outline-2"
                      placeholder="Type, close, and reopen"
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
            <p className="text-sm text-muted-foreground">
              Closed content remains mounted and its controls leave the tab
              order.
            </p>
          </div>
        ),
      },
      {
        title: "Browser search · hidden until found",
        usage:
          '<Accordion.Root hiddenUntilFound>\n  <Accordion.Item value="searchable">\n    <Accordion.Header><Accordion.Trigger>Question</Accordion.Trigger></Accordion.Header>\n    <Accordion.Content>Searchable answer</Accordion.Content>\n  </Accordion.Item>\n</Accordion.Root>',
        preview: (
          <div className="space-y-4">
            <Accordion.Root hiddenUntilFound>
              <Accordion.Item value="search">
                <Accordion.Header>
                  <AccordionTrigger>
                    Searchable shipping answer
                  </AccordionTrigger>
                </Accordion.Header>
                <Accordion.Content className="text-sm">
                  <p className="p-1">The delivery code is orchid-parcel-42.</p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
            <p className="text-sm text-muted-foreground">
              Use browser Find to search for the delivery code. Supporting
              browsers reveal this answer automatically.
            </p>
          </div>
        ),
      },
      {
        title: "Nested accordions · independent state",
        usage:
          '<Accordion.Content>\n  <Accordion.Root>\n    <Accordion.Item value="nested">\n      <Accordion.Header><Accordion.Trigger>Nested question</Accordion.Trigger></Accordion.Header>\n      <Accordion.Content>Independent answer</Accordion.Content>\n    </Accordion.Item>\n  </Accordion.Root>\n</Accordion.Content>',
        preview: (
          <div className="space-y-4">
            <Accordion.Root defaultValue={["outer"]}>
              <Accordion.Item value="outer">
                <Accordion.Header>
                  <AccordionTrigger>Outer question</AccordionTrigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-visible">
                  <div className="ps-4">
                    <Accordion.Root>
                      <Accordion.Item value="inner">
                        <Accordion.Header render={(props) => <h4 {...props} />}>
                          <AccordionTrigger compact>
                            Inner question
                          </AccordionTrigger>
                        </Accordion.Header>
                        <Accordion.Content className="text-sm">
                          The inner accordion opens independently.
                        </Accordion.Content>
                      </Accordion.Item>
                    </Accordion.Root>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        ),
      },
    ],
  };
}
