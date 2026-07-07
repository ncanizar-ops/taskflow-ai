# TaskFlow AI

## Tech Stack
- Frontend: React 18 + TypeScript + Vite
- Styling: Tailwind CSS v4 (via `@tailwindcss/vite`, no config file)
- State: Zustand (with `persist` middleware → localStorage)
- Persistence: localStorage key `taskflow-storage`

## Conventions
- Components: PascalCase, one component per file under `src/components/`
- Store lives in `src/store/taskStore.ts`; export types alongside the store
- Commits: conventional commits (feat:, fix:, chore:)
- Always use `const` over `let`
- Accent color is orange; expose it via the `--color-accent` theme token, never hardcode hex in components

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Type check: `npm run typecheck`
- Lint: `npm run lint`

## Important
- All persisted state flows through the Zustand store — never touch localStorage directly
- Task `id`s use `crypto.randomUUID()`
- Overdue = `dueDate` in the past AND not completed
