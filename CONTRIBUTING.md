# Contributing to Umahra UI

## Scope and instructions

This guide governs development and delivery for the public `umahra/ui` repository.
Root `AGENTS.md` directs agents here. Nested instructions refine their own subtree.
Explicit user instructions take precedence. Run commands from the repository root.

`packages/ui` owns the public `@umahra/ui` package; `tooling/typescript` owns shared
private TypeScript configuration. Root `scripts` contains worktree tooling.
`pnpm-workspace.yaml` discovers `apps/*`, `packages/*`, and `tooling/*`; there is
currently no standalone application. The approved development playground lives in
`packages/ui/playground`; Vite serves the component source for manual visual and
interaction checks. Keep new documentation infrastructure within approved scope. `README.md` is the shared repository and installation
guide, symlinked to `packages/ui/README.md`. Edit that shared file once; its regular
file location ensures the guide is included when packing the UI package.

`packages/ui/src` contains the approved components and public entrypoint. Keep each
component family in its own folder: multipart families use a neutral `index.ts` entry
and a `<component>.parts.tsx` implementation; single components use `index.tsx`.
Keep shared helpers such as `cn.ts` and the package `index.ts` at the source root.
Keep related companions in that family and expose them through its neutral entry:
`button` contains Button and Button Group; `input` contains Input and Input Group; `radio` contains Radio Group. Implementations
import sibling implementations directly to avoid entrypoint cycles. Components
use a React 19 peer and inline Tailwind v4 utility classes. Consumers register
package `dist` with `@source` in their global stylesheet. Keep full utility names
in source and register custom typography sizes with the internal `cn` merger so
same-variant overrides resolve correctly. Each heading selects its own `text-h*`
utility; responsive token values belong in the copied global theme recipe using
`:root` and Tailwind `@variant`, outside `@theme`. The package loads no CSS, fonts,
or runtime theme provider. Add further components only within their approved scope.
Consumers own the README's copied theme CSS, font choices/loading, and overrides.
Use upstream shadcn semantics. Visual styles, including transitions, animations,
opacity effects, motion transforms, padding, margins, gaps, and space utilities,
belong to the consuming project design system and playground examples, never
primitive defaults. Preserve upstream presence handling and state attributes so
projects can add their own motion. Use
alignment and positioning for required anatomy and overflow-safe centering. Do not add
speculative UI APIs, theme vocabularies, or sizing abstractions.

## Setup and scripts

Use Node.js **24.22.1**, pinned in `.nvmrc` (supported minimum 22.18), and pnpm
**10.34.4**, pinned in `package.json`. Git is required for worktrees; GitHub CLI
with access to `umahra/ui` is required for delivery and guarded cleanup.
No backend services, private registries, or local environment files are required.

```sh
nvm use
corepack enable
pnpm --version
pnpm install --frozen-lockfile
```

Confirm pnpm's version before installing. Root `package.json` owns script definitions:

- `pnpm build`: build workspace output with Turbo; the UI package runs `tsdown`.
- `pnpm dev`: open the Vite component playground at `http://127.0.0.1:5173`.
- `pnpm --filter @umahra/ui dev:package`: rebuild the library with tsdown in watch mode.
- `pnpm --filter @umahra/ui build:playground`: build the showcase into `.playground-dist`.
- `pnpm --filter @umahra/ui preview`: serve that showcase build at `http://127.0.0.1:4173`.
- `pnpm typecheck`: check workspace types, including build configuration, without emitting JavaScript.
- `pnpm lint`: Biome lint and formatting checks, including root tooling.
- `pnpm format <intended-path>`: format only intended files.
- `pnpm clean`: remove library/playground build output and TypeScript cache, preserving dependencies.
- `pnpm changeset:version`: update package versions/changelogs and the lockfile for a release PR.
- `pnpm worktree:sweep --dry-run`: preview guarded issue-worktree cleanup.

Keep manifests and the lockfile synchronized: after dependency changes run
`pnpm install`, review the lockfile, and confirm `pnpm install --frozen-lockfile`.
Never commit dependencies, caches, environment files, credentials, package archives,
or generated build output. Update the relevant README when commands, installation,
configuration, exports, or user behavior changes.

## Component playground

The Vite playground displays every public component and consumer-owned wrappers.
Use it for development with React Fast Refresh, light/dark themes, narrow layouts,
RTL, loading/disabled/error states, native forms, and Dialog focus/dismissal/scrolling.
When adding a public component, add its relevant examples here. Example appearance
classes and theme CSS stay in the playground; do not move them into primitives.

