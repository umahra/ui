# Umahra UI

Umahra UI is a public UI library for building websites, using the theme conventions
of [shadcn/ui](https://ui.shadcn.com). You can use shadcn components alongside Umahra
UI and customize them with the same project-owned theme CSS.

The library provides maintained components with project-owned theme values and
fonts.

## Why?

shadcn/ui gives you component source that you can own and customize. When the same
components are used across several projects, keeping shared improvements in sync
means maintaining those changes in each codebase.

We created Umahra UI to maintain the components and patterns we reuse in one
library, so projects can receive fixes and improvements through explicit package
upgrades. Projects still own their themes, fonts, and appearance overrides, and
can add or customize shadcn components locally.

## Prerequisites

Your project should already have:

- React 19 and React DOM 19. TypeScript projects also need matching React typings.
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation) configured for your framework.
- `shadcn` installed so the `shadcn/tailwind.css` import resolves. See the
  [official shadcn setup guide](https://ui.shadcn.com/docs/installation).
- `tw-animate-css` installed for the animation styles imported by the stylesheet.

Tailwind, shadcn, and tw-animate-css are build-time dependencies of your project;
React and React DOM are runtime peers. Your project also owns its global stylesheet
and font loading.

## Installation

Install `@umahra/ui` with:

```sh
pnpm add @umahra/ui
```

## Component imports

Public components are organized by family:
`/accordion`, `/breadcrumb`, `/button`, `/carousel`, `/checkbox`, `/dialog`, `/field`, `/heading`, `/input`, `/label`,
`/popover`, `/radio`, `/select`, `/switch`, `/text`, and `/textarea`.

Multipart components export a named primitive namespace from a neutral entry module:

```tsx
import { ButtonPrimitive } from "@umahra/ui/button";
import { DialogPrimitive } from "@umahra/ui/dialog";
import type { ButtonRootProps } from "@umahra/ui/button";
import type { DialogContentProps } from "@umahra/ui/dialog";

<ButtonPrimitive.Root>Save</ButtonPrimitive.Root>
```

Single components retain their existing names:

```tsx
import { Heading, type HeadingProps } from "@umahra/ui/heading";
import { InputPrimitive, type InputProps } from "@umahra/ui/input";
import { LabelPrimitive, type LabelProps } from "@umahra/ui/label";
import { Text, type TextProps } from "@umahra/ui/text";
import { TextareaPrimitive, type TextareaProps } from "@umahra/ui/textarea";
```

`/button` exports both `ButtonPrimitive` and `ButtonGroupPrimitive`, with their public
props types. `/input` exports both `InputPrimitive` and `InputGroupPrimitive`, with their public
props types. `/radio` exports `RadioGroupPrimitive` and its public props types.

Every component path exports its own public props types. Existing imports from
`@umahra/ui` also remain supported. Each multipart namespace is assembled
in its own server-compatible entry file, separately from its component parts.
The package root re-exports the same object. This lets Next.js Server Components
render individual client parts. Client event handlers still belong in Client
Components. Internal helpers and wildcard paths are not public exports.

## Accordion

```tsx
import { cn } from "cn";
import {
  AccordionPrimitive as Accordion,
  type AccordionTriggerProps,
} from "@umahra/ui/accordion";

interface AccordionTriggerWrapperProps extends AccordionTriggerProps {
  compact?: boolean;
}

function AccordionTrigger({ compact, className, ...props }: AccordionTriggerWrapperProps) {
  return (
    <Accordion.Trigger
      {...props}
      className={cn("py-4 text-sm font-medium", compact && "py-2", className)}
    />
  );
}

<Accordion.Root defaultValue={["shipping"]}>
  <Accordion.Item value="shipping" className="border-b">
    <Accordion.Header>
      <AccordionTrigger>What are the shipping options?</AccordionTrigger>
    </Accordion.Header>
    <Accordion.Content className="pb-4 text-sm">
      Standard and express delivery are available.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

Compose `Root`, `Item`, `Header`, `Trigger` and `Content` explicitly. Header renders
an `h3`; use `render={<h2 />}` (or another heading) to fit the document hierarchy.
Content is the actual Base UI Panel: its `className`, ref, events and `render`
apply to that panel, with no bundled inner wrapper. Add your own inner element
when content spacing or a height animation requires it. Icons are optional
consumer children; mark decorative graphics `aria-hidden`.

Root supports generic item values. `value`, `defaultValue` and `onValueChange`
use arrays even when only one item can be open. The default permits zero or one
expanded item; set `multiple` to allow several. Use stable Item `value` props for
controlled or initially expanded items. Root and Item support `disabled`, and
change details support cancellation. Closed panels normally unmount; use
`keepMounted` on Root or Content to preserve their DOM and local state.
`hiddenUntilFound` on either part keeps closed panels mounted with
`hidden="until-found"` so supported browsers can reveal browser-search matches;
it takes precedence over `keepMounted`. Older browsers require the trigger.

All five parts export extensible public props types: `AccordionRootProps<Value>`,
`AccordionItemProps`, `AccordionHeaderProps`, `AccordionTriggerProps` and
`AccordionContentProps`. They accept string-only `className`, native refs/events,
Base UI `render` composition and state-based `style` callbacks. State attributes
include `data-open`, `data-disabled`, `data-starting-style` and `data-ending-style`
on the relevant parts; Trigger also exposes `aria-expanded`. Panel measurement
variables `--accordion-panel-height` and `--accordion-panel-width` remain available.

The primitive supplies structural layout, overflow containment and a visible
trigger focus outline. Consumers own spacing, icons, colors, typography, borders,
size variants and motion. Override Content with `overflow-visible` when needed,
and keep descendant focus outlines visible. Optional height transitions belong
in the consumer wrapper and should respect reduced motion. Base UI 1.9 uses
normal Tab/Shift+Tab navigation and Enter/Space activation; deprecated
`orientation` and `loopFocus` no longer provide roving focus.

The namespace entry and package root remain server-compatible; interactive parts
retain their client boundary. Event handlers and state belong in Client Components.

## Breadcrumb

Import `BreadcrumbPrimitive` and the extensible `Breadcrumb<Part>Props` types
from `@umahra/ui/breadcrumb` or the package root. Parts are `Root`, `List`,
`Item`, `Link`, `Page`, `Separator`, and `Ellipsis`.

```tsx
import { cn } from "cn";
import {
  BreadcrumbPrimitive as Breadcrumb,
  type BreadcrumbListProps,
} from "@umahra/ui/breadcrumb";

interface BreadcrumbListWrapperProps extends BreadcrumbListProps {
  compact?: boolean;
}

function BreadcrumbList({ compact, className, ...props }: BreadcrumbListWrapperProps) {
  return (
    <Breadcrumb.List
      {...props}
      className={cn("gap-2 text-sm text-muted-foreground", compact && "gap-1", className)}
    />
  );
}

<Breadcrumb.Root aria-label="Breadcrumb">
  <BreadcrumbList>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>/</Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>Components</Breadcrumb.Page>
    </Breadcrumb.Item>
  </BreadcrumbList>
</Breadcrumb.Root>
```

Root renders a `nav` with an overridable default `aria-label="breadcrumb"`;
use a localized label or `aria-labelledby` when appropriate. List renders an
ordered list with wrapping flex layout and word wrapping, including unbroken
labels. Item renders an aligned `li`. Page is a nonfocusable current-page span
with `role="link"`, `aria-disabled="true"` and `aria-current="page"`.
Consumers choose the route hierarchy and which item is current; no provider or
automatic routing/collapse state is added.

Link renders an anchor and preserves Base UI `render` composition, native
attributes, events and merged refs. For a routing library, use
`<Breadcrumb.Link render={<RouterLink to="/docs" />}>Docs</Breadcrumb.Link>`;
the custom link must forward received props and its ref to its anchor. Native
anchor focus remains visible. Each part accepts optional string `className`
and exposes its upstream `data-slot="breadcrumb…"` hook.

Separator and Ellipsis are optional decorative parts, hidden from assistive
technology. Supply their children, such as `/`, `…`, or your own icons; no
graphics or fixed sizes are bundled. Separator is a direct child of List;
Ellipsis belongs inside Item. For an interactive disclosure, put Ellipsis inside
a separately composed, accessibly named trigger, with interactive content
outside the hidden decorative span. Consumers own any omitted ancestors,
disclosure state, spacing, colors, typography, focus styling overrides and
directional icon treatment in RTL.

Only Link needs a client boundary. Native parts and namespace assembly remain
server-compatible. Use serializable props when passing into Link from a Server
Component; event handlers and render callbacks belong in consumer Client Components.

## Button Group

Import `ButtonGroupPrimitive` and its three public props types from
`@umahra/ui/button` or the package root. It shares the button family; there is no
`/button-group` subpath. Root, Text and Separator compose independently with your
finished Button and Input wrappers.

```tsx
import { cn } from "cn";
import {
  ButtonGroupPrimitive,
  type ButtonGroupRootProps,
} from "@umahra/ui/button";
import { Button } from "./button";

interface ButtonGroupProps extends ButtonGroupRootProps {
  fullWidth?: boolean;
}

function ButtonGroup({ fullWidth, className, ...props }: ButtonGroupProps) {
  return (
    <ButtonGroupPrimitive.Root
      {...props}
      className={cn(fullWidth && "w-full", className)}
    />
  );
}

<ButtonGroup aria-label="Clipboard actions">
  <Button>Copy</Button>
  <Button>Paste</Button>
</ButtonGroup>
```

`ButtonGroupRootProps`, `ButtonGroupTextProps` and `ButtonGroupSeparatorProps` are
extensible public types. All parts accept string `className`, native attributes,
events and refs. Root renders a native div with `role="group"`, defaults to
`orientation="horizontal"`, and also supports `vertical`. Supply `aria-label` or
`aria-labelledby`. Each child keeps its own native Tab order, activation, disabled,
loading and form behavior. The group adds no selection state or arrow-key navigation.

The primitive owns layout, focused-child stacking and joined edges on direct
children with `data-slot` hooks, including Umahra Button, Input, Input Group and
Select controls. Horizontal joins use logical edges for RTL; outer corners remain
consumer-owned. Custom wrappers must forward their primitive props to the rendered
control so those hooks remain present. Nested groups retain their own joins;
consumers add spacing between them. No padding, margin, gap, color, typography,
fixed size, outer radius, border, shadow or visual variant is supplied.

Text is optional aligned content, using Base UI `render` composition. For an input
label, use `render={<label htmlFor="query" />}` and match the input's `id`. Text is
not automatically the group's accessible name. Separator is an optional Base UI
Separator, with vertical orientation by default. In a vertical Root, explicitly
pass `orientation="horizontal"`. It stretches across the group; consumers provide
line thickness and color, for example `className="w-px bg-border"` for a vertical
line. Use `aria-hidden="true"` for a decorative separator. Separator retains Base
UI `render`, state-based `style` callbacks and orientation state attributes.

Root and namespace assembly remain server-compatible. Text and Separator retain
their client boundaries; event handlers and render/style callbacks belong in a
consumer Client Component. Existing Button exports and behavior are unchanged.

## Popover

```tsx
import { cn } from "cn";
import {
  PopoverPrimitive as Popover,
  type PopoverContentProps,
} from "@umahra/ui/popover";

interface PopoverContentWrapperProps extends PopoverContentProps {
  compact?: boolean;
}

function PopoverContent({ compact, className, ...props }: PopoverContentWrapperProps) {
  return (
    <Popover.Content
      {...props}
      className={cn(
        "w-72 gap-4 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md",
        compact && "w-56 gap-2 p-2",
        className,
      )}
    />
  );
}

<Popover.Root>
  <Popover.Trigger>Display settings</Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner align="start" sideOffset={8}>
      <PopoverContent>
        <Popover.Header className="gap-1">
          <Popover.Title>Display settings</Popover.Title>
          <Popover.Description>Adjust your preferences.</Popover.Description>
        </Popover.Header>
        {/* Consumer-owned controls */}
        <Popover.Close>Done</Popover.Close>
      </PopoverContent>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

`PopoverPrimitive` exports Root, Trigger, Portal, Positioner, Content, Header,
Title, Description, Close, and `createHandle`. Every part exports its corresponding
`Popover…Props` type through the popover subpath and package root; `PopoverHandle`
is also public. Root and Trigger preserve typed payloads. Create a handle in client
code with `Popover.createHandle<Payload>()` to connect detached triggers.

Portal and Positioner are explicit. Positioner exposes Base UI anchoring, logical
sides, alignment, offsets and collision options; its default side offset is zero.
Content preserves popup semantics, focus, presence and state attributes, with
available-width/height limits and internal scrolling. Header is optional column
layout; Title and Description supply accessible associations. Supply Title or an
accessible name using `aria-label`/`aria-labelledby` on Content. All DOM parts accept
string `className`, native attributes, refs and events; Base UI parts also preserve
`render` composition and style callbacks.

Root supports `open`/`defaultOpen`, change cancellation, and Base UI modal modes.
It defaults to nonmodal. For `modal={true}`, focus trapping requires a Close part
inside Content. For `modal="trap-focus"`, also include Close so touch screen readers
can escape. Content supports `initialFocus` and `finalFocus`; focus management,
Escape and outside dismissal remain owned by Base UI. Consumers own colors, fonts,
sizes, spacing, borders, shadows, arrow graphics and motion. No arrow, backdrop or
content-transition viewport part is bundled. The namespace entrypoint remains
neutral; its interactive implementations and handle creation belong to client code.

## Checkbox

```tsx
import { cn } from "cn";
import {
  CheckboxPrimitive,
  type CheckboxRootProps,
} from "@umahra/ui/checkbox";
import { LabelPrimitive } from "@umahra/ui/label";

interface CheckboxProps extends CheckboxRootProps {
  compact?: boolean;
}

function Checkbox({ compact, className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={cn("rounded border border-current", compact ? "size-4" : "size-5", className)}
    >
      <CheckboxPrimitive.Indicator
        render={(indicatorProps, state) => (
          <span {...indicatorProps} aria-hidden="true">
            {state.indeterminate ? "−" : "✓"}
          </span>
        )}
      />
    </CheckboxPrimitive.Root>
  );
}

<LabelPrimitive className="gap-2">
  <Checkbox name="notifications" defaultChecked />
  Enable notifications
</LabelPrimitive>
```

`CheckboxPrimitive` exposes `Root` and optional `Indicator`, with extensible
`CheckboxRootProps` and `CheckboxIndicatorProps` types from the subpath and package
root. Consumers own sizes, spacing, icons, colors, borders, and motion; the primitive
centers content, prevents shrinking, and supplies a visible keyboard focus outline.
Both parts accept string `className`, Base UI `render` composition and state-based
`style` callbacks. Root preserves its element `ref`, hidden-input `inputRef`, native
form values, `required`, `disabled`, `readOnly`, and change cancellation.

Use `defaultChecked` for uncontrolled state or `checked`/`onCheckedChange` for
controlled state. `indeterminate` is a separate boolean; `checked` stays boolean.
Indicator renders for checked or mixed state. `keepMounted` retains its layout
while hiding unchecked content; presence attributes allow consumer exit animation.
Consumers reset controlled state or remount uncontrolled controls on form reset.

An enclosing label works with the default span root. For sibling `htmlFor`/`id`
labels, prefer `nativeButton render={<button type="button" />}` on Root. Associate descriptions
and errors using explicit `aria-describedby` IDs and set `aria-invalid` as needed.
Umahra Field provides native layout parts, not Base UI's validation context.
Checkbox Group is a separate Base UI component and is not bundled here.

## Configure styles

Copy the stylesheet below into your project's global CSS file. Replace your existing Tailwind import with this setup to avoid duplicate imports.

These global styles provide the theme variables, semantic utilities, and base styles
used by Umahra UI and shadcn components. Register the installed package with
Tailwind's `@source` directive so its utility classes are included in your build.
The example assumes `src/globals.css`; adjust the path relative to your stylesheet.
See [Tailwind source registration](https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-registering-sources).

Typography values start in `@theme` and change in `:root` through `@variant sm`,
using your configured Tailwind breakpoint. Customize each `--text-h*` variable
and its companions there; use other named variants for additional transitions.
Line-height values are unitless ratios that scale with the font size.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@source "../node_modules/@umahra/ui/dist";

@custom-variant dark (&:is(.dark *));

@theme {
  --text-body: 1rem;
  --text-body--line-height: 1.5;
  --text-body--font-weight: 400;
  --text-body--letter-spacing: 0em;

  --text-h1: 2.25rem;
  --text-h1--line-height: 1.2;
  --text-h1--font-weight: 600;
  --text-h1--letter-spacing: -0.02em;

  --text-h2: 1.75rem;
  --text-h2--line-height: 1.25;
  --text-h2--font-weight: 600;
  --text-h2--letter-spacing: -0.015em;

  --text-h3: 1.25rem;
  --text-h3--line-height: 1.4;
  --text-h3--font-weight: 600;
  --text-h3--letter-spacing: -0.01em;

  --text-h4: 1.25rem;
  --text-h4--line-height: 1.4;
  --text-h4--font-weight: 600;
  --text-h4--letter-spacing: -0.01em;

  --text-h5: 1.125rem;
  --text-h5--line-height: 1.4;
  --text-h5--font-weight: 600;
  --text-h5--letter-spacing: 0em;

  --text-h6: 1rem;
  --text-h6--line-height: 1.5;
  --text-h6--font-weight: 600;
  --text-h6--letter-spacing: 0em;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  @variant sm {
    --text-h1: 3rem;
    --text-h1--line-height: 1.1;
    --text-h1--letter-spacing: -0.025em;

    --text-h2: 2.25rem;
    --text-h2--line-height: 1.2;
    --text-h2--letter-spacing: -0.02em;

    --text-h3: 1.75rem;
    --text-h3--line-height: 1.25;
    --text-h3--letter-spacing: -0.015em;
  }

  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Theme and font ownership

Set `class="dark"` on your document's `html` element to select the dark palette; remove
it for the light palette. The `dark:` variant applies to descendants of `.dark`.
Use semantic utilities such as `bg-primary text-primary-foreground`, `border-border`,
and `bg-background text-foreground`.

Override existing variables after the recipe in the same selectors. For example:

```css
:root {
  --primary: oklch(0.45 0.12 250);
  --primary-foreground: oklch(0.985 0 0);
  --radius: 0.75rem;
}

.dark {
  --primary: oklch(0.8 0.1 250);
  --primary-foreground: oklch(0.145 0 0);
}
```

The `rounded-sm` through `rounded-4xl` utilities derive from `--radius` using the
upstream recipe. Use Tailwind's ordinary spacing utilities such as `p-4` and `gap-4`;
there is no additional spacing system. Primitives supply no padding, margin, gap,
or space defaults; add those classes in your consumer wrappers.

Choose and load fonts in your application with your framework's loader, a local
`@font-face`, or a project font stack. The package and recipe load no fonts.
See [Tailwind theme variables](https://tailwindcss.com/docs/theme) and
[shadcn theming](https://ui.shadcn.com/docs/theming) for project customization.

Your copied CSS is project-owned: later README or package upgrades do not automatically
replace it. Review and apply recipe changes deliberately. Published package fixes reach
projects through explicit dependency upgrades.

## Contributing

See [CONTRIBUTING.md](https://github.com/umahra/ui/blob/main/CONTRIBUTING.md)
for development and contribution instructions.

## License

[MIT](LICENSE). The CSS recipe is adapted from shadcn/ui, also available under the
[MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

## Credits

[shadcn/ui](https://ui.shadcn.com) provides the theme conventions and CSS foundation
used by Umahra UI. Its approach to composable, customizable components is the
foundation we build on.

Thank you, shadcn, for the care you've put into shadcn/ui and for sharing your work
with the community.

## Form primitives

`InputPrimitive`, `LabelPrimitive`, and `TextareaPrimitive` expose native form props
and refs. Label and Textarea are native-only components; Input uses Base UI.
Associate labels with controls using `htmlFor` and `id`, including grouped controls:

```tsx
import { InputGroupPrimitive } from "@umahra/ui/input";
import { LabelPrimitive } from "@umahra/ui/label";
import { TextareaPrimitive } from "@umahra/ui/textarea";

<>
  <LabelPrimitive htmlFor="notes">Notes</LabelPrimitive>
  <InputGroupPrimitive.Root>
    <InputGroupPrimitive.Textarea id="notes" name="notes" />
    <InputGroupPrimitive.Addon align="block-end">
      <InputGroupPrimitive.Text>Markdown supported</InputGroupPrimitive.Text>
    </InputGroupPrimitive.Addon>
  </InputGroupPrimitive.Root>

  <TextareaPrimitive aria-label="Additional notes" name="additionalNotes" rows={3} />
</>
```

Input Group reuses the standalone Input and Textarea primitives. Standalone
controls keep their native focus indication; grouped controls delegate it to the
root. Consumers supply borders, colors, typography, and sizing through `className`.
Public `InputProps`, `LabelProps`, and `TextareaProps` can be extended by wrappers.

## Field composition

`FieldPrimitive` exposes `Root`, `Label`, `Description`, `Error`, `Group`, `Set`,
`Legend`, `Content`, `Title`, and `Separator`, with matching `Field*Props` exports.
It provides native form structure and vertical, horizontal, or container-responsive
layout. `Label` reuses `LabelPrimitive`; compose your existing Input, Textarea, or
Input Group as the control.

```tsx
import { FieldPrimitive as Field } from "@umahra/ui/field";
import { InputPrimitive } from "@umahra/ui/input";

<Field.Root>
  <Field.Label htmlFor="account-email">Email</Field.Label>
  <InputPrimitive
    id="account-email"
    name="email"
    type="email"
    aria-describedby="account-email-help"
  />
  <Field.Description id="account-email-help">
    Used for account notifications.
  </Field.Description>
</Field.Root>
```

Use `htmlFor`/`id` and `aria-describedby` to associate each control with its label,
help, and visible errors. Your form owns validation: supply `data-invalid` to Root,
`aria-invalid` to the control, and messages as Error children or an `errors` array.
Error removes duplicate messages and omits empty arrays. This composition layer
does not create the optional Base UI Field validation context.

`Set` and `Legend` provide native fieldset grouping; `Set disabled` disables its
controls. Put `orientation="responsive"` fields inside `Group` to switch from
columns to rows at the group's `@md` container breakpoint. Borders, colors, fonts, spacing,
legend sizing, and separator appearance belong to consumer classes. The Field
namespace is exported by its neutral component entrypoint and supports Server Components;
Separator retains its internal Base UI client boundary.

## Select composition

`SelectPrimitive` uses Base UI Combobox for searchable single and multiple
selection. The public name and `@umahra/ui/select` import path stay the same.

Parts: `Root`, `Label`, `Trigger`, `Value`, `Icon`, `Input`, `InputGroup`, `Clear`,
`Portal`, `Positioner`, `Content`, `List`, `Item`, `ItemIndicator`, `Group`,
`GroupLabel`, `Separator`, `Collection`, `Empty`, `Chips`, `Chip`, and `ChipRemove`.
Each part exports its matching public `Select<Part>Props` type through the subpath
and package root. Styled parts accept string `className`, refs, events, `render`
composition and style callbacks. `Root`, `Value` and `Collection` render no DOM;
Value and Collection therefore have no styling props.

### Button trigger with search inside the popup

```tsx
import { SelectPrimitive as Select, type SelectTriggerProps } from "@umahra/ui/select";

interface ProjectSelectTriggerProps extends SelectTriggerProps {
  compact?: boolean;
}

const items = ["Apple", "Banana", "Blueberry"];

<Select.Root items={items} name="fruit" defaultValue="Apple">
  <Select.Label className="mb-2 text-sm">Fruit</Select.Label>
  <Select.Trigger className="w-48 rounded-md border border-input px-3 py-2">
    <Select.Value placeholder="Choose fruit" />
    <Select.Icon>⌄</Select.Icon>
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner sideOffset={4}>
      <Select.Content className="rounded-md border border-border bg-popover text-popover-foreground">
        <Select.Input aria-label="Search fruit" placeholder="Search…" className="border-b border-input px-3 py-2" />
        <Select.Empty><p className="px-3 py-2">No items found.</p></Select.Empty>
        <Select.List className="max-h-60">
          {(item: string) => (
            <Select.Item key={item} value={item} className="gap-2 px-3 py-2 data-highlighted:bg-accent">
              <span className="flex-1">{item}</span>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          )}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

Keep the Input in the popup for this composition. `Label` names the trigger.
For an inline Input, use a native label or `LabelPrimitive` with `htmlFor` instead.
Field descriptions/errors use explicit IDs and control ARIA attributes; Field is
not a Base UI validation context.

### Multiple selection with visible, removable items

```tsx
import { SelectPrimitive as Select } from "@umahra/ui/select";
import { LabelPrimitive } from "@umahra/ui/label";

<Select.Root items={items} multiple defaultValue={["Apple", "Banana"]} name="fruits">
  <LabelPrimitive htmlFor="fruits">Fruits</LabelPrimitive>
  <Select.InputGroup className="rounded-md border border-input p-2">
    <Select.Value>
      {(selected: string[]) => (
        <Select.Chips className="gap-1" aria-label={selected.length ? "Selected fruits" : undefined}>
          {selected.map((item) => (
            <Select.Chip key={item} aria-label={item} className="gap-1 rounded bg-muted ps-2">
              {item}
              <Select.ChipRemove aria-label={`Remove ${item}`} className="size-6">×</Select.ChipRemove>
            </Select.Chip>
          ))}
          <Select.Input id="fruits" className="w-auto min-w-20 flex-1" placeholder="Choose fruits" />
        </Select.Chips>
      )}
    </Select.Value>
  </Select.InputGroup>
  {/* Compose Portal, Positioner, Content, Empty and List as above, without a second Input. */}
</Select.Root>
```

Chips are explicit parts, rendered from the selected values. Base UI handles
removal, focus recovery, arrow-key navigation, and Backspace/Delete. Do not nest
ChipRemove buttons inside a Trigger button; compose them in InputGroup/Chips.
The input group supplies a visible focus fallback for its input, while the standalone
Input preserves browser focus. Consumers can replace these with their own visible
focus styles.

Root retains generic `SelectRootProps<Value, Multiple, Item>`, controlled/uncontrolled
selection and query state, object values and equality/serialization, filtering,
and form behavior. Use actual item values in Item; pass `items` to Root and render
List with a function child so it follows filtering. Grouped lists use Group with
its filtered `items` and Collection. Root's `filter`/`filteredItems` support custom
filtering. Search query and selected value are separate states.

Put function children for List, Value, and Collection in a Client Component, along
with event handlers and controlled state. The neutral Select namespace can still
be imported by Server Components for composition with serializable props.

In multiple mode with an inline Input, Base UI closes the popup after selection.
A consumer wrapper can keep it open by canceling the `item-press` close request
in `onOpenChange`. The playground demonstrates this without changing primitive
defaults. Reset controlled values in the consumer form's `onReset`, or remount an
uncontrolled Root using a reset key.

Selection remains a nonmodal dropdown with page scrolling available. Root fixes
`modal=false` and excludes it from public props. Positioning props live on
Positioner; Combobox has no item-over-trigger alignment mode. The primitive owns
popup sizing/stacking, overflow, filtering/selection behavior, accessibility and
focus. Consumers own spacing, appearance, size variants, animations, and every
icon graphic. Optional companions remain optional.

Empty is an always-mounted live region that only renders its children when no
items match. Keep the Empty element mounted and visible; put decorative spacing
on its children. Avoid hiding Empty with `hidden`, `display:none` or `aria-hidden`,
which would prevent reliable announcements.

This replaces the unpublished Base UI Select foundation. `ItemText` and
`ScrollUpArrow`/`ScrollDownArrow` are removed; use normal item children and the
scrollable List. Value now renders its content directly rather than a span.

## Switch composition

Import `SwitchPrimitive`, `SwitchRootProps` and `SwitchThumbProps` from
`@umahra/ui/switch` or the package root. Root owns Base UI state, interaction,
accessibility and the hidden form input. Thumb is optional and must be inside Root.
Both public props types retain refs, events, `render` composition and style callbacks;
`className` accepts an optional string. Consumer wrappers can extend these types.

```tsx
import { SwitchPrimitive, type SwitchRootProps } from "@umahra/ui/switch";
import { LabelPrimitive } from "@umahra/ui/label";

function Switch({ className, ...props }: SwitchRootProps) {
  return (
    <SwitchPrimitive.Root
      {...props}
      className={`h-6 w-11 rounded-full p-0.5 data-checked:bg-primary data-unchecked:bg-input ${className ?? ""}`}
    >
      <SwitchPrimitive.Thumb className="size-5 rounded-full bg-background" />
    </SwitchPrimitive.Root>
  );
}

<LabelPrimitive className="gap-3">
  <Switch name="notifications" defaultChecked />
  Notifications
</LabelPrimitive>
```

Root defaults to Base UI's span plus hidden input, supporting wrapping labels.
For a sibling label, use `htmlFor`/`id` and set `nativeButton render={<button />}`
on Root. Do not put a native-button root and its hidden input inside an enclosing
label; use the default span or Base UI's documented outer-label render callback.
Associate Field descriptions/errors through explicit IDs and `aria-describedby`;
Umahra Field does not create a Base UI validation context.

Use `checked`/`onCheckedChange` for controlled state or `defaultChecked` for
uncontrolled state. Keep both event arguments; the event details support cancellation.
Root preserves `disabled`, `readOnly`, `required`, `name`, `form`, `value`,
`uncheckedValue` and `inputRef`. Unchecked switches omit their form value unless
`uncheckedValue` is supplied. For form reset, reset controlled state in the
consumer's `onReset`, or remount uncontrolled Roots with a reset key.

The primitive supplies grid alignment and thumb placement at logical start/end,
including RTL. It keeps `data-slot="switch"`/`"switch-thumb"` and Base UI state
attributes such as `data-checked`, `data-unchecked`, `data-disabled` and
`data-readonly`. Consumers own track/thumb dimensions, inset spacing, colors,
borders, rounding, hit-area sizing and animation. Movement is instantaneous by
default; a wrapper can replace alignment and provide its own animated geometry.
Primitive defaults include no padding, margin, gap, fixed size or outline removal.

Switch parts retain their client boundary; the neutral namespace and root imports
remain usable in Server Components with serializable props. Put controlled state,
event handlers, and render/style callbacks in a consumer Client Component.

## Radio Group composition

Import `RadioGroupPrimitive`, `RadioGroupRootProps<Value>`,
`RadioGroupItemProps<Value>` and `RadioGroupIndicatorProps` from
`@umahra/ui/radio` or the package root. Root shares a single selected value;
Item wraps Base UI Radio.Root. Indicator is optional, belongs inside Item, and
renders consumer-provided children. Each props type is extensible and preserves
refs, events, `render` and style callbacks; `className` is an optional string.

```tsx
import { RadioGroupPrimitive as RadioGroup, type RadioGroupItemProps } from "@umahra/ui/radio";
import { LabelPrimitive } from "@umahra/ui/label";

function Radio({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroup.Item
      {...props}
      className={`size-4 rounded-full border data-checked:border-primary ${className ?? ""}`}
    >
      <RadioGroup.Indicator>
        <span className="size-2 rounded-full bg-current" />
      </RadioGroup.Indicator>
    </RadioGroup.Item>
  );
}

<RadioGroup.Root name="billing" defaultValue="monthly" aria-label="Billing plan" className="gap-3">
  <LabelPrimitive className="gap-2"><Radio value="monthly" />Monthly</LabelPrimitive>
  <LabelPrimitive className="gap-2"><Radio value="yearly" />Yearly</LabelPrimitive>
</RadioGroup.Root>
```

Use `value`/`onValueChange` for controlled state or `defaultValue` for uncontrolled
state. Generic value inference and both callback arguments are preserved, including
event cancellation. Keep object values referentially stable: Base UI matches radio
values by identity. Root forwards `name`, `form`, `disabled`, `readOnly`, `required`
and `inputRef`; Item also forwards its hidden-input ref and item state props.
The native radio inputs supply form values. Reset controlled values in the consumer
form's `onReset`, or remount an uncontrolled Root with a reset key.

Items default to Base UI's span plus hidden input for enclosing labels, including
choice cards. For sibling labels, use `htmlFor`/`id` with
`nativeButton render={<button type="button" />}` on Item. Name Root with
`aria-label` or `aria-labelledby`. Existing Field.Set/Legend/Description/Error parts
compose through explicit IDs and ARIA associations; Umahra Field does not create
a Base UI validation context. Base UI Field integration remains available.

Root provides a full-width grid. Item provides centered, non-shrinking structure
and a visible focus outline. Indicator preserves Base UI mounting, transitions and
`keepMounted`; inactive retained indicators are invisible outside exit transitions.
The primitive retains `data-slot="radio-group"`, `"radio-group-item"` and
`"radio-group-indicator"`, and Base UI checked/unchecked, disabled, read-only and
validation state hooks. Consumers own layout overrides, spacing, dimensions, colors,
borders, rounding, hit areas, animations and indicator graphics. No indicator is
automatically inserted into Item.

Use Base UI's `DirectionProvider` for RTL keyboard navigation; HTML `dir` alone
does not configure Base UI's direction context.

Parts retain their client boundary. The neutral namespace and package root can be
used in Server Components with serializable props. State, event handlers and
render/style callbacks belong in consumer Client Components.

## Sheet composition

Import `SheetPrimitive` and the public `Sheet<Part>Props` types from
`@umahra/ui/sheet` or the package root. Parts are `Root`, `Trigger`, `Portal`,
`Overlay`, `Content`, `Header`, `Footer`, `Title`, `Description`, and `Close`.

```tsx
import { SheetPrimitive as Sheet, type SheetContentProps } from "@umahra/ui/sheet";

interface SettingsSheetProps extends SheetContentProps {
  compact?: boolean;
}

<Sheet.Root>
  <Sheet.Trigger>Open settings</Sheet.Trigger>
  <Sheet.Portal>
    <Sheet.Overlay className="bg-black/40" />
    <Sheet.Content side="right" className="w-full max-w-md gap-6 bg-background p-6 text-foreground">
      <Sheet.Header className="gap-2">
        <Sheet.Title className="text-xl font-semibold">Settings</Sheet.Title>
        <Sheet.Description>Update your preferences.</Sheet.Description>
      </Sheet.Header>
      {/* Consumer content */}
      <Sheet.Footer className="mt-auto">
        <Sheet.Close>Close settings</Sheet.Close>
      </Sheet.Footer>
    </Sheet.Content>
  </Sheet.Portal>
</Sheet.Root>
```

Content renders only the popup; compose Portal explicitly. Overlay, Header,
Footer and Description are optional. Supply a Title or another accessible name,
and include an accessible Close inside modal sheets for touch screen readers.
Close has no bundled icon, placement or visual button variant.

`side` defaults to `right` and accepts `top`, `right`, `bottom` and `left`.
Left/right are physical edges in both LTR and RTL. Side panels stretch vertically;
top/bottom panels stretch horizontally. Content keeps viewport bounds and internal
scrolling; consumers set panel width/height, spacing, footer placement and appearance.
Transitions, animations, their timing and reduced-motion styling belong to the
project design system. The primitive preserves Base UI presence handling and state
attributes without adding visual motion. State hooks include `data-side`, Base UI state attributes and
`data-slot="sheet-<part>"` on DOM parts. Overlay does not intercept outside controls
in nonmodal modes; Base UI owns dismissal and modal interaction blocking.

Root preserves Base UI Dialog's controlled/uncontrolled state, generic payloads,
open-change events, `modal` modes and dismissal controls. It defaults to modal.
Parts preserve refs, events, `render` composition and style callbacks; styled parts
accept string `className`. Header/Footer use native div props. No padding, margin,
gap, transition, animation, opacity effect, motion transform, color, font, border,
shadow, fixed panel width or icon is a primitive default. Sheet uses Dialog behavior; it has no swipe gestures or snap points.

The parts keep their client boundary; the neutral namespace and package root
support Server Component composition with serializable props. Controlled state,
event handlers and render/style callbacks belong in a consumer Client Component.

## Local development

From a repository checkout, run `pnpm install --frozen-lockfile` and `pnpm dev`
to open the component playground at `http://127.0.0.1:5173`. Vite provides the
showcase and manual visual checks; tsdown still builds the published library.
See [CONTRIBUTING.md](https://github.com/umahra/ui/blob/main/CONTRIBUTING.md) for
package verification and the separate playground build/preview commands.

## Slider composition

Import `SliderPrimitive` from `@umahra/ui/slider` or `@umahra/ui`. Its parts are
`Root`, `Control`, `Track`, `Indicator`, `Thumb`, `Label`, and `Value`. Each part
exports its extensible `Slider<Part>Props` type through both entrypoints.
`SliderRootProps<Value>` preserves scalar and readonly-array value inference.

```tsx
import { SliderPrimitive as Slider } from "@umahra/ui/slider";

<Slider.Root defaultValue={[20, 70]} name="price" className="space-y-2">
  <div className="flex justify-between gap-3 text-sm">
    <Slider.Label>Price range</Slider.Label>
    <Slider.Value />
  </div>
  <Slider.Control className="h-10">
    <Slider.Track className="h-1 rounded-full bg-muted">
      <Slider.Indicator className="rounded-full bg-primary" />
    </Slider.Track>
    <Slider.Thumb index={0} aria-label="Minimum price" className="size-5 rounded-full border border-input bg-background" />
    <Slider.Thumb index={1} aria-label="Maximum price" className="size-5 rounded-full border border-input bg-background" />
  </Slider.Control>
</Slider.Root>
```

Supply one Thumb per value, with explicit indexes for server-rendered ranges.
Use Label for the overall accessible name and distinct thumb names for ranges;
without Label, name each Thumb with `aria-label` or `aria-labelledby`.
Indicator, Label and Value are optional. Value renders an `output` and accepts
function children for custom formatting. Thumbs can be siblings of Track inside
Control to keep track clipping separate from thumb focus outlines. A Thumb inside
Track is also supported; consumers then need an unclipped track for focus outlines.

The primitive owns orientation-aware layout, touch/selection handling and a visible
thumb outline when its nested range input has keyboard focus. Consumers supply
control height/width, track thickness, thumb dimensions, spacing and appearance.
For vertical sliders, provide a containing height and control/track widths.
Override the default outline through `has-[:focus-visible]:outline-*` utilities.
State styling uses upstream attributes such as `data-disabled`, `data-dragging`
and `data-orientation`; every part accepts string-only `className`.

Root retains Base UI's controlled/uncontrolled `value`/`defaultValue`,
`onValueChange`/`onValueCommitted`, cancellation details, min/max, decimal step,
largeStep, minimum distance, collision modes, formatting, forms and disabled
behavior. Its overridable `thumbAlignment` defaults to `edge`; collision handling
keeps Base UI's default `push` behavior. Thumb retains its div ref, nested
`inputRef`, input keyboard/focus events and accessible-value-text callbacks.
Reset uncontrolled forms by remounting the slider or own the value and reset it
in your form handler. Optional Base UI Field validation context remains supported;
Umahra Field is a separate native composition layer.

Use Base UI's `DirectionProvider` for RTL interaction; HTML `dir` alone does not
configure Base UI's direction context. No additional library provider is bundled.
Parts keep their client boundary while namespace assembly and the package root
remain server-compatible. Put event handlers, controlled state, render/style
callbacks and Value function children in a consumer Client Component.

## Carousel composition

Import `CarouselPrimitive` from `@umahra/ui/carousel` or `@umahra/ui`. It exposes
`Root`, `Viewport`, `Content`, `Item`, `Previous`, and `Next`, with matching public
`Carousel<Part>Props` types, plus `CarouselApi`, `CarouselOptions`, and `CarouselPlugins`.
The neutral entrypoints assemble the namespace; the interactive parts are client
components. Client callbacks, plugins, and `setApi` belong in a Client Component.

```tsx
import { cn } from "cn";
import { CarouselPrimitive as Carousel, type CarouselItemProps } from "@umahra/ui/carousel";

interface ProjectSlideProps extends CarouselItemProps {
  featured?: boolean;
}

function ProjectSlide({ featured, className, ...props }: ProjectSlideProps) {
  return <Carousel.Item {...props} className={cn("rounded-lg border p-4", featured && "bg-muted", className)} />;
}

<Carousel.Root aria-label="Featured projects" opts={{ align: "start" }}>
  <Carousel.Viewport>
    <Carousel.Content className="gap-4">
      <ProjectSlide aria-label="1 of 2">First project</ProjectSlide>
      <ProjectSlide aria-label="2 of 2">Second project</ProjectSlide>
    </Carousel.Content>
  </Carousel.Viewport>
  <div className="mt-3 flex gap-2">
    <Carousel.Previous className="rounded border px-3 py-2">Previous</Carousel.Previous>
    <Carousel.Next className="rounded border px-3 py-2">Next</Carousel.Next>
  </div>
</Carousel.Root>
```

Keep Viewport → Content → Item as the direct scrolling structure. Viewport exposes
its own ref and clipping styles; Content owns the flex track. Each Item defaults
to a full slide and accepts consumer `basis-*` overrides. For vertical carousels,
set `orientation="vertical"` and give Viewport a definite height. Spacing, control
placement, dimensions, icons, typography, colors, and decoration are consumer-owned.
All styled parts accept string `className`; native parts retain native props and
refs. Previous/Next retain the existing Button's Base UI `render`, `nativeButton`,
style callbacks, loading, disabled, refs, and event contracts. They default to
non-submit buttons with overridable English accessible labels and no bundled icons.

Root owns an Embla instance. Pass its options/plugins through `opts`/`plugins`;
`orientation` sets its axis. `setApi` receives the instance and `undefined` on
cleanup, enabling API navigation, selected-snap subscriptions, and custom pagination.
Consumers must remove their own API subscriptions. Navigation availability updates
on selection, resize, slide changes, and reinitialization; explicit `disabled` or
loading also prevents navigation. An `onClick` or Root `onKeyDown` handler can call
`preventDefault()` to cancel the built-in action.

Root is keyboard focusable by default (`tabIndex` is overridable). Its shortcuts
only act when Root itself has focus: Left/Right horizontally, Up/Down vertically,
and reversed Left/Right in RTL. Modifier combinations and descendants keep their
own keys. Tab navigation and Embla's reveal-on-focus behavior remain intact.
Supply `aria-label` or `aria-labelledby` on Root, and meaningful slide names or
position labels on Item. Navigation controls are optional.

Direction resolves from explicit `dir="ltr" | "rtl"`, then `opts.direction`, then
Base UI DirectionProvider (LTR by default), and is applied to both DOM and Embla.
Set direction on Root or DirectionProvider rather than relying on an ancestor's
HTML `dir` alone. Keep breakpoint direction/axis consistent with Root's direction
and orientation. Embla's scrolling transforms are core behavior; there are no
additional CSS motion defaults. The reduced-motion media breakpoint forces
`duration: 0` for API/button/keyboard scrolling. Plugins that add automatic motion
remain consumer-owned and need their own accessibility and reduced-motion controls.
