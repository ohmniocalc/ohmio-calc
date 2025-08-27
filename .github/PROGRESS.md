# Project Progress

This file documents the progress of building the ohmio-calc project.

## 2025-08-27

- Initialized repository `ohmio-calc` with public visibility.
- Created initial issue (#1) "Project bootstrap" with checklist and milestone "MVP v0.1".
- Set up Kanban project board "Ohmio Calc Kanban" with Backlog, In progress, Review, Done.
- Created branch `dev` from `main`.
- Added initial configuration files:
  - `package.json` with dependencies and scripts for Astro, React, TypeScript, Tailwind.
  - `astro.config.mjs` with React and Tailwind integrations.
  - `tsconfig.json` with standard TypeScript options for Astro.
  - `tailwind.config.js` with color tokens and dark mode.
  - `.gitignore` to ignore node_modules, dist, build, etc.
  - `postcss.config.js` with Tailwind and autoprefixer.
  - CI workflow `.github/workflows/ci.yml` with pnpm install, lint, test, build.
  - Deploy workflow `.github/workflows/deploy.yml` to build and deploy to GitHub Pages.
- Next steps:
  - Add `.github/PROGRESS.md` (this file) to document progress and tasks.
  - Create `README.md` with project overview, architecture, setup and contribution instructions.
  - Add `src/pages/index.astro` as initial Astro page.
  - Add other essential files and directories per project structure.


  - Continue implementing calculators as per the defined groups and open PRs accordingly.

### 2025-08-27 - Progress update

- [x] Added `.github/PROGRESS.md` to track progress and tasks.
- [x] Created `README.md` with project overview, architecture, setup and usage instructions.
- [x] Added initial Astro page at `src/pages/index.astro`.
- [ ] Create directories `src/components`, `src/features`, `src/styles`, `src/data`, `src/i18n`, `src/utils`, and `tests`.
- [ ] Start implementing calculators for Group A (Fundamentos eléctricos), beginning with Ley de Ohm.
