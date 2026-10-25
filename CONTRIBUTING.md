# Contributing to Umahra UI

## Scope and instructions

This guide governs development and delivery for the public `umahra/ui` repository.
Root `AGENTS.md` directs agents here. Nested instructions refine their own subtree.
Explicit user instructions take precedence. Run commands from the repository root.

`packages/ui` owns the public `@umahra/ui` package; `tooling/typescript` owns shared
private TypeScript configuration. Root `scripts` contains worktree tooling.
`pnpm-workspace.yaml` discovers `apps/*`, `packages/*`, and `tooling/*`; there is
currently no application. Do not add a preview app or documentation infrastructure
without an approved scope. `README.md` is the shared repository and installation
guide, symlinked to `packages/ui/README.md`. Edit that shared file once; its regular
file location ensures the guide is included when packing the UI package.

`packages/ui/src` contains the approved components and public entrypoint. Components
use a React 19 peer and inline Tailwind v4 utility classes. Consumers register
package `dist` with `@source` in their global stylesheet. Keep full utility names
in source and register custom typography sizes with the internal `cn` merger so
same-variant overrides resolve correctly. Each heading selects its own `text-h*`
utility; responsive token values belong in the copied global theme recipe using
`:root` and Tailwind `@variant`, outside `@theme`. The package loads no CSS, fonts,
or runtime theme provider. Add further components only within their approved scope.
Consumers own the README's copied theme CSS, font choices/loading, and overrides.
Use upstream shadcn semantics and Tailwind's existing spacing utilities. Do not add
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

- `pnpm build`: build workspace output with Turbo; the UI package runs `tsc` directly.
- `pnpm typecheck`: check workspace types without emitting JavaScript.
- `pnpm lint`: Biome lint and formatting checks, including root tooling.
- `pnpm format <intended-path>`: format only intended files.
- `pnpm clean`: remove package build output and TypeScript cache, preserving dependencies.
- `pnpm changeset:version`: update package versions/changelogs and the lockfile for a release PR.
- `pnpm worktree:sweep --dry-run`: preview guarded issue-worktree cleanup.

Keep manifests and the lockfile synchronized: after dependency changes run
`pnpm install`, review the lockfile, and confirm `pnpm install --frozen-lockfile`.
Never commit dependencies, caches, environment files, credentials, package archives,
or generated build output. Update the relevant README when commands, installation,
configuration, exports, or user behavior changes.

## Package and artifact boundaries

`packages/ui/tsconfig.json` extends `@umahra/typescript/base.json` for strict checks.
`tsconfig.build.json` emits JavaScript and declarations from `src` into `dist`.
The package root exports ESM `dist/index.js` and types `dist/index.d.ts`.
The JavaScript entrypoint has no side effects; the package exports no stylesheet.
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
declarations resolve without private registry credentials. Check native elements,
attributes, refs, server rendering, theme variables, responsive defaults, and utility
overrides for Heading and Text using the exact README recipe.
For Button, also check variants/sizes, native disabled and form behavior, keyboard
activation/focus, icon names, and Radix Slot child props/events/refs for links.
For Dialog, also check public part/props exports, Base UI render composition and state
callbacks, server/client boundaries, focus/keyboard/dismissal, portal/nested behavior,
modal and nonmodal scrolling, and optional consumer composition. Dialog keeps its
necessary client boundary; the package root preserves per-part client references.
Verify a frozen install in a fresh temporary checkout without inherited
`node_modules` when setup changes.

For CSS recipe changes, copy the exact documented recipe into the temporary
consumer. Install the documented build dependencies, compile it, and inspect a
plain HTML page in a browser. Check neutral light/dark palettes, semantic surface
and foreground pairs, dark utilities, normal spacing, derived radii, project theme
overrides, and project-owned font loading. Keep verification fixtures/screenshots
outside source and package output. Stop servers started for checks.

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
