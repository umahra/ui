# Umahra UI

The independent public workspace for `@umahra/ui`, licensed under MIT.
The initial package is a component-free ESM foundation with TypeScript declarations.
Public npm installation becomes available only after an approved release.

See the [package installation guide](packages/ui/README.md) for the complete project-owned
Tailwind/shadcn CSS recipe and [CONTRIBUTING.md](CONTRIBUTING.md) for development.

Use Node.js 24.16.0 and pnpm 10.34.4:

```sh
nvm use
corepack enable
pnpm --version
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
pnpm --filter @umahra/ui pack --dry-run --json
```

The workspace contains `packages/ui`, shared configuration in `tooling/typescript`,
and guarded worktree cleanup in `scripts`. CI checks the package without backend
services or secrets. Changesets automation opens version PRs; publishing is disabled.
