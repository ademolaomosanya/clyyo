# PNPM Workspace Setup

Clyyo uses a pnpm workspace because the project is a monorepo.

That means this one repository contains multiple apps and packages:

```txt
apps/web          Frontend app
apps/api          Backend API
apps/worker       Background worker
packages/database Shared database code
packages/types    Shared TypeScript types
packages/validation Shared validation schemas
packages/ui       Shared React UI components
```

## Important Files

### package.json

The root `package.json` describes the whole repository.

It has scripts that can run across all apps and packages:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
```

### pnpm-workspace.yaml

This file tells pnpm which folders are part of the workspace.

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

This means every direct folder inside `apps` and `packages` can be treated as its own package.

### tsconfig.base.json

This is the shared TypeScript config.

It also creates path aliases:

```ts
import type { UserRole } from "@clyyo/types";
```

Instead of writing long relative paths like this:

```ts
import type { UserRole } from "../../../packages/types/src";
```

## How To Install PNPM

First, install Node.js 20 or newer.

After Node is installed, the recommended way to enable pnpm is:

```bash
corepack enable
corepack prepare pnpm@10.0.0 --activate
```

Then check:

```bash
node --version
pnpm --version
```

## How To Install Dependencies

From the repo root:

```bash
pnpm install
```

For now, this repo has workspace config but no real framework dependencies installed yet.

The next step is to create the actual apps:

1. Next.js in `apps/web`
2. NestJS API in `apps/api`
3. NestJS worker in `apps/worker`

