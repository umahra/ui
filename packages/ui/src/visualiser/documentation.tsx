import { Tabs } from "@base-ui/react/tabs";
import { createContext, useContext } from "react";
import { ButtonPrimitive as Button } from "../button";
import { cn } from "../cn";
import { Heading } from "../heading";
import { Text } from "../text";
import type { DesignSystemExample } from "./types";

export const SectionNumber = createContext("01");
export const chrome =
  "font-(family-name:--vis-font) text-[13px] leading-[1.7] font-normal tracking-normal text-(--vis-ink) wrap-anywhere";
export const mono =
  "font-(family-name:--vis-mono) text-[11px] leading-[1.9] font-normal tracking-normal";
export const focus =
  "focus-visible:outline-solid focus-visible:outline-[2px] focus-visible:outline-offset-[3px] focus-visible:outline-(--vis-ink)";

function Usage({ children }: { children: string }) {
  return (
    <div
      className={cn(
        chrome,
        "vis-usage rounded-b-[8px] bg-[#1d1d1f] text-[#e6e6e6]",
      )}
    >
      <p
        className={cn(
          mono,
          "border-b border-white/15 px-[18px] py-[12px] text-[9px] leading-[1.6] tracking-[0.6px] text-[#bcbcbc] uppercase",
        )}
      >
        Usage
      </p>
      <pre
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Scrollable usage code needs keyboard access.
        tabIndex={0}
        className={cn(
          mono,
          focus,
          "m-0 max-w-full overflow-x-auto p-[22px] whitespace-pre [tab-size:2] focus-visible:-outline-offset-[3px] focus-visible:outline-[#e0ff63]",
        )}
      >
        <code className="font-[inherit] text-[inherit]">{children}</code>
      </pre>
    </div>
  );
}

export function PageHeader({
  id,
  title,
  description,
  importCode,
  group = "Foundations",
}: {
  id: string;
  title: string;
  description: string;
  importCode?: string;
  group?: "Foundations" | "Components";
}) {
  const number = useContext(SectionNumber);
  return (
    <header className={cn(chrome, "vis-page-header mb-[32px]")}>
      <Text
        className={cn(
          chrome,
          "mb-[17px] flex items-center gap-[10px] text-[10px] tracking-[1.15px] text-(--vis-muted) uppercase",
        )}
      >
        <span
          className={cn(
            mono,
            "border-e border-(--vis-line) pe-[10px] text-[9px] leading-[1.6]",
          )}
        >
          {number}
        </span>{" "}
        {group}
      </Text>
      <Heading
        as="h2"
        id={id}
        className={cn(
          chrome,
          "vis-title text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.05em] max-[560px]:text-[29px]",
        )}
      >
        {title}
      </Heading>
      <Text
        className={cn(chrome, "mt-[15px] max-w-[620px] text-(--vis-muted)")}
      >
        {description}
      </Text>
      {importCode && (
        <pre
          // biome-ignore lint/a11y/noNoninteractiveTabindex: Scrollable import code needs keyboard access.
          tabIndex={0}
          className={cn(
            mono,
            focus,
            "mt-[22px] max-w-full overflow-x-auto rounded-[6px] border border-(--vis-line) bg-(--vis-surface) px-[18px] py-[14px] whitespace-pre",
          )}
        >
          <code className="font-[inherit] text-[inherit]">{importCode}</code>
        </pre>
      )}
    </header>
  );
}

export function ComponentBlock({ title, preview, usage }: DesignSystemExample) {
  const tab = cn(
    mono,
    focus,
    "cursor-pointer rounded-[3px] border-0 bg-transparent px-[11px] py-[5px] text-[11px] leading-[1.5] text-(--vis-muted) data-active:bg-(--vis-ink) data-active:text-(--vis-surface)",
  );
  return (
    <section
      className="example min-w-0 rounded-[8px] border border-(--vis-line) wrap-anywhere"
      aria-label={title}
    >
      <Tabs.Root defaultValue="preview">
        <div
          className={cn(
            chrome,
            "flex items-center justify-between gap-[16px] rounded-t-[8px] border-b border-(--vis-line) bg-(--vis-surface) px-[18px] py-[12px] max-[560px]:gap-[10px] max-[560px]:px-[14px] max-[560px]:py-[10px]",
          )}
        >
          <Heading
            as="h3"
            className={cn(
              mono,
              "text-[10px] leading-[1.6] text-(--vis-muted) max-[560px]:text-[9px]",
            )}
          >
            {title}
          </Heading>
          <Tabs.List
            activateOnFocus
            aria-label={`${title} view`}
            className="vis-example-tabs flex shrink-0 gap-[3px] rounded-[5px] bg-[color-mix(in_srgb,var(--vis-ink)_5%,transparent)] p-[3px]"
          >
            <Tabs.Tab value="preview" className={tab} render={<Button.Root />}>
              Preview
            </Tabs.Tab>
            <Tabs.Tab value="code" className={tab} render={<Button.Root />}>
              Code
            </Tabs.Tab>
          </Tabs.List>
        </div>
        <Tabs.Panel
          value="preview"
          keepMounted
          className={cn(focus, "vis-preview-panel")}
        >
          <div className="example-body project-preview min-w-0 max-w-full overflow-x-auto rounded-b-[8px] bg-background p-[30px] wrap-anywhere max-[560px]:px-[18px] max-[560px]:py-[24px]">
            {preview}
          </div>
        </Tabs.Panel>
        <Tabs.Panel
          value="code"
          keepMounted
          className={cn(focus, "vis-code-panel")}
        >
          <Usage>{usage}</Usage>
        </Tabs.Panel>
      </Tabs.Root>
    </section>
  );
}
