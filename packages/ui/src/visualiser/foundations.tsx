import { useEffect, useRef, useState } from "react";
import { ButtonPrimitive as Button } from "../button";
import { cn } from "../cn";
import { Heading } from "../heading";
import { Text } from "../text";
import { chrome, focus, mono, PageHeader } from "./documentation";
import { useEffectiveStyles } from "./effective-styles";
import type { DesignSystemColor, DesignSystemTypography } from "./types";

function TokenDetails({
  name,
  variable,
  value,
}: {
  name: string;
  variable: string;
  value?: string;
}) {
  return (
    <div className={cn(chrome, "vis-token-details")}>
      <div className="mt-[10px] flex flex-wrap items-baseline justify-between gap-[5px]">
        <Heading as="h4" className={cn(chrome, "text-[12px] font-[550]")}>
          {name}
        </Heading>
        <code className={cn(mono, "text-[9px] text-(--vis-muted)")}>
          {variable}
        </code>
      </div>
      <p
        className={cn(
          mono,
          "vis-token-value mt-[3px] text-[10px] leading-[1.7]",
        )}
      >
        {value ?? "Measuring…"}
      </p>
    </div>
  );
}

function TypeDetails({ values }: { values?: Record<string, string> }) {
  return (
    <dl
      className={cn(
        chrome,
        "vis-values mt-[12px] flex flex-wrap gap-x-[20px] gap-y-[12px]",
      )}
    >
      {Object.entries(typeProperties).map(([property, label]) => (
        <div
          key={property}
          className={cn(
            "flex items-baseline gap-[6px]",
            property === "font-family" && "max-[560px]:basis-full",
          )}
        >
          <dt className="text-[11px] text-(--vis-muted)">{label}:</dt>
          <dd
            className={cn(
              mono,
              "m-0 text-[10px] leading-[1.7] wrap-anywhere",
              property === "font-family" && "max-w-[180px] truncate",
            )}
            title={property === "font-family" ? values?.[property] : undefined}
          >
            {values?.[property] ?? "Measuring…"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

const colorGroups = [
  {
    title: "Surfaces & content",
    tokens: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "muted",
      "muted-foreground",
    ],
  },
  {
    title: "Actions & emphasis",
    tokens: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "accent",
      "accent-foreground",
      "destructive",
      "destructive-foreground",
      "border",
      "input",
      "ring",
    ],
  },
  {
    title: "Charts",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
  {
    title: "Sidebar",
    tokens: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ],
  },
];

export function Colors({ colors }: { colors: readonly DesignSystemColor[] }) {
  const groups = [
    ...colorGroups.map((group) => ({
      title: group.title,
      colors: group.tokens.map((token) => ({
        name: token,
        variable: `--${token}`,
      })),
    })),
    ...(colors.length ? [{ title: "Custom", colors }] : []),
  ];
  const scope = useRef<HTMLDivElement>(null);
  const values = useEffectiveStyles(scope);
  const [copyStatus, setCopyStatus] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const copyTimeout = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);
  async function copyColor(token: string) {
    const value = values[token]?.declared;
    if (
      !value ||
      values[token]?.["background-color"] === "Missing / unresolved"
    )
      return;
    try {
      await navigator.clipboard.writeText(value);
      window.clearTimeout(copyTimeout.current);
      setCopied(token);
      setCopyStatus(`Copied ${token}: ${value}`);
      copyTimeout.current = window.setTimeout(() => {
        setCopied(null);
        setCopyStatus("");
      }, 1500);
    } catch {
      window.clearTimeout(copyTimeout.current);
      setCopied(null);
      setCopyStatus(
        "Could not copy. Select and copy the value below the swatch.",
      );
    }
  }
  return (
    <section ref={scope}>
      <PageHeader
        id="colors-title"
        title="Colors"
        description="Semantic colors for surfaces, text, actions and charts."
      />
      <output
        className={cn(
          chrome,
          "vis-copy-status mb-[16px] block empty:hidden",
          copied && "sr-only",
        )}
      >
        {copyStatus}
      </output>
      {groups.map((group) => (
        <section className="vis-foundation-section" key={group.title}>
          <Heading
            as="h3"
            className={cn(
              chrome,
              "mt-[36px] mb-[22px] text-[20px] font-[550] tracking-[-0.5px]",
            )}
          >
            {group.title}
          </Heading>
          <div className="vis-token-grid grid grid-cols-3 gap-x-[16px] gap-y-[24px] min-[1600px]:grid-cols-6 max-[560px]:grid-cols-2 max-[560px]:gap-x-[12px] max-[560px]:gap-y-[20px]">
            {group.colors.map(({ name, variable }) => {
              const token = variable.slice(2);
              return (
                <article className="vis-token min-w-0" key={token}>
                  <div className="project-preview min-w-0 bg-background wrap-anywhere">
                    <Button.Root
                      className={cn(
                        focus,
                        "vis-swatch relative block h-[157px] w-full cursor-pointer rounded-[6px] border border-(--vis-line) disabled:cursor-default enabled:hover:[&_.vis-copy-feedback]:opacity-100 enabled:focus-visible:[&_.vis-copy-feedback]:opacity-100 max-[560px]:h-[120px]",
                      )}
                      data-measure={token}
                      data-properties="background-color"
                      data-token={variable}
                      style={{ backgroundColor: `var(${variable})` }}
                      aria-label={`Copy ${name} color value`}
                      disabled={
                        !values[token]?.declared ||
                        values[token]?.["background-color"] ===
                          "Missing / unresolved"
                      }
                      onClick={() => void copyColor(token)}
                    >
                      <span
                        className={cn(
                          chrome,
                          "vis-copy-feedback inline-flex items-center justify-center rounded-[4px] bg-(--vis-surface) p-[8px] text-(--vis-ink) opacity-0 data-copied:opacity-100",
                        )}
                        data-copied={copied === token ? "" : undefined}
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {copied === token ? (
                            <path d="m5 12 4 4L19 6" />
                          ) : (
                            <>
                              <rect x="8" y="8" width="12" height="12" rx="2" />
                              <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                            </>
                          )}
                        </svg>
                      </span>
                    </Button.Root>
                  </div>
                  <TokenDetails
                    name={name}
                    variable={variable}
                    value={
                      values[token]?.["background-color"] ===
                      "Missing / unresolved"
                        ? "Missing / unresolved"
                        : values[token]?.declared
                    }
                  />
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}

const typeProperties = {
  "font-family": "Family",
  "font-size": "Size",
  "font-weight": "Weight",
  "line-height": "Line height",
};
export function Typography({
  typography,
}: {
  typography: readonly DesignSystemTypography[];
}) {
  const scope = useRef<HTMLDivElement>(null);
  const values = useEffectiveStyles(scope);
  return (
    <section ref={scope}>
      <PageHeader
        id="typography-title"
        title="Fonts & Typography"
        description="Heading and body text styles."
      />
      <div className="vis-specimens border-t border-(--vis-line)">
        {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((tag) => (
          <article
            className="vis-specimen min-w-0 border-b border-(--vis-line) py-[24px]"
            key={tag}
          >
            <div className="project-preview min-w-0 bg-background wrap-anywhere">
              <Heading
                as={tag}
                data-measure={tag}
                data-properties={Object.keys(typeProperties).join(",")}
              >
                Heading {tag.slice(1)}
              </Heading>
            </div>
            <TypeDetails values={values[tag]} />
          </article>
        ))}
        <article className="vis-specimen min-w-0 border-b border-(--vis-line) py-[24px]">
          <div className="project-preview min-w-0 bg-background wrap-anywhere">
            <Text
              data-measure="body"
              data-properties={Object.keys(typeProperties).join(",")}
            >
              Body text
            </Text>
          </div>
          <TypeDetails values={values.body} />
        </article>
        {typography.map((entry, index) => (
          <article
            className="vis-specimen min-w-0 border-b border-(--vis-line) py-[24px]"
            key={entry.name}
          >
            <div className="project-preview min-w-0 bg-background wrap-anywhere">
              <p
                className={entry.className}
                data-measure={`custom-type-${index}`}
                data-properties={Object.keys(typeProperties).join(",")}
              >
                {entry.name}
              </p>
            </div>
            <TypeDetails values={values[`custom-type-${index}`]} />
          </article>
        ))}
      </div>
    </section>
  );
}
