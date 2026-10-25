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

[MIT](LICENSE). The CSS recipe is adapted from shadcn/ui, also available under the
[MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

## Credits

[shadcn/ui](https://ui.shadcn.com) provides the theme conventions and CSS foundation
used by Umahra UI. Its approach to composable, customizable components is the
foundation we build on.

Thank you, shadcn, for the care you've put into shadcn/ui and for sharing your work
with the community.
