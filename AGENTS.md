# AGENTS.md

## Cursor Cloud specific instructions

Expositio is a **frontend-only** presentation template system (a reveal.js-based
library). There is no backend, database, or external service. Node 22 / npm 10 are
used here; `package.json` `engines` only requires Node >= 16 / npm >= 8.

### Services / how to run

There is a single service: the Vite dev server.

- Run it with `npm run dev` (serves `index.html` at `http://localhost:3000`, with HMR).
- The dev server binds `host: true` and has `open: true`; in a headless VM the
  auto-open of a browser is a harmless no-op. Verify it works with
  `curl http://localhost:3000/`.
- Reveal.js, Chart.js, and the highlight/theme CSS are loaded from public CDNs
  (cdnjs / jsdelivr), so the presentation needs outbound network access to render.
  CDN egress is available in this environment.

### Known pre-existing breakages (do NOT "fix" as part of setup)

These are bugs in the committed code, unrelated to environment setup. They are
documented here so future agents don't rediscover them or mistake them for setup
problems:

- **`npm run build` fails.** `src/styles/components/_slides.scss` (line ~328) and
  `src/styles/components/_navigation.scss` (line ~74) call an undefined SCSS mixin
  `active-state`. The mixin defined in `src/styles/core/_mixins.scss` is named
  `active` (no `-state`). This blocks `vite build`, so `dist/main.umd.js` and
  `dist/main.css` are never produced.
- **Auto-init doesn't work in dev.** Both `index.html` and `demo.html` load the
  library via `<script src="./dist/main.umd.js">`. Because the build is broken,
  that file is missing (Vite serves the SPA fallback HTML for it), so reveal.js is
  loaded from CDN but never initialized and the page appears blank. Reveal.js
  itself works: running `Reveal.initialize({ hash:true, controls:true, progress:true })`
  in the browser console renders a fully functional slideshow (navigation,
  fragments, overview mode all work).
- **`npm run lint` fails.** There is no ESLint config (`.eslintrc*` / `eslint.config.*`)
  and no Stylelint config (`.stylelintrc*`) in the repo, so both `lint:ts` and
  `lint:styles` error out with "couldn't find a configuration file". Note both
  lint scripts also pass `--fix`, which would mutate source files.
- **`npm run test` (Playwright) fails.** `playwright.config.js` starts the web
  server with `npm run serve` (`vite preview` on port 8080), which serves the
  `dist/` build output. Since the build is broken there is no app to serve, so
  the webServer readiness check times out (120s). The specs also wait for
  `window.Reveal.isReady()`, which never happens without the built library.

### What does work

- `npm install` — clean install (runs a deprecated but non-fatal `husky install`).
- `npm run type-check` — `tsc --noEmit` passes with no errors. Use this as the
  real TypeScript validation instead of `npm run lint`.
- `npm run dev` — dev server serves the presentation content.

### Testing the presentation manually

Playwright browsers must be present for any browser automation:
`npx playwright install chromium` (large download; may already be cached in the
snapshot). Because the automated Playwright suite is broken (see above), verify
UI changes manually: open `http://localhost:3000`, run `Reveal.initialize(...)`
in the console, and drive the slideshow with arrow keys / `O` (overview).
