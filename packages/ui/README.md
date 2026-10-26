# Umahra UI

Umahra UI is a public UI library for building websites, using the theme conventions
of [shadcn/ui](https://ui.shadcn.com). You can use shadcn components alongside Umahra
UI and customize them with the same project-owned theme CSS.

The library provides composable UI primitives and an optional DesignSystem page
for documenting your theme and components.

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

- [Tailwind CSS v4](https://tailwindcss.com/docs/installation) configured for your framework.
- `shadcn` installed so the `shadcn/tailwind.css` import resolves. See the
  [official shadcn setup guide](https://ui.shadcn.com/docs/installation).
- `tw-animate-css` installed for the animation styles imported by the stylesheet.

These are build-time dependencies of your project. Your project also owns its
global stylesheet and font loading.

## Installation

### 1. Install the package

Install `@umahra/ui` with:

```sh
pnpm add @umahra/ui
```

### 2. Configure styles

Copy this single template into your project's global CSS file and load it once
from your application entry or root layout. It includes the theme colors, radii,
body and heading typography, responsive values, and base styles.

Adjust the `@source` path relative to this CSS file. Tailwind uses it to scan the
installed package and generate styles for its classes, including DesignSystem.
The package ships no stylesheet.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@source "../node_modules/@umahra/ui/dist";

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

Customize the values in this template for your project. Add `class="dark"` to the
`html` element to use the dark palette. Use semantic utilities such as
`bg-primary text-primary-foreground` and ordinary Tailwind spacing utilities.
The `rounded-*` values derive from `--radius`.

Heading uses `text-h1` through `text-h6`; Text uses `text-body`. Both inherit font
family. Choose families with `font-sans`, `font-serif`, or `font-mono`, and load
fonts in your application with a framework loader, `@font-face`, or a font package.
DesignSystem loads a separate font for its documentation; previews use your fonts.

You own this CSS template. Package upgrades do not overwrite it. See
[Tailwind theme variables](https://tailwindcss.com/docs/theme) and
[shadcn theming](https://ui.shadcn.com/docs/theming) for customization.

### 3. Design System

Render `DesignSystem` on a dedicated page after loading your global CSS above.
It displays your theme's **Colors** and **Fonts & Typography** automatically.
Pass a `components` array to add the components you want to document.

This complete page adds a Button section with a working preview and its code:

```tsx
"use client";

import { ButtonPrimitive as Button } from "@umahra/ui/button";
import { DesignSystem, type DesignSystemComponent } from "@umahra/ui/visualiser";

const components = [
  {
    id: "button",
    name: "Button",
    description: "Buttons trigger actions.",
    importCode: 'import { ButtonPrimitive as Button } from "@umahra/ui/button";',
    examples: [
      {
        title: "Primary",
        usage: `<Button.Root className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
  Continue
</Button.Root>`,
        preview: (
          <Button.Root className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Continue
          </Button.Root>
        ),
      },
    ],
  },
] satisfies DesignSystemComponent[];

export default function DesignSystemPage() {
  return <DesignSystem components={components} />;
}
```

Each entry in `components` becomes a navigation section:

- `id` is its unique lowercase URL anchor; `name` and `description` label the section.
- `importCode` is an optional import snippet displayed above its examples.
- `examples` contains a unique `title`, the `preview` JSX to render, and the `usage`
  string to show in the Code tab. Keep the string in sync with the preview.

Add more examples to the same component or more entries to `components`.
For interactive examples, keep state and handlers in your page or preview
components. Previews stay mounted when switching between Preview and Code.
In Next.js App Router, keep this composition in a client component, as above.

#### Custom colors and typography

The built-in foundations inspect the standard theme variables and Heading/Text
styles. To include additional project styles, pass `colors` and `typography`:

```tsx
<DesignSystem
  components={components}
  colors={[{ name: "Brand", variable: "--brand" }]}
  typography={[
    { name: "Display", className: "font-serif text-4xl font-semibold leading-tight" },
  ]}
/>
```

Here, `--brand` must already be defined in your global CSS template. A custom
color entry names a CSS variable; a typography entry supplies the classes to
render. These arrays append to the built-in foundations.

Colors display and copy their CSS values. Typography displays the computed font
family stack, size, weight, and line height, including responsive classes and
inherited styles. Measurements refresh when the theme, styles, fonts, or viewport
change. The family stack does not identify which font renders each glyph.

DesignSystem supplies the page header and navigation. It uses your theme
background, respects inherited direction and theme classes, and keeps component
previews styled by your project. No additional stylesheet import is needed.

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
