# Umahra UI

Umahra UI is a public UI library for building websites, using the theme conventions
of [shadcn/ui](https://ui.shadcn.com). You can use shadcn components alongside Umahra
UI and customize them with the same project-owned theme CSS.

The library provides composable primitives with maintained behavior and structural
Tailwind styles. Your project owns colors, typography, decorative treatments, size
variants, and finished component wrappers.

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

- React 19 and React DOM 19.
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation) configured for your framework.
- `shadcn` installed so the `shadcn/tailwind.css` import resolves. See the
  [official shadcn setup guide](https://ui.shadcn.com/docs/installation).
- `tw-animate-css` installed for the animation styles imported by the stylesheet.

These are build-time dependencies of your project. Your project also owns its
global stylesheet and font loading.

## Installation

Install `@umahra/ui` with:

```sh
pnpm add @umahra/ui
```

Dialog requires a release that exports `DialogPrimitive`; the `0.1.1` foundation
release contains no components. Before the Dialog release, use a locally built
package archive to try these parts.

## Configure styles

Register the installed package's emitted JavaScript in your Tailwind v4 stylesheet
so its literal structural utilities are compiled. The path is relative to your CSS
file; adjust it for your project layout. For example, from `src/app/globals.css`:

```css
@source "../../node_modules/@umahra/ui/dist";
```

Copy the stylesheet below into your project's global CSS file. Replace your existing Tailwind import with this setup to avoid duplicate imports.

These global styles provide the theme variables, semantic utilities, and base styles
used by Umahra UI and shadcn components. Your application must load them; `@umahra/ui`
does not import a stylesheet for you.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

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

## Dialog

Import the multipart family and its public types from the package root:

```tsx
import { DialogPrimitive, type DialogContentProps } from "@umahra/ui";
```

| Part | Public props type | Purpose |
| --- | --- | --- |
| `Root` | `DialogRootProps<Payload>` | Controlled/uncontrolled state and modal behavior |
| `Trigger` | `DialogTriggerProps<Payload>` | Opens the dialog; supports Base UI `render` composition |
| `Portal` | `DialogPortalProps` | Portal container and `keepMounted` lifecycle |
| `Overlay` | `DialogOverlayProps` | Optional visual backdrop |
| `Viewport` | `DialogViewportProps` | Viewport gutters, centering, and outside scrolling |
| `Content` | `DialogContentProps` | Accessible dialog surface (Base UI Popup) |
| `Header` | `DialogHeaderProps` | Optional vertical heading group |
| `Footer` | `DialogFooterProps` | Optional responsive action group |
| `Title` | `DialogTitleProps` | Accessible dialog name |
| `Description` | `DialogDescriptionProps` | Optional associated description |
| `Close` | `DialogCloseProps` | Explicit consumer-labelled close control |

`Content` renders only the surface. Compose Portal, Overlay, Viewport, and Close
explicitly; no close icon or Button is inserted. The default Viewport centers short
content and scrolls tall content without clipping its beginning. Content fills the
available width; apply your own maximum width. Header and Footer are optional.

For example, your application can own a styled content wrapper. Here `cn` is your
application's Tailwind class-merging helper:

```tsx
"use client";

import { DialogPrimitive, type DialogContentProps } from "@umahra/ui";
import { cn } from "@/lib/utils";

interface AppDialogContentProps extends DialogContentProps {
  closeLabel?: string;
}

export function AppDialogContent({
  closeLabel = "Close",
  className,
  children,
  ...props
}: AppDialogContentProps) {
  const appearance = "max-w-lg rounded-xl bg-background p-6 text-foreground shadow-xl";

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-black/40" />
      <DialogPrimitive.Viewport>
        <DialogPrimitive.Content
          {...props}
          className={typeof className === "function"
            ? (state) => cn(appearance, className(state))
            : cn(appearance, className)}
        >
          {children}
          <DialogPrimitive.Close className="absolute end-3 top-3">
            {closeLabel}
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
}
```

Then compose it in a server or client component:

```tsx
<DialogPrimitive.Root>
  <DialogPrimitive.Trigger render={<button className="your-button" />}>
    Edit profile
  </DialogPrimitive.Trigger>
  <AppDialogContent>
    <DialogPrimitive.Header>
      <DialogPrimitive.Title>Edit profile</DialogPrimitive.Title>
      <DialogPrimitive.Description>Update your display name.</DialogPrimitive.Description>
    </DialogPrimitive.Header>
    {/* Your form and actions */}
  </AppDialogContent>
</DialogPrimitive.Root>
```

Dialog parts preserve their client boundaries; static composition can be rendered
from a server component. State, event handlers, refs, and function-valued props
belong in a consumer client component. Root supports `open`, `defaultOpen`,
`onOpenChange`, and Base UI's cancellable change details. Close only after a
successful async submit by controlling `open` in your application; a submit button
does not need to be wrapped in Close.

Use `render`, including its callback form, to compose controls; do not use `asChild`.
When rendering a non-button control, follow Base UI's `nativeButton={false}`
contract. Custom components must forward props and refs. Native attributes, refs,
events, and Base UI's state callbacks for `className` and `style` are retained.
Consumer classes merge after structural defaults on styled parts. DOM parts expose
`data-slot="dialog-…"` hooks and preserve Base UI's state and transition attributes.

Provide Title or an explicit accessible name on Content. Description is optional.
For modal dialogs, render an accessible Close inside Content so touch screen reader
users can leave the dialog. Localize its label in your wrapper. Native keyboard
focus remains visible unless your project deliberately replaces its styling.

The default modal behavior traps focus, locks document scrolling, and prevents
outside interaction. Base UI owns Escape/outside dismissal, nested-dialog behavior,
and initial/return focus; pass `initialFocus`, `finalFocus`, or Root's dismissal
props when needed. In nonmodal and `modal="trap-focus"` modes, Viewport passes
outside pointer interactions through and Content scrolls within the available
height. Overlay is pointer-transparent in all modes; Base UI owns modal outside
interaction safeguards. See the [Base UI Dialog API](https://base-ui.com/react/components/dialog).

For a fixed header/footer with an inner scrolling body, give Content
`className="flex max-h-[calc(100dvh-2rem)] flex-col"`, render your body in
`<div className="min-h-0 flex-1 overflow-y-auto">`, and add `shrink-0` to Header and
Footer. No Body component or scroll-mode prop is required. Consumers can add motion
using Base UI's `data-starting-style` and `data-ending-style` hooks; keep reduced
motion preferences and Base UI's closing lifecycle intact.

The Dialog source is adapted from the official shadcn Base UI registry, retrieved
24 October 2026 at
[`e55b60b`](https://github.com/shadcn-ui/ui/blob/e55b60b1014cccfb9ac62f97e0d20b5b649f4a54/apps/v4/registry/bases/base/ui/dialog.tsx).
Umahra unbundles the portal/overlay/close controls, exposes Base UI Viewport, moves
centering into the scrolling viewport, and removes consumer visual design.

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
there is no additional spacing system.

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

[MIT](LICENSE). Dialog and the CSS recipe are adapted from shadcn/ui, also available under the
[MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

## Credits

[shadcn/ui](https://ui.shadcn.com) provides the theme conventions and CSS foundation
used by Umahra UI. Its approach to composable, customizable components is the
foundation we build on.

Thank you, shadcn, for the care you've put into shadcn/ui and for sharing your work
with the community.