The playground imports individual `src` modules for immediate feedback, using
named primitive namespace imports for multipart components and named imports for single parts. Its stylesheet starts from the
README theme recipe and registers package source with Tailwind. Keep those theme
values aligned when the installation recipe changes. Typecheck and lint include
playground code. `build` remains the tsdown library build; `build:playground` is a
separate Vite application build. Neither the Vite config nor playground source or
`.playground-dist` belongs in the published artifact. Do not point Vite at `dist`.

The playground supports manual checks; it is not a screenshot comparison runner
or proof that the npm archive or Server Component boundaries work. Keep real
package tarball and framework-consumer verification outside the repository. No
automated tests, test scripts, or testing dependencies are introduced.

## Package and artifact boundaries

`packages/ui/tsconfig.json` extends `@umahra/typescript/base.json` for strict checks.
`tsdown.config.ts` builds ESM JavaScript and declarations from `src` into `dist`,
using `tsconfig.build.json` for declaration generation. Unbundle mode preserves
module boundaries and the Button/Dialog/Input/Radio Group/Select/Switch client directives; keep the root entrypoint
server-compatible. Runtime dependencies and React peers stay external.
The package root exports ESM `dist/index.js` and types `dist/index.d.ts`. Explicit
component subpaths expose accordion, breadcrumb, button, carousel, checkbox, dialog, field, heading, input, label,
popover, radio, select, sheet, slider, switch, text, and textarea JS/declarations.
The button subpath exports Button and Button Group.
The input subpath exports both Input and Input Group; radio exports Radio Group.
Multipart entrypoints export named namespace objects and props types; consumers
use `import { ButtonPrimitive } from "@umahra/ui/button"`. Each neutral entry
module assembles its namespace from a separate `.parts.tsx` implementation;
client directives stay with the parts that need them. Single-component modules
retain their existing named exports. The root re-exports the same namespaces and
types. Do not export a namespace object from a client module.
The entrypoints have no side effects; the package exports no stylesheet.
Do not advertise CommonJS, wildcard, or further exports before they exist.

The archive allowlist is `dist`, `README.md`, and `LICENSE`, plus package
metadata included by the packer. Keep root/package MIT license texts identical and
preserve upstream notices in adapted material, including the README CSS recipe.
Inspect both the pack dry-run and actual tarball before delivery. Public artifacts
must exclude private source, configuration, previews, fixtures, assets, and secrets.

For a releasable package change, run `pnpm changeset`, select the affected package
and semver bump, and commit its `.changeset/*.md` entry with the change. Write a
sentence describing the user-visible effect. Root tooling and documentation-only
changes need no changeset. `@umahra/typescript` remains private and excluded from
versioning/publishing. Package versions and changelogs are updated through version
PRs before publication.

Public packages use MIT, repository metadata for `https://github.com/umahra/ui`,
public npm access, and `https://registry.npmjs.org`. Only the workspace root and
internal tooling are private. Add runtime and peer dependencies when actual code
requires them, rather than predeclaring hypothetical component contracts.

## Verification

