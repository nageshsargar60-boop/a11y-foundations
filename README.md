
# A11y Lab — React + TypeScript Playground

A responsive learning project for the internship Foundations assignment: custom modal dialog, tabs, and disclosure components, plus Radix-based shadcn-style Dialog and Tabs demos.

## Requirements

- Node.js 20.19+ or 22.12+ recommended for current Vite releases
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Validate

```bash
npm run typecheck
npm run build
npm run lint
```

`npm run lint` runs the included ESLint flat configuration.

## Folder structure

```text
playground/
  ModalDialog.tsx       # Hand-built modal with keyboard focus loop
  Tabs.tsx              # Hand-built tabs with arrows, Home, End
  Disclosure.tsx        # Hand-built disclosure button + controlled panel
src/
  components/ui/
    dialog.tsx           # Radix Dialog wrapper, shadcn-style source
    tabs.tsx             # Radix Tabs wrapper, shadcn-style source
  lib/utils.ts           # cn() utility
  App.tsx                # Interactive demo page
  index.css              # Design tokens and responsive styles
NOTES.md                 # Comparison and keyboard checklist
```

## Assignment step: install shadcn/ui and inspect generated source

The demo includes typed Radix-based wrappers so the project can demonstrate both custom and primitive-based interactions. To complete the explicit CLI/source-review step against the current shadcn CLI version, run these commands from the project root and follow any prompts:

```bash
npx shadcn@latest init
npx shadcn@latest add dialog tabs
```

If the CLI asks to overwrite existing `src/components/ui/dialog.tsx` or `src/components/ui/tabs.tsx`, **do not blindly overwrite**. Back up or compare the existing files first, then inspect the generated versions. shadcn CLI options can change, so follow the prompts for the installed version. The `components.json` file contains the project configuration.

After generation, read both files and update `NOTES.md` with the actual differences you observe. shadcn/ui copies component source into your project; Dialog and Tabs behavior is powered by Radix primitives.

## Keyboard-only testing

Use the mouse to open each demo initially, then put the mouse aside and use the keyboard:

- Modal: Tab, Shift+Tab, Escape. Check focus returns to the opener.
- Tabs: Tab to the active tab, then Left / Right Arrow, Home, End, and Tab into the panel.
- Disclosure: Tab to each disclosure button, then press Enter or Space.
- Repeat at 375px and 1280px viewport widths.

Use browser devtools and, if available, a screen reader to supplement keyboard testing. Automated type checks do not prove accessibility.

## GitHub and deployment

```bash
git init
git add .
git commit -m "feat: build accessible component playground"
```

Create an empty repository on GitHub, then add the remote URL GitHub gives you:

```bash
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Import the repository into Vercel to create a deployment. This is a static Vite app, so Vercel should detect Vite; use `npm run build` as the build command and `dist` as the output directory. Verify the deployed URL and check the build logs before submitting.

## Notes

No API keys or secrets are needed. `.env.example` is included as a placeholder and `.env*` files are ignored except `.env.example`.
