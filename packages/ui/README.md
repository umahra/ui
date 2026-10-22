# @umahra/ui

A component-free foundation for the public Umahra UI library. The initial ESM entrypoint
exports no runtime APIs. It includes TypeScript declarations and has no runtime or peer
dependencies. Components and their peer contracts will be introduced separately.

## Installation

Public npm installation is available only after a separately approved release.
Once a version has been published, install and upgrade explicitly:

```sh
pnpm add @umahra/ui
```

The package contains no CSS assets, theme files, fonts, or runtime theme provider.
Your project owns its CSS, theme overrides, fonts, and font loading.

1. Set up Tailwind CSS v4 using the [official instructions for your framework](https://tailwindcss.com/docs/installation).
   For plain HTML, follow the [Tailwind CLI guide](https://tailwindcss.com/docs/installation/tailwind-cli).
2. Install the build-time packages imported by the recipe:

   ```sh
   pnpm add -D tailwindcss@4.3.3 shadcn@4.21.4 tw-animate-css@1.4.0
   ```

   Keep your framework's Tailwind adapter on the compatible v4 version. For the plain HTML
   CLI path, also run `pnpm add -D @tailwindcss/cli@4.3.3`.
3. Copy the complete recipe below into your project's global stylesheet, and load that
   stylesheet through your framework entrypoint. For plain HTML, compile with
   `pnpm exec tailwindcss -i ./input.css -o ./output.css` and link `output.css` from the page.
   Replace an existing Tailwind import rather than duplicating it.

These recipe dependencies belong to the consuming project's build. No import points
into `@umahra/ui`. No component utilities, React dependencies, or shadcn scaffolding
are needed for this foundation.

## Project-owned global stylesheet

This is the neutral light/dark recipe from [shadcn's manual installation guide](https://ui.shadcn.com/docs/installation/manual).
It keeps the upstream semantic names, foreground pairs, Tailwind mappings, dark variant,
base styles, and radius relationships. The numeric radius is `0.625rem` without a space.

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

## License and upstream notice

The package is [MIT licensed](LICENSE). The CSS recipe is adapted from
[shadcn/ui](https://github.com/shadcn-ui/ui), also MIT licensed. Its notice follows:

```text
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
