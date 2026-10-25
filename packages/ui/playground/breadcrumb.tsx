import { cn } from "cn";
import { type ComponentPropsWithRef, useRef, useState } from "react";

import {
  BreadcrumbPrimitive as Breadcrumb,
  type BreadcrumbLinkProps,
  type BreadcrumbListProps,
} from "../src/breadcrumb";
import { Heading } from "../src/heading";

function ConsumerList({ className, ...props }: BreadcrumbListProps) {
  return (
    <Breadcrumb.List
      {...props}
      className={cn("gap-2 text-sm text-muted-foreground", className)}
    />
  );
}

function ConsumerLink({ className, ...props }: BreadcrumbLinkProps) {
  return (
    <Breadcrumb.Link
      {...props}
      className={cn(
        "rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    />
  );
}

function RouterLink(props: ComponentPropsWithRef<"a">) {
  return <a {...props} data-router-link="" />;
}

export function BreadcrumbExamples() {
  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState("No composed link events yet.");
  const [routerClicks, setRouterClicks] = useState(0);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const renderRef = useRef<HTMLAnchorElement>(null);

  return (
    <section
      id="breadcrumb"
      aria-labelledby="breadcrumb-title"
      className="component-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">18 / Navigation</p>
          <Heading as="h2" id="breadcrumb-title">
            Breadcrumb
          </Heading>
        </div>
        <code>BreadcrumbPrimitive</code>
      </div>
      <p className="section-description">
        Native navigation and current-page semantics, optional decorative parts,
        and consumer-owned links, spacing and collapsed routes.
      </p>
      <div className="examples-grid">
        <div className="example">
          <p className="example-label">Primitive · structural styles only</p>
          <div className="example-body space-y-4">
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#top">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>/</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="#breadcrumb">
                    Components
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>/</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
            <Breadcrumb.Root aria-label="Current page only">
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Page>Overview</Breadcrumb.Page>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </div>
        </div>
        <div className="example">
          <p className="example-label">Consumer wrapper · router composition</p>
          <div className="example-body space-y-4">
            <Breadcrumb.Root aria-label="Router breadcrumb">
              <ConsumerList>
                <Breadcrumb.Item>
                  <ConsumerLink
                    ref={linkRef}
                    href="#breadcrumb"
                    style={{ textUnderlineOffset: "4px" }}
                    render={
                      <RouterLink
                        ref={renderRef}
                        className="underline"
                        style={{ textDecorationThickness: "2px" }}
                        onClick={() => setRouterClicks((count) => count + 1)}
                      />
                    }
                    onFocus={() => setEvents("Composed link focused.")}
                    onClick={(event) => {
                      event.preventDefault();
                      setEvents(
                        `Primitive click · merged refs: ${linkRef.current === renderRef.current && linkRef.current === event.currentTarget}`,
                      );
                    }}
                  >
                    Router home
                  </ConsumerLink>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>·</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <ConsumerLink
                    href="#breadcrumb"
                    render={(props) => <a {...props} data-render-callback="" />}
                  >
                    Render callback
                  </ConsumerLink>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>·</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Page className="font-medium text-foreground">
                    Composition
                  </Breadcrumb.Page>
                </Breadcrumb.Item>
              </ConsumerList>
            </Breadcrumb.Root>
            <output className="block text-sm text-muted-foreground">
              {events} Router clicks: {routerClicks}
            </output>
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Consumer wrapper · long labels and RTL
          </p>
          <div className="example-body">
            <Breadcrumb.Root aria-label="Long breadcrumb">
              <ConsumerList className="gap-x-3 gap-y-2">
                <Breadcrumb.Item>
                  <ConsumerLink href="#breadcrumb">Documentation</ConsumerLink>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>
                  <span className="inline-block rtl:rotate-180">→</span>
                </Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <ConsumerLink href="#breadcrumb">
                    Building accessible navigation for every screen size
                  </ConsumerLink>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>
                  <span className="inline-block rtl:rotate-180">→</span>
                </Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Page className="text-foreground">
                    SupercalifragilisticexpialidociousUnbrokenResourceName
                  </Breadcrumb.Page>
                </Breadcrumb.Item>
              </ConsumerList>
            </Breadcrumb.Root>
          </div>
        </div>
        <div className="example">
          <p className="example-label">
            Consumer wrapper · optional disclosure
          </p>
          <div className="example-body">
            <Breadcrumb.Root aria-label="Collapsed breadcrumb">
              <ConsumerList>
                <Breadcrumb.Item>
                  <ConsumerLink href="#breadcrumb">Home</ConsumerLink>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>/</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <button
                    type="button"
                    aria-label={expanded ? "Hide ancestors" : "Show ancestors"}
                    aria-expanded={expanded}
                    onClick={() => setExpanded(!expanded)}
                    className="rounded border border-border px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <Breadcrumb.Ellipsis className="size-4">
                      {expanded ? "−" : "…"}
                    </Breadcrumb.Ellipsis>
                  </button>
                </Breadcrumb.Item>
                {expanded && (
                  <>
                    <Breadcrumb.Separator>/</Breadcrumb.Separator>
                    <Breadcrumb.Item>
                      <ConsumerLink href="#breadcrumb">
                        Documentation
                      </ConsumerLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator>/</Breadcrumb.Separator>
                    <Breadcrumb.Item>
                      <ConsumerLink href="#breadcrumb">Components</ConsumerLink>
                    </Breadcrumb.Item>
                  </>
                )}
                <Breadcrumb.Separator>/</Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <Breadcrumb.Page className="text-foreground">
                    Breadcrumb
                  </Breadcrumb.Page>
                </Breadcrumb.Item>
              </ConsumerList>
            </Breadcrumb.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