Do not add automated tests, test scripts, testing dependencies, or a test suite.
Use static checks, builds, artifact inspection, and manual consumer/browser checks.
For package, configuration, dependency, or structural changes, run:

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
pnpm --filter @umahra/ui pack --dry-run --json
pnpm exec changeset status
cmp LICENSE packages/ui/LICENSE
git diff --check
```

Pack a real archive outside the repository with
`pnpm --filter @umahra/ui pack --out /absolute/scratch/path/umahra-ui.tgz`.
Inspect it with `tar -tzf`, review its metadata, and install it into a fresh external
temporary consumer. Confirm the expected component exports and TypeScript root
declarations resolve without private registry credentials. Verify every component
subpath, its public props types, and Server Component use of both named component
namespaces and the compatible root namespace objects. Check native elements,
attributes, refs, server rendering, theme variables, responsive defaults, and utility
overrides for Heading and Text using the exact README recipe.
For Button, check public Root/Content/Loader parts and extensible props types,
string-only className, Base UI render composition and style callbacks, refs/events,
keyboard activation/focus, disabled/busy and native form behavior, optional consumer loaders,
and centered loading overlays with stable content dimensions. Consumers own visual
variants, sizing and loader graphics; the library ships structural styles only.
For Button Group, check Root/Text/Separator and their extensible props through the
existing button subpath and package root, native Root and client companion boundaries,
render/style composition where supported, refs/events, accessible names, normal Tab
order, disabled/loading children, native forms, horizontal/vertical joins, visible
focus stacking, optional separators/text, labels and input composition, nested groups,
split Popover actions, RTL, themes, narrow layouts and consumer sizing/spacing overrides.
No separate button-group export or build entry is added.
For Dialog, also check public part/props exports, string-only className, Base UI
render composition and style callbacks, server/client boundaries, focus/keyboard/dismissal, portal/nested behavior,
modal and nonmodal scrolling, and optional consumer composition. Dialog keeps its
necessary client boundary; the package root preserves per-part client references.
For Sheet, check all ten public parts and extensible props through the sheet subpath
and package root, generic payloads, string-only className, refs/events and Base UI
render/style composition. Verify four physical edges, controlled/uncontrolled state,
modal/nonmodal/trap-focus behavior, focus return, nested and outside dismissal,
viewport-bounded internal scrolling, absence of default motion/visual effects, optional overlay/layout parts,
visible native focus, RTL/themes/narrow layouts and consumer sizing overrides.
Consumers compose Portal explicitly and supply an accessible name and close control;
no icon, spacing, visual recipe, swipe gesture or snap-point API is bundled.
Preserve the neutral namespace entrypoint and client implementation boundary.
For Input, check the standalone InputPrimitive and extensible InputProps root
exports, string-only className, Base UI render composition and style callbacks,
refs/events, controlled/uncontrolled values, native forms and file selection,
labels/descriptions/errors, disabled/readOnly/required states, visible focus,
optional Base UI Field integration, shrinking layouts and consumer utility overrides.
Preserve Input's client implementation boundary and the neutral input family entry
and package root. Import Input Group and all its props from `@umahra/ui/input`.
For Label and Textarea, check standalone primitive/props root exports, native refs
and events, explicit and wrapping label associations, controlled/uncontrolled
textarea values, forms/reset, disabled/readOnly/required/invalid states, native
standalone focus, and consumer sizing/resize overrides. Keep these native-only
modules server-compatible; Input Group reuses Textarea and examples use Label.
For Field, check all ten parts and extensible props, vertical/horizontal/container-
responsive layouts, Set/Legend semantics and native disabled propagation, explicit
label/description/error IDs, Input/Textarea/Input Group composition, choice-card
labels, consumer-owned invalid state, deduplicated error lists and empty errors,
separator content, overrides, and Server Component use. Field is a native
composition layer, not the Base UI validation context; its separator retains the
Base UI foundation. Keep namespace assembly in each neutral component entrypoint.
For Input Group, check all six parts and public props types, inline/block addon
ordering (including RTL), native input/textarea refs and events, composed addon
click handlers and preventDefault, text-addon focus, interactive addon focus,
optional addons, disabled/invalid state, action button forms/loading, consumer
layout overrides, container-owned borders/focus with no inner input/textarea
outline or ring, visible fallback group focus, independent action-button focus,
and the client boundary. Use the shared playground for these
visual/interaction cases; use external consumers only for artifact/type/boundary checks.
For Select, check all twenty-two public parts and props types, generic single/multiple
values, object equality and serialization, controlled/uncontrolled selected/query/open
state, native forms/reset, refs/events, render/style composition, accessible naming,
disabled/read-only/error states, filtering and empty announcements, input-in-popup
and inline-input compositions, chip rendering/removal/keyboard navigation, grouped
collections, long-list scrolling and nonmodal page scrolling, nested Dialog portals,
RTL/themes/narrow layouts, and consumer overrides. SelectPrimitive uses Base UI
Combobox; its modal behavior is fixed false. Value and Collection render no DOM.
ItemText and scroll-arrow parts from the unpublished Select foundation are removed.
Keep Select client boundaries and neutral namespace/root imports intact.
For Switch, check Root/Thumb exports and extensible public props, string-only
className, refs/events and cancellation, render/style composition, neutral entrypoints
and client boundaries, controlled/uncontrolled state, keyboard/focus, accessible names,
wrapping and sibling labels, disabled/read-only/required/invalid states, form values
and consumer-owned reset, optional Thumb, consumer dimensions/spacing overrides,
logical thumb travel in RTL, light/dark themes and narrow layouts in the shared playground.
For Checkbox, check Root/Indicator exports and extensible public props, string-only
className, refs/inputRef, render/style composition, neutral entrypoints and client
boundaries, controlled/uncontrolled and indeterminate states, cancellation, native
form values/required validation and consumer-owned reset, keyboard/focus, disabled
and read-only states, names/descriptions/errors, optional/custom/keepMounted
indicators and consumer exit animations, wrapping/sibling labels, themes, RTL,
narrow layouts and utility overrides in the shared playground.
For Radio Group, check Root/Item/Indicator exports and extensible generic props,
string-only className, refs/inputRef, render/style composition, neutral entrypoints
and client boundaries, controlled/uncontrolled state and cancellation, native form
values/required validation and consumer-owned reset, keyboard/focus, disabled and
read-only states, names/descriptions/errors, optional/custom/keepMounted indicators,
choice cards, themes, RTL, narrow layouts and consumer utility overrides in the playground.
For Slider, check all seven parts and public props, generic scalar/readonly-array
values, string-only className, render/style composition, div/input refs and input
events, neutral entrypoints and client boundaries, controlled/uncontrolled state,
change/commit cancellation, single/range/multiple thumbs and explicit SSR indexes,
accessible names/value text, disabled/invalid state, native forms and consumer reset,
keyboard/focus, pointer dragging, steps/minimum distance/collisions, horizontal and
vertical geometry, optional Label/Value/Indicator, RTL DirectionProvider, themes,
narrow layouts and consumer dimensions/utility overrides in the shared playground.
For Accordion, check all five parts and extensible props through the accordion
subpath and package root, generic values, string-only className, refs/events,
render/style composition and client boundaries. Verify controlled/uncontrolled
single/multiple state, cancellation, disabled items/root, heading associations,
Tab/Shift+Tab and Enter/Space behavior, closed-panel focus exclusion, nested state,
keepMounted drafts, hiddenUntilFound browser search, consumer motion/reduced motion,
dynamic content, themes, RTL, narrow layouts and consumer utility overrides in
the shared playground. Content maps directly to Base UI Panel; icons, spacing and
motion stay consumer-owned.
For Carousel, check all six parts and extensible props through the carousel subpath
and package root, native refs (including viewport callback cleanup), Base UI button
render/style composition, string className, neutral entrypoints and client boundaries.
Verify optional navigation, pointer dragging, horizontal/vertical geometry, responsive
slide sizing, RTL direction, selection/reInit cleanup, dynamic/empty slides, boundaries,
looping, disabled/loading controls, event cancellation, root-only arrow shortcuts,
descendant key isolation, focus reveal, native forms, reduced motion, themes, narrow
layouts and consumer overrides in the shared playground. Retain Embla's functional
scrolling transforms; spacing, appearance, icons and optional plugins stay consumer-owned.
For Breadcrumb, check all seven parts and extensible props through the breadcrumb
subpath and package root, native refs/events, string-only className and Base UI
Link render composition. Verify nav/ordered-list/current-page semantics, naming,
decorative Separator/Ellipsis, optional parts, native keyboard focus, long-label
wrapping, themes, RTL, narrow layouts and consumer overrides in the shared playground.
Keep native parts and namespace assembly server-compatible, with the Link client
boundary preserved. Consumers own icons, spacing and any collapsed-route behavior.
For Popover, check all nine public parts, typed handles/payloads and extensible
props through the popover subpath and package root, string-only className,
refs/events, render/style composition and client boundaries. Verify controlled
and uncontrolled state, cancellation, initial/return focus, keyboard and outside
dismissal, all modal modes with an internal Close, explicit/custom/keepMounted
portals, collision-aware logical positioning, available-space scrolling, nested
Popover/Dialog dismissal, optional semantic companions, native focus, themes, RTL,
narrow/desktop layouts and consumer utility overrides in the shared playground.
Keep default appearance, spacing, width and motion consumer-owned.
Verify a frozen install in a fresh temporary checkout without inherited
`node_modules` when setup changes.

For CSS recipe changes, copy the exact documented recipe into the temporary
consumer. Install the documented build dependencies, compile it, and inspect a
plain HTML page in a browser. Check neutral light/dark palettes, semantic surface
and foreground pairs, dark utilities, normal spacing, derived radii, project theme
overrides, and project-owned font loading. Keep temporary verification fixtures/screenshots
outside the repository and package output; the maintained playground is the approved exception. Stop servers started for checks.

For documentation-only changes, check referenced paths, commands, links, and
instruction consistency, and run `git diff --check`. Executable checks are not
applicable when no code/configuration/package or visible behavior changes.

Record required checks as passed, failed, skipped, pending, unavailable, or not
applicable, with commands, reasons, and sanitized evidence. Distinguish baseline
failures from regressions. Missing evidence is not a pass. CI performs frozen
installation, lint, type checking, build, and pack dry-run without services/secrets.

## Workspaces and version control

The initial repository bootstrap is explicitly authorized directly on `main` in
one coherent Conventional Commit, without an issue worktree or PR. This exception
applies only to bootstrap. Review all tracked files before the first public push;
never copy private Git history or unrelated application source into this repository.

Later tracked issues use one isolated `.worktrees/<issue-key>` checkout per issue
from freshly fetched `origin/main`. Before creating one, check existing worktrees
and issue branches. Reuse matching work; never nest worktrees or reuse another
issue's checkout. Preserve the primary checkout and unrelated changes.

```sh
git fetch origin main
git worktree add -b codex/<issue-key>-<short-slug> .worktrees/<issue-key> origin/main
```

Use a lowercase issue key, such as `uma-123`. Commands containing angle-bracket
placeholders must be filled in first. Install dependencies inside the worktree;
no environment files or private setup are needed. Do not silently incorporate
uncommitted primary work or unrelated local commits.

Preview cleanup with `pnpm worktree:sweep --dry-run`, inspect active sessions,
and obtain explicit cleanup authorization before an actual sweep. The copied
script considers only `.worktrees/` entries and keeps dirty, current, locked,
unmerged/open-PR, unpushed, or recently merged work (24-hour grace by default).
An actual sweep can remove worktrees and local/remote branches.

## Commits, pull requests, and acceptance

Use a Conventional Commit subject with a lowercase imperative description, such
as `feat: establish public ui package foundation`. A later issue PR contains one
commit; its title equals that subject. Keep the commit body a few short lines
about the overall result, separate from the PR description.

Amend your own issue commit as work evolves. Publish issue branches to `origin`;
after amending a pushed branch use `git push --force-with-lease`. Never rewrite
shared history without coordination, force-push `main`, or commit directly to
`main` after the bootstrap exception without explicit authorization. When rebasing
onto current `origin/main`, rerun affected checks and preserve unrelated commits.

Create a draft PR against `main` after the first coherent checkpoint. Use sections
`Summary` (outcome and reason), `Verification` (checks, evidence, and limitations),
and `Risks` (material concerns or none identified). Keep private issue links and
internal discussions out of public descriptions. Issue-linked branch names retain
tracker association. Attach required visual evidence for visual changes.

Keep PRs draft until required checks pass (or documented exceptions are accepted)
and the user explicitly approves readiness. Review approval and fix approval are
separate gates. Resolve review threads after addressing or answering their concern.
Do not merge or mark an issue complete without the user's acceptance. A draft PR
alone does not complete an issue or authorize its successor.

Maintainers squash-merge after approval; agents merge only on explicit request.
Set squash **Commit message** to the single commit subject/PR title and **Extended
description** to that commit's short overall-change body, not the PR description.

## Version automation and publication

Changesets opens or updates `chore(release): version packages` PRs on `main`.
The `release.yaml` workflow runs only from `main` on GitHub-hosted runners. It
installs the locked dependencies, checks lint and types, builds, and inspects the
package before running `changesets/action@v1.5.3` to create or update the version PR.

The action uses `version: pnpm run changeset:version` and
`publish: npx changeset publish`. Pending Changesets create or update a version PR.
When no Changesets remain, the action publishes public packages whose committed
versions are not already on npm; rerunning it skips published versions. Merging
a version PR therefore automatically publishes its new package versions after
the release checks pass, then creates package Git tags and GitHub releases.

Publication uses npm trusted publishing through OpenID Connect (OIDC), with
`id-token: write` on the release job. npm's trusted publisher must match
`umahra/ui` and the exact workflow filename `release.yaml`. The pinned Node.js
runtime includes an npm CLI supporting OIDC. No npm publishing token is stored or
passed to the workflow. Publishing, package tags, and GitHub releases use the
Changesets action's standard behavior.

Use the Release workflow's **Run workflow** action on `main` to retry a failed
publication after resolving its cause. Inspect npm and the run before retrying;
never change or reuse a version that was already published.

Repository Actions settings must allow GitHub Actions to create PRs. The bootstrap
enables this setting when account access permits; otherwise record the owner action.
Bot-created PRs may need **Approve workflows to run** before CI starts. Inspect
checks and version/changelog/lockfile changes before accepting a version PR.

The approved continuous delivery workflow publishes versions accepted through
version PRs and creates their package tags and GitHub releases. Agents still
require an explicit merge request before integrating a version PR. npm
trusted-publisher changes and deployment require separate explicit approval. Do
not run version mutation or publication merely to verify a change.
Review staged source, diffs, archives, and metadata for private data, credentials,
unintended formatting churn, and unrelated files before every commit and push.
