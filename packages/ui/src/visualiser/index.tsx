"use client";

import { DirectionProvider } from "@base-ui/react/direction-provider";
import { useEffect, useRef, useState } from "react";
import { version as packageVersion } from "../../package.json";
import { cn } from "../cn";
import { Heading } from "../heading";
import { useEffectiveDirection } from "./direction";
import {
  ComponentBlock,
  chrome,
  focus,
  mono,
  PageHeader,
  SectionNumber,
} from "./documentation";
import { Colors, Typography } from "./foundations";
import type { DesignSystemProps } from "./types";

export type {
  DesignSystemColor,
  DesignSystemComponent,
  DesignSystemExample,
  DesignSystemProps,
  DesignSystemTypography,
} from "./types";

export function DesignSystem({
  components,
  colors = [],
  typography = [],
}: DesignSystemProps) {
  const ids = new Set([
    "colors",
    "colors-title",
    "typography",
    "typography-title",
    "vis-main",
  ]);
  for (const component of components) {
    if (
      !/^[a-z][a-z0-9-]*$/.test(component.id) ||
      ids.has(component.id) ||
      ids.has(`${component.id}-title`)
    ) {
      throw new Error(
        `DesignSystem requires unique component ids using lowercase letters, digits and hyphens: ${component.id}`,
      );
    }
    ids.add(component.id);
    ids.add(`${component.id}-title`);
    const titles = new Set<string>();
    for (const example of component.examples) {
      if (!example.title.trim() || titles.has(example.title))
        throw new Error(
          `DesignSystem requires unique example titles in ${component.id}.`,
        );
      titles.add(example.title);
    }
  }
  const sections = [
    {
      id: "colors",
      title: "Colors",
      group: "Foundations",
      content: <Colors colors={colors} />,
    },
    {
      id: "typography",
      title: "Fonts & Typography",
      group: "Foundations",
      content: <Typography typography={typography} />,
    },
    ...components.map((component) => ({
      id: component.id,
      title: component.name,
      group: "Components",
      content: (
        <section aria-labelledby={`${component.id}-title`}>
          <PageHeader
            id={`${component.id}-title`}
            title={component.name}
            description={component.description}
            importCode={component.importCode}
            group="Components"
          />
          <div className="examples-grid grid min-w-0 grid-cols-1 gap-[28px]">
            {component.examples.map((example) => (
              <ComponentBlock key={example.title} {...example} />
            ))}
          </div>
        </section>
      ),
    })),
  ];
  const sectionIds = sections.map((section) => section.id).join(",");
  const [active, setActive] = useState("colors");
  const main = useRef<HTMLElement>(null);
  const direction = useEffectiveDirection(main);
  useEffect(() => {
    const sectionElements = sectionIds
      .split(",")
      .map((id) => main.current?.querySelector<HTMLElement>(`#${id}`))
      .filter((element): element is HTMLElement => !!element);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        const first = sectionElements.find((section) => visible.has(section));
        if (first) setActive(first.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    for (const section of sectionElements) observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);
  useEffect(() => {
    // Initial fragments need a target after React has mounted the complete page.
    const target = document.getElementById(window.location.hash.slice(1));
    if (target?.classList.contains("vis-section")) {
      setActive(target.id);
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, []);
  useEffect(() => {
    const font = new FontFace(
      "Umahra Design System Inter",
      `url("${new URL("./fonts/InterVariable.woff2", import.meta.url).href}")`,
      { style: "normal", weight: "100 900", display: "swap" },
    );
    document.fonts.add(font);
    void font.load().catch(() => document.fonts.delete(font));
    return () => {
      document.fonts.delete(font);
    };
  }, []);

  function navigation(mobile = false) {
    return (
      <nav
        aria-label={mobile ? "Mobile design system" : "Design system"}
        className={cn(
          chrome,
          mobile
            ? "vis-mobile-nav sticky top-[60px] z-20 hidden gap-[4px] overflow-x-auto border-b border-(--vis-line) bg-(--vis-surface) px-[22px] py-[10px] max-[800px]:flex"
            : "vis-nav mt-[36px] shrink-0",
        )}
      >
        {(["Foundations", "Components"] as const).map((group) => (
          <div className={mobile ? "contents" : "mb-[28px]"} key={group}>
            <Heading
              as="h2"
              className={cn(
                chrome,
                mobile
                  ? "hidden"
                  : "mx-[10px] mb-[10px] text-[10px] tracking-[1.2px] text-(--vis-muted) uppercase",
              )}
            >
              {group}
            </Heading>
            <ul className={mobile ? "contents" : "m-0 list-none p-0"}>
              {sections
                .filter((entry) => entry.group === group)
                .map((entry, index) => (
                  <li
                    className={mobile ? "contents" : undefined}
                    key={entry.id}
                  >
                    <a
                      href={`#${entry.id}`}
                      onClick={(event) => {
                        if (
                          event.defaultPrevented ||
                          event.button !== 0 ||
                          event.metaKey ||
                          event.ctrlKey ||
                          event.shiftKey ||
                          event.altKey
                        )
                          return;
                        setActive(entry.id);
                        main.current
                          ?.querySelector<HTMLElement>(`#${entry.id}`)
                          ?.scrollIntoView({
                            block: "start",
                            behavior: "instant",
                          });
                      }}
                      aria-current={
                        active === entry.id ? "location" : undefined
                      }
                      className={cn(
                        focus,
                        "flex items-center justify-between rounded-[5px] text-(--vis-muted) no-underline hover:bg-[color-mix(in_srgb,var(--vis-ink)_5%,transparent)] hover:text-(--vis-ink) aria-[current=location]:bg-[#e0ff63] aria-[current=location]:font-[550] aria-[current=location]:text-[#1d1d1f]",
                        mobile
                          ? "shrink-0 px-[10px] py-[7px] text-[10px] whitespace-nowrap"
                          : "my-[3px] min-h-[38px] gap-[8px] px-[10px] py-[9px] text-[12px]",
                      )}
                    >
                      <span>{entry.title}</span>
                      {!mobile && (
                        <span
                          className={cn(
                            mono,
                            "text-[9px] leading-none opacity-60",
                          )}
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>
    );
  }
  return (
    <DirectionProvider direction={direction}>
      <div className="vis-shell grid min-h-dvh grid-cols-[236px_minmax(0,1fr)] bg-background [--vis-font:'Umahra_Design_System_Inter',Arial,Helvetica,sans-serif] [--vis-mono:'SFMono-Regular',Consolas,'Liberation_Mono',monospace] [--vis-surface:#f3f3f3] [--vis-ink:#1d1d1f] [--vis-muted:#686868] [--vis-line:#dcdcdc] dark:[--vis-surface:#202020] dark:[--vis-ink:#f3f3f3] dark:[--vis-muted:#ababab] dark:[--vis-line:#3c3c3c] max-[1150px]:grid-cols-[210px_minmax(0,1fr)] max-[800px]:block">
        <a
          href="#vis-main"
          className={cn(
            chrome,
            focus,
            "vis-skip fixed top-[12px] start-[12px] z-100 -translate-y-[200%] rounded-[6px] bg-[#e0ff63] px-[18px] py-[12px] text-[#1d1d1f] focus:translate-y-0",
          )}
        >
          Skip to content
        </a>
        <aside
          className={cn(
            chrome,
            "vis-sidebar fixed inset-y-0 start-0 z-30 flex w-[236px] flex-col overflow-y-auto border-e border-(--vis-line) bg-(--vis-surface) px-[22px] pt-[34px] pb-[22px] max-[1150px]:w-[210px] max-[1150px]:px-[17px] max-[800px]:hidden",
          )}
        >
          <a
            className={cn(
              focus,
              "vis-brand flex w-fit items-baseline text-[23px] leading-[28px] font-[650] tracking-[-0.8px] text-(--vis-ink) no-underline",
            )}
            href="#colors"
          >
            Design system
          </a>
          {navigation()}
        </aside>
        <div className="vis-body col-start-2 min-w-0">
          <header
            className={cn(
              chrome,
              "vis-topbar sticky top-0 z-20 flex min-h-[68px] items-center justify-end gap-[20px] border-b border-(--vis-line) bg-(--vis-surface) px-[48px] text-[11px] max-[1150px]:px-[30px] max-[800px]:min-h-[60px] max-[800px]:gap-[12px] max-[800px]:px-[22px]",
            )}
          >
            <a
              className={cn(
                focus,
                "hidden text-[18px] font-[650] tracking-[-0.6px] text-(--vis-ink) no-underline max-[800px]:block",
              )}
              href="#colors"
            >
              Design system
            </a>
            <div className="ms-auto flex items-center gap-[12px]">
              <span
                className={cn(
                  mono,
                  "rounded-full border border-(--vis-line) px-[8px] py-[2px] text-[10px] leading-[1.6] whitespace-nowrap text-(--vis-muted)",
                )}
              >
                <span className="sr-only">@umahra/ui version </span>v
                {packageVersion}
              </span>
              <a
                className={cn(
                  focus,
                  "grid size-[36px] place-items-center rounded-[5px] text-(--vis-ink) hover:bg-[color-mix(in_srgb,var(--vis-ink)_5%,transparent)]",
                )}
                href="https://github.com/umahra/ui"
              >
                <span className="sr-only">Umahra UI on GitHub</span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16A10.8 10.8 0 0 1 12 6.17c.96 0 1.92.13 2.82.38 2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.11c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z" />
                </svg>
              </a>
            </div>
          </header>
          {navigation(true)}
          <main
            id="vis-main"
            ref={main}
            tabIndex={-1}
            className="vis-main mx-auto min-w-0 max-w-[1460px] scroll-mt-[68px] bg-background px-[48px] pt-[47px] pb-[24px] focus:outline-none max-[1150px]:px-[30px] max-[800px]:scroll-mt-[118px] max-[800px]:px-[22px] max-[800px]:pt-[32px]"
            aria-label="Design system"
          >
            <Heading as="h1" className="sr-only">
              Design system
            </Heading>
            {sections.map((entry, index) => (
              <div
                id={entry.id}
                className="vis-section min-w-0 scroll-mt-[68px] pt-[76px] first-of-type:pt-0 focus:outline-none max-[800px]:scroll-mt-[118px] max-[800px]:pt-[58px]"
                tabIndex={-1}
                key={entry.id}
              >
                <SectionNumber value={String(index + 1).padStart(2, "0")}>
                  {entry.content}
                </SectionNumber>
              </div>
            ))}
            <footer
              className={cn(
                chrome,
                "mt-[48px] flex flex-wrap items-center justify-between gap-[18px] border-t border-(--vis-line) pt-[25px] text-[9px] text-(--vis-muted)",
              )}
            >
              <span>Umahra UI</span>
              <span>Your theme. Your components.</span>
            </footer>
          </main>
        </div>
      </div>
    </DirectionProvider>
  );
}
