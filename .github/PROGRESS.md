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

### 2025-08-27 (post-directory-structure)

- Added remaining directories to project structure: `public/brand`, `src/i18n`, `src/utils` and `tests` (via `.gitkeep` files).
- Opened PR #5 (`feat: add directory structure with .gitkeep files`) to merge these changes into `dev`, assigned milestone *MVP v0.1*, and assigned to self.
- Updated `Checkpoint continuo` issue (#3) by checking off the second task.

Next steps:

- Once PR #5 is merged, update `.github/PROGRESS.md` in `dev` accordingly and check off corresponding checkbox in issue #3.
- Begin implementation of calculators in **Group A – Fundamentos** as separate small feature branches (`feat/ohms-law`, etc.). Each calculator should have pure TS functions and tests.
- Continue to create additional directories and files as needed (components, data, i18n) when implementing calculators.
