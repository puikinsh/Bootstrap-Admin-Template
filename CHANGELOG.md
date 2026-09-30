# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.7.0] - 2026-10-01

### Charts moved to Chart.js (MIT)

From 5.2.0 ApexCharts ships under its own commercial "ApexCharts License", which needs an OEM licence for any product other people use — which is what a free MIT template is for. Every chart is now rendered with **Chart.js 4.5 (MIT)**, and ApexCharts is gone from the dependencies, the bundle, the styles and the docs.

### 🔄 Changed

- **All 21 charts rebuilt on Chart.js**, same data, same pages, same palette:
  - Dashboard — Revenue Overview (area → `line` + gradient fill), User Growth (`bar`), Order Status (`doughnut`), Storage Status (radialBar → `doughnut` progress ring with centre label), Sales by Location (treemap → `chartjs-chart-treemap`).
  - Analytics — Revenue Analytics (area → `line`), Traffic Sources (`doughnut`), User Behavior Flow (horizontal `bar` with in-bar values), Real-time Activity (live `line`), Browser Distribution (`polarArea`).
  - Reports — Revenue Trends (area → `line`, with zoom), Top Products (`doughnut` with slice percentages), Customer Acquisition (stacked `bar` with values), Sales by Region (`radar`).
  - Users — Active Rate sparkline, User Registration Trends (`bar`), By Role (`doughnut`). Orders — Order Trends (dual-axis `line`), Order Status (`doughnut`). Products — Sales Performance (`line`), Category Distribution (`doughnut`).
- **`scripts/utils/charts.js`** replaces `utils/apex.js`. It registers only the chart types the template renders, maps the design tokens onto `Chart.defaults` (Inter, muted ticks, dashed horizontal gridlines, rounded bars, panel-styled tooltips) and exposes `createChart()`, which mounts a sized canvas into the existing `<div>` placeholders.
- **Reports → Revenue Trends zoom** now uses `chartjs-plugin-zoom` (MIT): drag to zoom, Shift+drag to pan, Ctrl/⌘+wheel or pinch, and a **Reset zoom** button in the card header. The rest of the ApexCharts toolbar (SVG/PNG/CSV download menus) is not carried over.
- **Bundle:** the `vendor-charts` chunk went from 749 KB / 207 KB gzip to 213 KB / 73 KB gzip; all JS together from 325 KB to 206 KB gzip. The zoom plugin (~12 KB gzip) loads only on the reports page.

### 🐛 Fixed

- **Charts follow the theme switch.** Charts used to keep the colours of the mode they were first drawn in until the page was reloaded; they now re-theme as soon as light/dark changes, from any control.
- **Browser Distribution legend overlapped the footer** — the chart's container had a fixed 250px height under a 350px chart. The inline height is gone.
- **Charts kept in Alpine state** are now held outside the reactive proxy, which Chart.js instances do not tolerate.

### 🧹 Removed

- `apexcharts`, `utils/apex.js`, every `.apexcharts-*` style rule and the chart-width `ResizeObserver` workarounds (Chart.js resizes with its container on its own, sidebar toggle included).
- The unused `CHART_RESIZE_DEBOUNCE_MS` constant.

## [3.6.0] - 2026-09-08

### Nine new pages, a rebuilt design system, and a validated chart palette

Metis had no sign-in page and no error pages — the one gap it had against every free competitor (AdminLTE 4, Tabler, CoreUI, Mazer, Sneat, AdminKit all ship them). `_login.scss` and `_errors.scss` had existed as empty files imported by `main.scss` since before this release, so the intent was already on record.

### ✨ Added

- **Six auth pages** — `login`, `register`, `forgot-password`, `reset-password`, `two-factor`, `lock-screen`. Inline validation, a password reveal toggle, a live four-segment strength meter, six-box code entry with focus advance / paste-a-whole-code / resend cooldown, and confirmation states that deliberately do not disclose whether an account exists.
- **Three error pages** — `404`, `500`, `maintenance`. Typographic rather than illustrated: the status code is set as a display element, the copy says what actually happened, and the actions are real routes out. No stock graphic, no extra page weight.
- **A "Pages" group in the sidebar of all 21 admin pages**, so the new pages are reachable rather than merely present.
- **`scripts/auth.js`** — a separate entry for the nine standalone pages. They render outside the admin shell, so pulling in `main.js` (sidebar manager, notification manager, dashboard manager, Bootstrap Modal/Tab/Toast/Tooltip/Collapse) would have been dead weight on the one page an unauthenticated visitor always hits.
- **`scripts/utils/chart-palette.js`** — one source of truth for every chart colour.
- **`scripts/utils/password-strength.js`** — the scorer, extracted from `components/forms.js` so the auth pages and the forms showcase cannot drift apart.
- **`scripts/generate-icon-subset.mjs`** (`npm run icons`) — regenerates the Bootstrap Icons subset by scanning source for `bi-*`. The subset was a hand-maintained generated file; adding an icon without updating it produced a class that renders nothing. Exits non-zero on a typo'd icon name. Verified against the previous hand-maintained file: byte-identical rules.
- **`scripts/auth-interaction-test.mjs`** (`npm run test:auth`, folded into `test:build`) — drives the auth flows in a real browser. The smoke test proves a page loads; it cannot see a frozen widget. This one found two real bugs on its first run (below).

### 🎨 Changed — design system

The template read as generated, and the tokens were the reason. Direction is now "refined neutral": structure comes from hairline borders, the accent is an interaction signal rather than decoration, and the neutral ramp carries the UI.

- **Palette.** Primary `#6366f1` (Tailwind indigo-500, the single most over-used AI-dashboard colour) → `#2563eb`. Slate → Zinc for the neutral ramp: Slate's blue cast read as "tinted grey" next to a blue accent. Semantic colours moved to consistent 600-steps.
- **Cards are flat.** A 1px border defines the panel; the drop shadow and the `translateY(-2px)` hover lift are gone. On a dashboard where almost everything is a card, shadowing them all makes the page appear to hover off its background and the shadow stops meaning "this floats".
- **Stat cards.** The four pastel `bg-*-subtle` icon tiles in four different hues were the strongest single "generated template" tell; they are now one recessive neutral surface. Labels became small/uppercase/tracked, values gained tabular figures so digits stay column-aligned while animating.
- **Sidebar active state.** Was a lavender `primary-bg-subtle` pill *plus* coloured label *plus* coloured icon *plus* an accent bar — four signals for one bit of information, and a large block of decorative accent in the highest-traffic part of the UI. Now a neutral fill with full-strength ink and a 2px accent rail.
- **Radii halved** (12–24px → 6–12px), **shadows tightened**, **header 64px → 56px**, **base font size 0.9rem → 0.875rem**, **transitions 300ms → 150ms**.
- **Dark mode is selected, not flipped.** Panels now sit *above* the app ground. Cards were `rgba(30,41,59,0.7)`, so every card blended with whatever sat behind it and no two matched; they are opaque now. The header navbar dropped its 95%-alpha blur, which had been tinting the chrome with whatever scrolled under it.
- **Brand mark.** The indigo→violet gradient rounded square is now a flat mark in the accent. Favicons and PWA icons regenerated to match.
- **Recent Activity now fills its row.** The feed held three entries beside a 428px chart and left a 140px gap under it. It carries eight entries now, and the card uses a new `.card-fill-row` utility (`height: 0; min-height: 100%`) so it takes its height from the chart beside it rather than from its own content — the two columns stay level whatever the chart height becomes, and the feed scrolls past the fold with a masked bottom edge. Below `lg` the constraint lifts and every row is visible.

### 📊 Changed — chart colours

- **~40 hardcoded hexes across nine components now come from `chart-palette.js`.** They had drifted into two palettes: dashboard/reports/users used the Tailwind indigo set while `analytics.js` still used Bootstrap 4's `#007bff` / `#28a745` / `#fd7e14`, so the same series showed in two different blues on adjacent pages.
- **Both categorical sequences are validated** — lightness band, chroma floor, adjacent-pair CVD separation (deutan/protan/tritan), normal-vision separation and contrast against their own surface. Light is checked against `#ffffff`, dark against the `#18181b` panel.
- **The storage gauge was an ApexCharts demo config pasted in verbatim** — neon green `#20E647` on a navy `#293450` hollow with a drop-shadowed track and white labels, i.e. a dark-theme gauge dropped onto a white card.
- **The treemap used three unrelated hues** (sage / olive / slate-blue) for a single measure, so bigger was not visually distinguishable from smaller. It is now one hue stepped light→dark.
- **Chart chrome is themed in `_charts.scss`.** ApexCharts defaults its text to `#373d3f`, which is invisible on a dark panel — every dark-mode chart had unreadable axis labels.

### 🐛 Fixed

- **The password strength meter was frozen at zero.** `{...passwordField()}` copied the *value* of the `strength` getter rather than the getter, evaluating it once before `form` existed. Mixins are now merged with `Object.getOwnPropertyDescriptors`. Found by the new interaction test.
- **Two-factor focus never advanced between code boxes.** `x-ref` is a static attribute and cannot be bound per-iteration, so the `x-for` loop could not hand out refs. Six explicit inputs now. Also found by the interaction test.
- **`x-cloak` had no CSS rule anywhere in the project**, so the attribute did nothing and elements behind `x-show`/`x-if` rendered for a frame before Alpine removed them.
- **Form inputs rendered darker than the cards they sat in.** Bootstrap defaults `$input-bg` to `--bs-body-bg`, which is the recessed app grey, so every field inside a white card read as disabled.
- **The two asset trees had drifted.** `public-assets/assets/` and `src-modern/assets/` hold duplicates; absolute `/assets/…` references resolve to the first and relative `./assets/…` are bundled from the second. Updating only one left the new logo showing on some pages and the old indigo gradient inlined on others. Both trees are now identical — but the duplication itself remains a trap worth removing.
- **Removed the "Application loaded successfully!" toast** that fired on all 21 pages on load. It trained users to dismiss toasts without reading them, so the ones carrying real information were ignored too.
- **Empty generated/orphan partials put to work.** `_login.scss`, `_errors.scss`, `_charts.scss` and `_utilities.scss` were all empty files that `main.scss` imported.

### ⬆️ Updated

- **apexcharts** 6.7.0 → **7.1.0** (major). v7 makes nine previously bundled features opt-in (trellis, storyboard, perspectives, ink, canvas renderer, linked views, measure ruler, rewind, context menu); the template already used the modular entry points and imports none of them, so no code change was needed. The two removed APIs — `plotOptions.bar.borderRadiusWhenStacked` and the old `dataLabels.animate.enabled` default — are not used here.
- **alpinejs** 3.15.12 → **3.17.2**
- **sass** 1.102.0 → **1.104.0**, **vite** 8.2.0 → **8.2.2**, **eslint** 10.8.0 → **10.10.0**, **globals** 17.9.0 → **17.12.0**, **postcss** 8.5.25 → **8.5.28**, **autoprefixer** 10.5.4 → **10.5.5**

### 🗑️ Removed

- **The `dayjs` dependency.** Declared, pinned in `vite.config.js`'s `manualChunks` and `optimizeDeps`, watched by Dependabot — and imported by not one line of source.
- **The `overrides` block.** The three pins (`immutable`, `brace-expansion`, `postcss`) from 3.5.0 are obsolete; the direct dependencies resolve patched versions on their own now, and the `postcss` pin was actively blocking routine updates (`npm install postcss@latest` failed with `EOVERRIDE`). `npm audit` still reports 0 vulnerabilities without them.

### 📊 Bundle size

- The chart chunk grew from **196 kB to 208 kB gzip (+12 kB)** on the same modular import list. ApexCharts 7's core is larger than 6's despite the smaller *default* bundle its release notes advertise — that 13.6% reduction is measured against v6's barrel entry, which this template never used. Accepted to stay on the maintained major.
- The nine standalone pages share a single entry that carries neither ApexCharts nor the admin-shell managers.

## [3.5.0] - 2026-08-03

### Modernization pass: zero third-party runtime dependencies, patched advisories, and a real smoke test

This release closes four Dependabot advisories, updates every dependency to current, and removes every third-party runtime request from the template. Along the way an automated smoke test was added — and it immediately surfaced a set of pages that had been shipping broken.

### 🔒 Security

- **Patched all four open advisories.** `postcss` 8.5.15 → 8.5.25 (GHSA-r28c-9q8g-f849, path traversal via `sourceMappingURL` auto-loading), `immutable` 5.1.5 → 5.1.9 via `sass` (GHSA-v56q-mh7h-f735 trie overflow, GHSA-xvcm-6775-5m9r hash-collision DoS), `brace-expansion` 5.0.6 → 5.0.9 via `eslint`/`minimatch` (GHSA-3jxr-9vmj-r5cp). `npm audit` now reports 0 vulnerabilities. Added an `overrides` block pinning the two transitive packages to patched floors so a fresh resolve can't silently regress them.
- **Removed the unpinned, unhashed ApexCharts CDN tag** from `analytics`, `orders`, `products`, `reports` and `users`. `<script src="https://cdn.jsdelivr.net/npm/apexcharts">` (no version, no SRI) meant those pages executed whatever that URL served at page load. It also meant the chart library was downloaded **twice** — once bundled, once from the CDN — and, because the tag resolved to `latest`, the bundled copy (v5) and the CDN copy (v6) were two different major versions running on the same page.
- **Self-hosted the Inter font**, removing `fonts.googleapis.com` / `fonts.gstatic.com` from all 21 pages. One fewer render-blocking third-party origin on the critical path, no visitor IP disclosed to a third party on first paint (a GDPR consideration for EU deployments), and the template now renders correctly offline.
- **Self-hosted Prism** (was cdnjs, 3 requests on 7 pages) and **inlined the geo-distribution flags** (was `flagcdn.com`, 5 requests on `analytics`).

The smoke test now asserts that **no page makes any external request**.

### 🐛 Bug fixes

These were all pre-existing and found by the new tooling, not introduced by this release.

- **Six element pages were shipping a JavaScript SyntaxError.** `elements-alerts/badges/buttons/cards/forms/modals` each had an inline `<script>` whose `document.addEventListener('DOMContentLoaded', function() {` opening line had been deleted, orphaning its closing `}` and `});`. The parser discarded the entire block, so **every copy-code button, the live alert demo, and syntax highlighting were dead** on those pages. The shared logic now lives in `components/elements.js`; the pages carry no inline JavaScript at all.
- **The entire Forms page was non-functional.** `forms.html` declares `x-data="contactForm()"`, `registrationForm()`, `fileUploadForm()` and `enhancedFormWizard()` — none of which were ever registered. `components/forms.js` instead exported a single `formsComponent` that no markup referenced, so every expression on the page threw (`formData is not defined`, `getFieldClass is not defined`, …). All four components are now implemented against the markup's actual contract: inline validation, a live password-strength meter, drag-and-drop upload with progress, and a gated 4-step wizard with draft save/restore.
- **`Swal` was used as a global in 7 components without being imported** (`files`, `messages`, `orders`, `products`, `reports`, `settings`, `calendar`) — 19 call sites that would throw the moment a user hit a confirm or delete dialog. All now import `sweetalert2`.
- **`bootstrap` was used as a global in 2 places** that the bundled build never defines — `elements.js` (`new bootstrap.Tooltip`) and `users.js` (`bootstrap.Modal.getInstance`). The former only appeared to work because it sat inside a `DOMContentLoaded` handler that never fired.
- **Component `DOMContentLoaded` handlers never ran.** `main.js` reaches page components through a dynamic `import()` that usually resolves *after* `DOMContentLoaded` has already fired, so any listener registered at module scope was dead on arrival. `elements.js` now uses a `readyState` guard, matching the pattern `main.js` already used.
- **Calendar day view threw `date.toDateString is not a function`.** `isToday()` is called with a `Date` from the grid builders but with a `YYYY-MM-DD` string from the day view; it now normalizes its input.
- **`users.html` had no `</head>`** — the head ran straight into `<body>`.
- **`index.html` had an unbalanced `</div>`** — it was missing the `<div class="admin-app">` wrapper that the other 20 pages have. The stray closing tag made the document unparseable by strict HTML tooling.
- **`help.html` referenced `via.placeholder.com`**, a service that shut down in 2024, so the video thumbnail was a broken image. Replaced with a local SVG.

### ⚡ Performance

- **ApexCharts now uses v6's modular entry points.** `utils/apex.js` imports `apexcharts/core` plus only the six chart-type modules this template renders (area, bar, donut, radar, radialBar, treemap) and two features (toolbar, exports), instead of the barrel that pulls in boxplot, candlestick, violin, sunburst, heatmap, drilldown, storyboard, annotations and the canvas renderer. That trims the chart chunk from **229 kB to 172.8 kB gzip (−56 kB)** versus taking v6's default entry.
- **Chart-library bytes on the 5 formerly-CDN pages dropped from ~392 kB to 172.8 kB gzip (−56%)** — those pages previously loaded 153.5 kB of bundled ApexCharts 5 *plus* a 238.6 kB jsDelivr download of ApexCharts 6.
- **Dropped the `lucide` dependency (411 kB raw / 96 kB gzip chunk).** Its icon manager was never finished — `create()` returned an SVG containing an empty `<path>`, so the provider switcher in the icon demo rendered blank icons. Bootstrap Icons is the template's icon system; `icon-manager.js` is now a single, working provider.
- **Removed the unused `@vitejs/plugin-legacy` devDependency** — `vite.config.js` has always had `plugins: []`.
- Note: the dashboard page's JS grew from 226.4 kB to 244.4 kB gzip. ApexCharts 6 is genuinely larger than 5 even after modular trimming; the modular imports and the removed double-load are what keep that from being far worse.

### 🔧 Developer experience

- **Added `scripts/smoke-test.mjs`** — loads all 21 built pages in headless Chromium and fails on uncaught exceptions, console errors, failed requests, any external request, chart pages that render no charts, and element pages that render no highlighted code. This is what caught the SyntaxErrors and the dead Forms page. Run with `npm run test:build`.
- **Added GitHub Actions CI** (`.github/workflows/ci.yml`): lint, build, smoke test and a separate `npm audit --audit-level=high` job, plus a weekly scheduled run so newly disclosed advisories surface without a push.
- **Added Dependabot config** with grouped weekly npm updates and monthly Actions updates.
- **Tightened ESLint.** The config declared `Alpine`, `ApexCharts`, `Swal` and `bootstrap` as readonly globals — but all four are ES module imports in this codebase, so the declarations only served to silence `no-undef` on genuinely undefined references. Removing them is what exposed the 21 missing-import bugs above.
- **Added `engines`** (`node ^20.19 || ^22.13 || >=24`), **`.nvmrc`**, and `test` / `test:build` / `audit` / `verify` scripts.
- **Removed 62 inline `onclick` handlers** across the element pages and `help.html` in favour of delegated `data-*` handlers. Only `help.html` still carries an inline `<script>`, so the template is close to running under a strict CSP.

### ⬆️ Dependency updates

| Package | From | To |
| --- | --- | --- |
| apexcharts | 5.14.0 | 6.7.0 |
| vite | 8.0.16 | 8.2.0 |
| eslint | 10.4.1 | 10.8.0 |
| sass | 1.100.0 | 1.102.0 |
| postcss | 8.5.15 | 8.5.25 |
| prettier | 3.8.3 | 3.9.6 |
| autoprefixer | 10.5.0 | 10.5.4 |
| globals | 17.6.0 | 17.9.0 |
| prismjs | (CDN 1.29.0) | 1.30.0 |
| @fontsource-variable/inter | — | 5.3.0 |
| lucide | 1.17.0 | *removed* |
| @vitejs/plugin-legacy | 8.0.2 | *removed* |

### ⚠️ Known follow-ups

- **Sass `@import` removal is the largest remaining 2027 risk.** The build currently silences 433+ deprecation warnings via `silenceDeprecations` in `vite.config.js` — `@import` (73 uses, 0 `@use`), global built-in functions, the `if()` syntax, and `red()`/`green()`/`blue()`. All are slated for removal in Dart Sass 3.0, at which point the build stops working. Roughly 573 warnings originate in vendored Bootstrap 5.3.x source (fixed by Bootstrap 6) and ~624 in this template's own SCSS (`main.scss`, `_buttons.scss`, `_mixins.scss`). Migrating with `sass-migrator` deserves its own release.
- **~80 files have never been Prettier-formatted.** `format:check` is wired into CI but left `continue-on-error` so it doesn't fail on day one. Run `npm run format` as a standalone commit, then remove that flag.
- `help.html` still has one inline `<script>` containing an Alpine-v2-era fallback (`el.__x`, which Alpine 3 never sets) — worth revisiting before enabling a strict CSP.

---

## [3.4.5] - 2026-05-07

### Elements showcase — preview-box follow-ups to 3.4.4

Two narrow follow-up fixes on `elements.html`. Both are continuations of fixes that landed in 3.4.4 but didn't fully cover every selector inside `.element-preview`.

### 🐛 Bug fixes

- **Form inputs and selects truncated their placeholder/option text inside `.element-preview`** — 3.4.4 fixed this for `.alert` by adding `width: 100%`, but `.form-control` and `.form-select` had the same problem: the preview wrapper uses `display: flex; flex-direction: column; align-items: center`, which collapses block children to their content width. A `<input placeholder="Enter your name">` rendered ~140px wide and clipped the placeholder mid-word. Extended the `width: 100%` rule to cover `.form-control` and `.form-select` so all preview form controls span the full preview width like Bootstrap intends.
- **`.form-select` dropdown arrow overlapped the selected option text inside `.element-preview`** — 3.4.4 added `padding-right: 1.875rem` globally in `_forms.scss` to give the chevron room, but `_elements.scss` has a sizing override `.element-preview .form-control, .form-select { padding: 0.375rem 0.75rem }` that uses the `padding` shorthand, which silently overwrites all four sides — including the right-padding fix. Inside the showcase, the chevron was back on top of the option label. Added a scoped `.element-preview .form-select { padding-right: 1.875rem }` immediately after the shorthand so the arrow gap is restored without affecting font-size or vertical padding.

---

## [3.4.4] - 2026-05-05

### Laptop-density pass, calendar/chart overflow fixes, period selector wiring, mobile polish

A wide-ranging release focused on three things: making the template feel right on a 1366×768 laptop instead of just on 4K desktops, fixing several "content is partially hidden" bugs on calendar / charts / page headers, and finally wiring up the time-period buttons (7D/30D/90D) that have been decorative since 3.4.0.

### ✨ Features

- **Time-period selectors are now functional across 7 chart cards.** The `7D` / `30D` / `90D` / `1Y` button groups on Dashboard (Revenue), Analytics (page-level + Revenue Analytics card), Orders (Trends), Products (Sales), Reports (Revenue Trends), and Users (User Growth) regenerate period-appropriate mock data and update each chart's series + x-axis labels via `chart.updateOptions`. Each component now exposes `buildDayLabels(count)` / `buildLabels(count, unit)` helpers that produce real ISO-derived labels (`Mon, Tue, ...` for ≤7 days, `Apr 12, Apr 13, ...` for 30+, `Wk 1–12` for weeks, `Jan, Feb, ...` for months) so the x-axis no longer lies about dates.
- **Dashboard realtime updater now respects the selected period.** The interval that pushes a new revenue point every N seconds was previously hardcoded to trim to 12 entries with a generic "New" label, which clobbered the user's `7D` selection within seconds. It now reads `this.currentPeriod` and trims/labels accordingly.

### 🐛 Bug fixes

- **Calendar grid was clipping rows on short viewports** — `.month-grid`, `.week-grid`, and `.day-schedule` had `overflow: hidden` combined with `flex: 1`. That combo resolves the grid's `min-height: auto` to `0`, which let the grid compress below its content size and clip its own rows internally — `.calendar-content`'s `overflow: auto` never even saw the overflow. Removed `overflow: hidden` from all three so the grids expand to their full natural height and the parent scrolls them.
- **Calendar sidebar (events list) was getting clipped** — `.calendar-sidebar` had no overflow rule, but its parent `.calendar-container` has `overflow: hidden` and a fixed viewport-derived height. Added `overflow-y: auto` and `min-height: 0` so the sidebar scrolls independently when content (mini calendar + categories + upcoming events) exceeds the available height.
- **Revenue Overview & User Growth charts overflowed their cards on initial load** — `initRevenueChart` / `initUserGrowthChart` didn't set `width: '100%'`, so ApexCharts measured the container width once at render time and could end up wider than the final laid-out card (when fonts loaded after render, the scrollbar took width that wasn't anticipated). Added `width: '100%'` to all 17+ chart configs across `dashboard.js`, `products.js`, `analytics.js`, `reports.js`, `orders.js`, `users.js`, and a `ResizeObserver` (with `requestAnimationFrame` debouncing) on every cartesian chart that re-fits via `updateOptions` whenever the container resizes — handles fonts loading late, sidebar toggle, window resize.
- **Mobile horizontal scroll on Orders / Users / Products / Reports / Settings / Help / Forms / Calendar / etc.** — the page header pattern `<div class="d-flex justify-content-between align-items-center">` doesn't wrap, so on a 375px viewport the title block plus 3 action buttons (`Import` / `Export` / `Add User`) overflowed the container. Added `flex-wrap: wrap` on the header at `< 768px` and `flex-wrap: wrap` on its inner button group, and `overflow-x: clip` + `min-width: 0` on `.admin-main` as a safety net for any other wide descendant. Tables already use `.table-responsive`.
- **Mobile navbar items wrapping to a second row** — `.navbar > .container-fluid` was using Bootstrap's default `flex-wrap: wrap`, which dropped the right-icon group below the brand/hamburger when their combined width exceeded the viewport. Added `flex-wrap: nowrap` at `<992px`, `margin-left: auto` + `flex-shrink: 0` on `.navbar-nav`, and at `<576px` hide the brand text and shrink button padding so the logo + hamburger + 3 right-side icons all fit on one line.
- **All `.form-check-input` rendered as toggle pills, not just `.form-switch`** — `_toggle-switches.scss` was targeting bare `.form-check-input` with `!important` width/height/border-radius/`::before` thumb, hitting *every* checkbox AND radio in the project. Plain checkboxes lost their checkmark, plain radios lost their dot — they all became 3rem pill toggles. Scoped every rule to `.form-switch .form-check-input` (and the dark-theme equivalent) so plain inputs fall back to Bootstrap defaults. Added `background-image: none !important` so Bootstrap's built-in switch SVG thumb doesn't double up with the custom `::before`.
- **`form-select` indicator padding wasted ~42px on a 16px arrow** — Bootstrap's default formula `$form-select-padding-x * 3` produced a comically wide right padding that clipped the selected option text on narrow selects (`col-md-3` State picker, `style="width: 150px"` filter dropdowns, every `.form-select-sm`). Added direct `padding-right` overrides per size: `.form-select` 1.875rem, `.form-select-sm` 1.625rem, `.form-select-lg` 2.25rem.
- **`.element-preview` was forcing block children side-by-side** — used `display: flex` with default `flex-direction: row`, so two stacked alerts (each with `mb-2` for vertical spacing) ended up jammed horizontally. Switched to `flex-direction: column` with parent `gap: 0.5rem`, plus `width: 100%` on alerts so they span the preview width as Bootstrap intends.
- **"Add New Event" modal had content flush against the border** — the modal-header used `pb-0` and modal-body used `pt-2`, collapsing vertical breathing room near the top. Removed both overrides and bumped `--bs-modal-padding` from `1rem` → `1.5rem` on `#addEventModal` so header/body/footer all get a uniform 24px inset.

### 🎨 Design polish — laptop density pass

- **Sidebar width: 280px → 240px.** Recovers 40px of horizontal real estate on every page. Nav labels still fit comfortably; verified at `User Management` / `Help & Support` widths.
- **Header height: 70px → 64px.** Closer to Bootstrap's 56px default but still roomy enough for the navbar's icon buttons. Cascades into `var(--header-height)` calc on calendar / sticky elements.
- **Button padding: `0.75rem 1.5rem` → `0.5rem 1rem`.** Buttons drop from ~46px tall (Bootstrap-default + 8px) to ~38px — Bootstrap-default-feel without going to `btn-sm`. Affects every button in the template via Sass variables.
- **Input padding: `0.75rem 1rem` → `0.5rem 0.875rem`.** Inputs match button height for visual consistency.
- **Spacing utilities tightened at lg/xl breakpoints.** Bulk-migrated 49 utility tokens across 21 HTML files: `*-lg-5` → `*-lg-4` (20px → 16px), `*-xl-6` → `*-xl-5` (24px → 20px). This template uses a custom spacer scale where `*-5` is 1.25rem, not Bootstrap's 3rem default — so the per-instance savings are 4–6px, but compound across page-header margins, grid gutters, and card padding to recover 30–60px vertical and 20–30px horizontal per page on a typical laptop window.
- **Fullscreen toggle hidden on tablets too.** Was visible at `md+` (≥768px), but iOS Safari on iPad rejects `requestFullscreen` on non-`<video>` elements, so the button was a silent no-op on iPad. Pushed the breakpoint to `lg+` (≥992px) across all 21 pages — desktop only.
- **Logo & favicon redesigned.** Switched from circular gradient with letter "M" to a rounded-rect background (rx=8 logo / rx=6 favicon) with a refined filled-M letterform. Inner V peak is above center for confident readability, valley floor is wider on the favicon for legibility at 16×16. Same indigo→purple gradient.
- **Page-header buttons (Import / Export / Add User) feel lighter** as a downstream effect of the global button-padding reduction — three full-text buttons in a row no longer claim the entire row width on smaller laptop viewports.
- **`<select>` dropdown arrow positioning tightened** — Bootstrap's default arrow gap was ~12px from the right edge with the chunky right padding; now ~6–8px to match the tighter `padding-right`.

### 📦 Dependencies (low-risk patch/minor bumps)

- `alpinejs` 3.15.11 → 3.15.12 (patch)
- `eslint` 10.2.1 → 10.3.0 (minor)
- `globals` 17.5.0 → 17.6.0 (minor)
- `postcss` 8.5.12 → 8.5.14 (patch)
- `lucide` (optional) 1.11.0 → 1.14.0 (minor)
- `bootstrap`, `apexcharts`, `sweetalert2`, `dayjs`, `bootstrap-icons`, `vite`, `sass` — already on latest.

### Internal / cleanup

- Added a memory note about Vite's `publicDir` gotcha — `/assets/*` paths are served from `public-assets/`, not `src-modern/assets/`. Editing only `src-modern/` had no visible effect during dev or in builds. Both directories now stay in sync and the gotcha is documented for future sessions.

---

## [3.4.3] - 2026-04-29

### Accessibility — Lighthouse contrast & semantics pass

A targeted accessibility round addressing every issue surfaced by Lighthouse on the live demo: insufficient color contrast across brand/badge/button/toast usages, an icon-only button with no accessible name, and a heading-order violation on the dashboard's stats row.

### ♿ Accessibility

- **Accessible name on icon-only button** — the dashboard's "New Item" button collapsed to just an icon at viewports < `sm`, leaving screen readers with no label. Added `aria-label="New Item"` and `aria-hidden="true"` on the decorative `<i>` so the icon isn't double-announced.
- **Heading order — `h1 → h3` jump fixed** — the stats-card labels on Dashboard / Users / Products / Orders were `<h3 class="h6">` (introduced in 3.4.0 to give them semantic weight), but the visual hierarchy goes `h1` (page title) → stat labels with no `h2` between, which Lighthouse flags as a heading-order skip. Demoted the labels to `<p class="h6 mb-0 text-muted">`. They're metadata captions for a value, not section headings — a paragraph is the right element.
- **Defined explicit `--bs-*-text-emphasis` tokens** — the template's brand palette is Tailwind-flavored (Indigo / Emerald / Amber / Cyan / Red 500-shade), and Bootstrap 5.3's auto-computed `text-X-emphasis` values for those still don't reach 4.5:1 against white. Pinned each emphasis token to its 700-shade equivalent (`#4338ca`, `#047857`, `#b45309`, `#0e7490`, `#b91c1c`) in light mode, and to the 300-shade for dark mode.
- **Brand "Metis" wordmark** — switched from `text-primary` to `text-primary-emphasis` across all 21 pages. Indigo 500 (`#6366f1`) on white is ~4.2:1 and fails AA for normal text; Indigo 700 clears 7:1.
- **Stat-delta indicators** (`+12.5%`, `-2.1%`) — 13 occurrences of `<small class="text-success">` / `text-danger` switched to the `-emphasis` variants. The Tailwind 500-shade green/red on white were both below AA for small text.
- **`.btn-outline-primary` resting text color** — used `$primary` directly (~4.2:1 on white). Switched the resting and disabled text colors to `var(--bs-primary-text-emphasis)`. Hover/active states stay bright primary because they put white text on the primary fill, which is contrast-safe.
- **Badges with `bg-warning` / `bg-info`** — Bootstrap's `.badge` defaults to white text, which on amber/cyan fails contrast badly (1.7:1 and 2.7:1). Swapped to the `text-bg-warning` / `text-bg-info` utility, which pairs the background with black text per Bootstrap 5.3's contrast logic. Black on amber/cyan clears 10:1.
- **Toast success/danger contrast** — `text-bg-success` and `text-bg-danger` use white text on the base brand colors, which fails AA at small sizes. Toasts now use the 700-shade backgrounds (`#047857` Emerald 700 / `#b91c1c` Red 700) via a scoped `.toast.text-bg-*` override, leaving every other usage of those utilities untouched. Warning and info toast variants already use black text and were fine.
- **Footer "Colorlib" link** — sat inside a `<p class="text-muted">` and inherited the muted gray, with no underline, so the only signal it was a link was the cursor change. Added explicit `color: var(--bs-primary-text-emphasis)` and `text-decoration: underline` for footer anchors.

---

## [3.4.2] - 2026-04-29

### Design polish & consistency pass

A focused pass on header chrome, sidebar navigation, cards, and the Security page. Several long-standing visual inconsistencies and a Bootstrap collapse init bug were fixed along the way.

### 🎨 Header & sidebar refresh

- **Ghost icon buttons in the header** — theme, fullscreen, notifications, and user-menu buttons no longer use bordered `btn-outline-secondary`; they're now borderless square icon buttons with a subtle filled hover state. Override scoped to `.admin-header .navbar-nav .btn` so all 21 pages pick it up via the shared layout SCSS — no per-page markup edits needed.
- **Softer "⌘K"-style search input** — tertiary-bg fill, no visible border at rest, soft `primary-border-subtle` focus ring. Less visual weight than the previous hard-bordered field.
- **Thin divider before the user menu** — clean visual separation between system controls and the account menu.
- **Trimmed `.navbar-brand`** — slightly smaller "Metis" wordmark with tighter letter-spacing.
- **Sidebar: dropped the `translateX(4px)` hover lift** on top-level and submenu items — a 2018-feeling effect that didn't add usability.
- **Active sidebar state redesigned** — was a heavy solid-primary fill across the whole row; now uses a subtle `primary-bg-subtle` background plus a 3px primary accent bar pinned to the sidebar's left edge via `::before`. The accent bar is scoped to top-level items only (submenus get a slightly stronger fill instead). Section header ("Admin" caps) restyled with smaller font and tighter letter-spacing.

### 🃏 Cards — consistent design across the template

- **Global `.card` style unified** with the previously-separate `.element-card` look from the elements overview page. Cards now have a 1px `--bs-border-color` border, `0.75rem` corners, and a subtle `--bs-box-shadow-sm` at rest. Hover lifts the card with a softer `0 6px 16px rgba(0,0,0,0.06)` shadow (border color stays neutral on hover for a subtler interaction).
- **Removed leftover glassmorphism** — `backdrop-filter: blur(12px)` and the `inset 0 1px 0 rgba(...)` faux-highlight are gone. They served no purpose on opaque cards.
- **Removed conflicting `.stats-card { border: none; ... }` override** in `_tables.scss` that was making the dashboard's top stats row look different from every other card on the site. Kept only the `.stats-icon` sizing block, which is the part actually specific to stats cards.
- **`.card-header` / `.card-footer` get internal 1px borders** so divisions render crisply against the new bordered card.

### 🐛 Bug fixes

- **Elements submenu flash on every page load** — `main.js` was calling `new Collapse(element)` without config, so Bootstrap's default `toggle: true` immediately toggled each collapse target on construction. The Elements submenu was briefly auto-opening with a `.collapsing` height transition on every navigation. Fixed by passing `{ toggle: false }`, matching what Bootstrap's own data-API uses internally.
- **Notifications dropdown missing on 7 element sub-pages** — `elements-alerts`, `elements-badges`, `elements-buttons`, `elements-cards`, `elements-forms`, `elements-modals`, and `elements-tables` had a stripped-down header that lacked the bell icon entirely (also missing the user-menu chevron, button tooltips, and the responsive `d-none d-md-inline-block` on fullscreen). All 7 were verified byte-identical and bulk-replaced with the canonical header from `index.html`. All 21 pages now share the exact same header markup.
- **Security page styles were broken in multiple ways** —
  - `.security-item` and `.security-info` had no styles at all → the Account / Two-Factor / Privacy sections rendered as a wall of plain text. Added the same flex-row pattern used by Settings (title + description on left, control on right, divider between rows).
  - `.security-status` was styled as a full-width banner block but used as a small inline "Enabled / Disabled" label → rebuilt as a pill badge with `.enabled` (green) / `.disabled` (grey) variants.
  - `.session-item` styles were nested under a non-existent `.session-management` wrapper and never applied → unscoped.
  - `.activity-item` styles were nested under a non-existent `.activity-log` wrapper → unscoped.
  - `.activity-icon` color variants used class names (`.login`, `.logout`, `.security`, `.error`) that the runtime binding never produced (binding was `activity.type` which yields `.login_success`, `.password_change`, etc.) → switched binding to `activity.severity` and aligned variants to `.success` / `.info` / `.warning` / `.danger`.
  - Page-header buttons (`viewSecurityLog`, `emergencyLockdown`) were rendered *outside* the `x-data="securityComponent"` block → clicks silently failed. Moved `x-data` up to the `container-fluid` wrapper.
  - Activity rows referenced `activity.title` / `activity.description`, but the Alpine data only has `message` / `details` → text wasn't rendering. Bindings corrected.

### 🧹 Markup cleanup

- **Removed redundant "Active" badge from sidebar Security row** across all 11 pages where it appeared (`<span class="badge bg-primary rounded-pill ms-auto">Active</span>`). The active state is now communicated through the new accent bar + filled background — the badge was decorative duplication.

---

## [3.4.1] - 2026-04-28

### Fixed

- **Search shortcut now Mac-aware** — placeholders said `Ctrl+K` on every page; the keydown handler already accepted both `Ctrl` and `Cmd`, but Mac users naturally tried `⌘K` (which the placeholder didn't advertise) and assumed it was broken. Placeholders are now rewritten to `⌘K` at runtime on macOS, and the handler also matches `event.code === 'KeyK'` (layout-independent) while explicitly excluding `Alt`/`Shift` so combinations like Cmd+Shift+K (DevTools console) don't accidentally trigger search focus.

---

## [3.4.0] - 2026-04-28

### Hardening Pass — Security, Accessibility, Performance & Maintenance

A wide-ranging audit-driven release that tightens the template across security, accessibility, performance, and code quality. No public-API or markup-structure breaks; existing pages keep working as-is.

### 📦 Dependency Updates

Major upgrades across the build toolchain, plus two runtime dependencies removed.

- **Vite** 7.3.1 → **8.0.10** (major) — switched to the new rolldown-based bundler; `manualChunks` updated to function form
- **@vitejs/plugin-legacy** 7.2.1 → **8.0.1** (major)
- **ESLint** 9.39.2 → **10.2.1** (major)
- **@eslint/js** 9.39.2 → **10.0.1** (major)
- **globals** 16.2.0 → **17.5.0** (major)
- **Lucide** 0.469.0 → **1.11.0** (major) — packaging bug from the prior rollback is fixed upstream
- **Alpine.js** 3.15.4 → **3.15.11**
- **ApexCharts** 5.3.6 → **5.10.6**
- **SweetAlert2** 11.26.17 → **11.26.24**
- **dayjs** 1.11.19 → **1.11.20**
- **Sass** 1.97.3 → **1.99.0**
- **PostCSS** 8.5.6 → **8.5.12**
- **Autoprefixer** 10.4.23 → **10.5.0**
- **Prettier** 3.8.1 → **3.8.3**
- **rimraf** 6.1.2 → **6.1.3**
- **Removed `chart.js`** — dashboard migrated to ApexCharts; one chart library is enough (saved ~63 KB gzip in `vendor-charts`)
- **Removed `@fortawesome/fontawesome-free`** — never imported in source; Bootstrap Icons is the only icon font in use

### 🔒 Security

- **Replaced unsafe `innerHTML` interpolation** in `notifications.js` (toast renderer + activity feed) and `dashboard.js` (recent-orders table) with `createElement` + `textContent`. The dangerous `onclick="${config.action.handler}"` pattern is gone — toast actions must now be passed as functions.
- **Replaced inline `onclick` attributes** in `elements-tables.html` with `data-*` attributes + delegated listeners; also fixed a pre-existing JS syntax error in that page's inline script.
- **Added security meta tags** to all 21 HTML pages: `Referrer-Policy: strict-origin-when-cross-origin` and `X-Content-Type-Options: nosniff`.
- **Whitelisted `localStorage` schema validation** in `security.js` and `settings.js` — corrupt or unexpected entries are removed instead of silently merged into component state.
- **Added `autocomplete="new-password"`** to all password inputs in `forms.html` and `elements-forms.html`.
- **Production bundles strip `console.*` and `debugger`** via `esbuild.drop` in `vite.config.js`.

### ♿ Accessibility

- **Skip-to-main-content link** injected on all 21 pages, paired with `id="main-content"` on every `<main>` element.
- **Restored visible keyboard focus rings** — replaced `outline: none` (without replacement) in `_buttons.scss`, `_hamburger.scss`, `_products.scss`, and `_orders.scss` with `:focus-visible` rings using `var(--bs-primary)`.
- **`prefers-reduced-motion` support** — new `_a11y.scss` partial that disables animations and transitions for users who opt out.
- **Sidebar toggle ARIA** — `[data-sidebar-toggle]` now has `aria-controls="admin-sidebar"` and a dynamic `aria-expanded` that reflects sidebar state on both desktop and mobile.
- **Sortable users table** — `<th>` elements got `role="button"`, `tabindex="0"`, keyboard handlers (Enter / Space), and dynamic `aria-sort` reflecting current sort.
- **Heading hierarchy normalized** —
  - Logo `<h1 class="h4">Metis</h1>` → `<span>` (it's branding, not a page heading) so each page has a single `<h1>`.
  - Card titles `<h5 class="card-title">` → `<h2 class="h5 card-title">` across all pages (visual size preserved via Bootstrap typography classes).
  - Stat-card values `<h3 x-text="stats.total">` → `<div class="h3" aria-live="polite"><span x-text=…>` (values aren't headings; `aria-live` so screen readers announce updates).
  - Stat-card labels `<h6>` → `<h3 class="h6">` (semantic h3, visual h6).

### 🐛 Bug Fixes

- **Memory leaks from uncleared timers/listeners** —
  - `dashboard.js`: rewrote with tracked `intervals`/`timeouts`/`cleanupFns` sets; `destroy()` clears them all.
  - `analytics.js`: tracked interval + a single replaceable resize handler; `destroy()` runs on `pagehide`.
  - `messages.js`: tracked simulated-activity intervals.
  - `main.js`: wired `app.destroy()` to a one-shot `pagehide` listener so the cleanup runs on real navigations.
- **Fixed missing dashboard charts** — `index.html` had three `<canvas>` containers left over from Chart.js; ApexCharts needs `<div>` containers and silently does nothing otherwise. Converted to `<div>` with appropriate `min-height`.
- **`bi-crown` mapping in `icon-manager.js`** pointed at a non-existent icon; remapped to `bi-award`.
- **Pre-existing inline-script syntax error** in `elements-tables.html` (orphaned `}` and `});` from a previous removal) cleaned up as part of the inline-onclick refactor.

### ⚡ Performance

- **CSS bundle: 499 KB → 399 KB raw (-100 KB / -20%)** —
  - Removed unused Bootstrap component partials from `main.scss`: `accordion`, `carousel`, `offcanvas`, `popover`, `placeholders` (audit confirmed zero markup usage).
  - Generated `_bootstrap-icons-subset.scss` containing only the **158 icons** actually referenced in the project, replacing the full Bootstrap Icons CSS (was 2,078 rules).
  - Added `~bootstrap-icons` Vite alias so the subset's `@font-face` resolves into `node_modules`.
- **Vite build hardening** — added `target: 'es2020'`, `cssCodeSplit: true`, `cssMinify: 'lightningcss'`, explicit `minify: true`, `chunkSizeWarningLimit: 600`.
- **Production console stripping** — `esbuild.drop: ['console', 'debugger']` removes ~16 of 17 `console.log`s from the built `main.js`.
- **Vendor chunks** — dropped `Offcanvas` and `Popover` from the Bootstrap JS imports (zero usage in markup), reducing the `vendor-bootstrap` chunk slightly.

### 🛠️ Code Quality

- **Extracted `searchComponent` factory** — `utils/search-component.js` exports `createSearchComponent({ getResults, minLength, delayMs })`. Replaced 11 nearly-identical Alpine `searchComponent` definitions across `users.js`, `elements.js`, `calendar.js`, `files.js`, `help.js`, `messages.js`, `orders.js`, `products.js`, `reports.js`, `security.js`, and `settings.js`.
- **Constants module** — new `utils/constants.js` hoists scattered timing values: `MOBILE_BREAKPOINT_PX`, `RESIZE_DEBOUNCE_MS`, `REALTIME_FAST_POLL_MS`, `REALTIME_DASHBOARD_POLL_MS`, `STAT_ANIMATION_DURATION_MS`, etc. Wired into `sidebar.js`, `dashboard.js`, `messages.js`, and `analytics.js`.
- **Stricter ESLint** — added `eqeqeq: 'smart'`, `prefer-const`, `no-var`. Surfaced and fixed two latent issues (a `let` that should be `const`, a `==` comparison).
- **Removed abandoned `complete-cleanup.sh`** dev script (had a hardcoded path to the maintainer's iCloud).
- **Build artifacts no longer tracked** — uncommented `dist-modern/` (and `dist/`) in `.gitignore`; ran `git rm -r --cached dist-modern/` to untrack 51 stale build files. No more rebuild-churn diffs in PRs.

### 📝 Notes

- **0 vulnerabilities** — `npm audit` clean across all production and dev dependencies.
- **Font file subsetting deferred** — `bootstrap-icons.woff2` (134 KB) and `.woff` (180 KB) still ship the full glyph set. Subsetting requires `pyftsubset` / `glyphhanger` and would shrink to ~15-20 KB. Open task for a follow-up release.
- **Migration note for downstream consumers** — if you customized `dashboard.js` to use Chart.js, you'll need to switch to ApexCharts (see `DEVELOPMENT.md` "Charts" section). Toast `action` callbacks must now be functions, not strings.

---

## [3.3.0] - 2026-01-26

### Responsive Layout Overhaul - Mobile & Sidebar Rework

Complete rework of the mobile experience and sidebar toggle system for a polished, production-ready responsive layout.

### Fixed

- **Mobile layout completely broken** - Sidebar, header, footer, and cards all had layout issues below the `lg` breakpoint
- **Sidebar never toggled on desktop** - `SidebarManager` module existed but was never imported or initialized in `main.js`
- **Duplicate sidebar toggle handlers** - Inline `<script>` blocks in all 21 HTML pages conflicted with `SidebarManager`, causing desktop toggle clicks to cancel out (both handlers fired, toggling the class on then off)
- **Dropdowns pushed layout on mobile** - Bootstrap's `navbar-expand-lg` sets `.dropdown-menu` to `position: static` below the `lg` breakpoint; forced to `position: absolute` for proper overlay behavior
- **Inconsistent mobile breakpoints** - Some components used 768px, others 991.98px; standardized to 991.98px (`lg`) throughout
- **Hamburger menu hidden behind logo** - Repositioned hamburger into the header navbar flow and pinned it at the sidebar edge on desktop

### Changed

- **Sidebar toggle architecture** - Single source of truth via `SidebarManager` module; removed all 21 inline sidebar toggle `<script>` blocks from HTML pages
- **Hamburger menu placement** - Moved from floating `position: fixed` element to header navbar; absolutely positioned at sidebar edge on desktop, normal flow on mobile
- **Mobile sidebar behavior** - Now uses off-screen `transform: translateX(-100%)` with overlay backdrop instead of broken margin/width toggling
- **Desktop sidebar collapse** - Clean mini-sidebar (70px) with hidden labels, badges, and submenus; content area adjusts via `margin-left` transition
- **Footer responsive** - Resets `margin-left` to 0 below `lg` breakpoint

### Added

- **`SidebarManager` initialization** - Imported and instantiated in `main.js` (was previously dead code)
- **Sidebar backdrop** - Added `.sidebar-backdrop` overlay element to all 21 HTML pages for mobile sidebar
- **Mobile sidebar features** - Escape key closes sidebar, backdrop click closes, body scroll lock when open, resize handler cleans up state when crossing breakpoints
- **Responsive card styles** - Smaller padding and icon sizes on mobile for stats cards
- **Compact header buttons** - Reduced button padding on small screens
- **Header dropdown fix** - `.navbar-nav .dropdown-menu { position: absolute }` override in `_header.scss`

---

## [3.2.1] - 2026-01-24

### 🔧 Maintenance Release - Dependency Updates & Config Improvements

This release updates all dependencies to their latest stable versions and improves the ESLint configuration for better maintainability.

### 📦 Updated Production Dependencies

- **Alpine.js** 3.15.2 → **3.15.4** - Bug fixes and performance improvements
- **SweetAlert2** 11.26.3 → **11.26.17** - Enhanced notification features

### 📦 Updated Development Dependencies

- **Vite** 7.2.4 → **7.3.1** - Build performance improvements
- **Sass** 1.94.2 → **1.97.3** - Latest SCSS compiler with bug fixes
- **ESLint** 9.39.1 → **9.39.2** - Updated linting rules
- **@eslint/js** 9.39.1 → **9.39.2** - ESLint JavaScript plugin update
- **Prettier** 3.7.2 → **3.8.1** - Improved code formatting
- **Autoprefixer** 10.4.22 → **10.4.23** - Better CSS compatibility

### ✨ Added

- **`globals` package** - Cleaner ESLint configuration using standard browser globals
- **`if-function` deprecation silencing** - Suppress Sass deprecation warnings from Bootstrap

### 🔧 Changed

- **ESLint Configuration** - Now uses `globals` package instead of manually listing browser globals
- **ECMAScript Version** - Updated from 2022 to 2024 in ESLint config
- **Vite SCSS Config** - Added `if-function` to silenced deprecations for Bootstrap compatibility

### 📝 Notes

- **Lucide Icons** - Rolled back to v0.469.0 due to a packaging bug in newer versions (v0.560+) where ESM entry points are missing. Monitor for fix before upgrading.
- **Bootstrap SCSS** - Bootstrap uses Sass's deprecated `if()` function which will be fixed in a future Bootstrap release

### 🔒 Security

- **0 Vulnerabilities** - All dependencies audited with no known security issues

---

## [3.2.0] - 2025-11-29

### 🎉 Maintenance Release - Dependencies, Build Optimization & DX Improvements

This release brings all dependencies to their latest versions, significantly improves build performance through chunk splitting, and enhances developer experience with new configuration files.

### 🚀 Build Performance Improvements

- **Vendor Chunk Splitting** - Main bundle reduced from 993KB to 33KB
  - `vendor-bootstrap.js` (82KB) - Bootstrap & Popper
  - `vendor-ui.js` (123KB) - Alpine.js, SweetAlert2, Day.js
  - `vendor-charts.js` (756KB) - Chart.js, ApexCharts
- **Better Browser Caching** - Vendor chunks cached separately from app code
- **Optimized Dependency Pre-bundling** - Faster dev server startup

### 📦 Updated Production Dependencies

- **Font Awesome** 7.0.1 → **7.1.0** - New icons and improvements
- **Alpine.js** 3.15.0 → **3.15.2** - Bug fixes and enhancements
- **ApexCharts** 5.3.5 → **5.3.6** - Chart rendering improvements
- **Chart.js** 4.5.0 → **4.5.1** - Bug fixes
- **Day.js** 1.11.18 → **1.11.19** - Date utilities update
- **SweetAlert2** 11.23.0 → **11.26.3** - Enhanced notification features
- **Lucide** 0.544.0 → **0.555.0** - More icon options

### 📦 Updated Development Dependencies

- **Vite** 7.1.7 → **7.2.4** - Build performance improvements
- **Sass** 1.93.2 → **1.94.2** - Latest SCSS compiler
- **ESLint** 9.36.0 → **9.39.1** - Updated linting rules
- **Prettier** 3.6.2 → **3.7.2** - Improved code formatting
- **Autoprefixer** 10.4.20 → **10.4.22** - Better CSS compatibility
- **PostCSS** 8.5.2 → **8.5.6** - CSS processing updates
- **Rimraf** 6.0.1 → **6.1.2** - Cleanup utility update

### ✨ Added

- **`.prettierrc.json`** - Standardized code formatting configuration
- **`.prettierignore`** - Exclude build artifacts from formatting
- **`.editorconfig`** - IDE-agnostic coding standards
- **`postcss.config.js`** - PostCSS/Autoprefixer configuration
- **`.env.example`** - Environment variable template for easy onboarding
- **`DEVELOPMENT.md`** - Comprehensive development documentation
- **ESLint v9 Configuration** - New `eslint.config.js` flat config format
- **New npm scripts**:
  - `npm run serve` - Build and preview in one command
  - `npm run lint:fix` - Auto-fix linting issues
  - `npm run format:check` - Check formatting without changes
  - `npm run check` - Run lint + format check
  - `npm run clean:all` - Deep clean including node_modules

### 🐛 Fixed

- **Duplicate Method Error** - Fixed duplicate `changePassword()` in security component
- **Unused Bootstrap Imports** - Removed unused Alert, Button, Carousel, ScrollSpy imports
- **ESLint Warnings** - Fixed all 16 warnings (now 0 errors, 0 warnings)

### 🔧 Changed

- **Vite Configuration** - Cleaner syntax with `__dirname` helper
- **CLAUDE.md** - Streamlined to quick reference, detailed docs moved to DEVELOPMENT.md
- **`.gitignore`** - Added environment file patterns, removed CLAUDE.md exclusion

### 🔒 Security

- **0 Vulnerabilities** - All dependencies updated with no known security issues

---

## [3.1.0] - 2025-09-29

### 🎉 Enhanced Release - Dependency Updates & Optimization

This release brings the template to the latest standards with updated dependencies, bug fixes, and codebase cleanup.

### ✨ Added
- **CLAUDE.md** - Comprehensive AI assistant configuration for better development experience
- **Responsive Chart Handling** - Improved chart overflow protection with responsive breakpoints
- **Window Resize Handlers** - Charts now properly resize with browser window changes

### 📦 Updated Dependencies
- **Bootstrap** 5.3.7 → **5.3.8** - Latest Bootstrap framework version
- **Alpine.js** 3.14.9 → **3.15.0** - Enhanced reactive framework
- **ApexCharts** 4.7.0 → **5.3.5** - Major version upgrade with new features
- **Font Awesome** 6.7.2 → **7.0.1** - Major version upgrade with new icons
- **Vite** 7.0.4 → **7.1.7** - Improved build performance
- **Sass** 1.89.2 → **1.93.2** - Latest SCSS compiler
- **ESLint** 9.18.0 → **9.36.0** - Updated linting rules
- **Prettier** 3.4.2 → **3.6.2** - Improved code formatting
- **Day.js** 1.11.13 → **1.11.18** - Date utilities update
- **SweetAlert2** 11.22.1 → **11.23.0** - Enhanced notifications
- **Lucide** 0.469.0 → **0.544.0** - More icon options
- **@vitejs/plugin-legacy** 7.0.0 → **7.2.1** - Better browser compatibility

### 🐛 Fixed
- **Chart Overflow Issue** - Revenue Analytics chart now properly contains itself within card boundaries
- **ApexCharts Responsive Rendering** - Charts properly resize and redraw on container changes
- **CSS Overflow Protection** - Added proper overflow handling in chart containers

### 🧹 Removed (Cleanup)
- **Legacy Configuration Files**
  - Removed `.babelrc` (obsolete with Vite)
  - Removed `.jshintrc` (replaced by ESLint)
  - Removed `.travis.yml` (outdated CI/CD)
  - Removed `.verb.md` (old documentation generator)
- **Legacy Directories**
  - Removed `docs/` directory with outdated Bootstrap 3 documentation
  - Confirmed removal of old `src/` and `dist/` directories
- **Gitignore Cleanup**
  - Removed references to bower_components
  - Removed grunt-html-validation entries
  - Cleaned up vendor directory references

### 🔧 Changed
- **Chart Container Mixin** - Enhanced with better overflow protection and responsive handling
- **Analytics Component** - Added proper chart cleanup and resize event handlers
- **Project Structure** - Streamlined to only modern Bootstrap 5 codebase

## [3.0.0] - 2025-07-08

### 🚀 Major Release - Complete Modernization

This is a **complete rewrite** of the Metis Admin Template with modern web technologies and best practices.

### ✨ Added

#### **Framework & Technology Stack**
- **Bootstrap 5.3.7** - Complete upgrade from Bootstrap 3
- **Alpine.js** - Lightweight reactive framework replacing jQuery
- **Vite Build System** - Modern build tool with HMR and optimizations
- **ES6+ JavaScript** - Modern JavaScript with modules and async/await
- **SCSS Architecture** - Organized, maintainable stylesheet structure
- **Bootstrap Icons** - 1,800+ modern SVG icons

#### **New Dashboard Pages**
- **📈 Analytics Dashboard** - Advanced charts and KPI tracking
- **👥 User Management** - Complete CRUD operations with data tables
- **📦 Product Management** - E-commerce ready product listings with filtering
- **🛒 Order Management** - Order tracking and status management
- **📁 File Manager** - Modern file browser with upload/download capabilities
- **📅 Calendar** - Full-featured event management with modal dialogs
- **💬 Messages** - Modern chat interface with real-time styling
- **📊 Reports** - Advanced data tables with export functionality
- **⚙️ Settings** - Comprehensive admin configuration panels
- **🔒 Security** - User permissions and security settings
- **❓ Help & Support** - FAQ system, documentation, and support tickets

#### **Design System**
- **Dark/Light Mode** - Seamless theme switching with persistence
- **CSS Custom Properties** - Full theme customization support
- **Modern Typography** - Inter font family for enhanced readability
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Component Library** - Reusable UI components with consistent styling
- **Animation System** - Smooth transitions and micro-interactions

#### **Developer Experience**
- **Hot Module Replacement** - Instant development feedback
- **Component Architecture** - Modular, reusable JavaScript components
- **TypeScript Ready** - Full TypeScript support (optional)
- **Modern Build Pipeline** - Optimized assets with tree shaking
- **Source Maps** - Better debugging experience
- **Linting & Formatting** - Code quality tools integration

#### **Interactive Features**
- **Advanced Forms** - Modern form controls with validation
- **Data Tables** - Sortable, filterable, and searchable tables
- **Modal Dialogs** - Enhanced user interactions
- **Toast Notifications** - Rich feedback system
- **Search Functionality** - Global search with results dropdown
- **Keyboard Shortcuts** - Improved accessibility and UX
- **Fullscreen Toggle** - Immersive dashboard experience

### 🔄 Changed

#### **Complete Technology Migration**
- **jQuery → Alpine.js** - Modern reactive framework (95% smaller bundle)
- **LESS → SCSS** - More powerful CSS preprocessing
- **Gulp → Vite** - Lightning-fast build system
- **Bootstrap 3 → Bootstrap 5** - Latest framework with utilities
- **Font Awesome → Bootstrap Icons** - Native Bootstrap icon system
- **Static HTML → Interactive Components** - Rich, app-like experience

#### **Architecture Improvements**
- **Modular JavaScript** - ES6 modules for better organization
- **Component-Based CSS** - ITCSS methodology with BEM naming
- **Performance Optimization** - Tree shaking, code splitting, asset optimization
- **Browser Support** - Modern browsers only (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

#### **Design Evolution**
- **Modern Color Palette** - Updated with contemporary design trends
- **Enhanced Spacing** - Improved visual hierarchy and breathing room
- **Professional Typography** - Better readability and information density
- **Accessibility Improvements** - WCAG 2.1 AA compliance
- **Mobile Experience** - Touch-optimized interactions

### 📦 Technical Improvements

#### **Performance**
- **90%+ Lighthouse Score** - Optimized for Core Web Vitals
- **Faster Load Times** - Modern bundling and asset optimization
- **Smaller Bundle Size** - Tree shaking and dead code elimination
- **Efficient Caching** - Better browser caching strategies

#### **Code Quality**
- **Modern JavaScript** - ES6+, async/await, destructuring
- **Type Safety** - Optional TypeScript support
- **Consistent Styling** - Prettier and ESLint integration
- **Documentation** - Comprehensive code comments and guides

#### **Build System**
- **Development Server** - Fast HMR with Vite
- **Production Builds** - Optimized, minified assets
- **Asset Handling** - Automatic image optimization
- **Environment Support** - Development, staging, production configs

### 🗑️ Removed

#### **Legacy Dependencies**
- **jQuery** - Replaced with Alpine.js
- **Bootstrap 3** - Upgraded to Bootstrap 5
- **LESS** - Migrated to SCSS
- **Gulp Build System** - Replaced with Vite
- **Bower** - Removed in favor of npm
- **Grunt** - No longer needed with Vite

#### **Outdated Features**
- **IE11 Support** - Focus on modern browsers
- **Legacy Browser Fallbacks** - Simplified for modern web
- **Outdated JavaScript Patterns** - Replaced with modern alternatives
- **Static HTML Includes** - Replaced with component architecture

#### **Cleanup**
- **Unused CSS** - Removed redundant styles
- **Dead JavaScript Code** - Eliminated unused functions
- **Legacy Assets** - Removed outdated images and icons
- **Development Cruft** - Cleaned build artifacts and temporary files

### 🛠️ Migration Guide

#### **For Developers**
1. **Node.js 18+** required (previously no Node.js requirement)
2. **npm install** replaces bower install
3. **npm run dev** replaces gulp serve
4. **src-modern/** contains new source files
5. **Alpine.js syntax** replaces jQuery code

#### **For Customization**
1. **SCSS Variables** in `src-modern/styles/scss/abstracts/_variables.scss`
2. **Component Styles** in `src-modern/styles/scss/components/`
3. **JavaScript Components** in `src-modern/scripts/components/`
4. **Vite Configuration** in `vite.config.js`

### 📈 Breaking Changes

- **Node.js 18+ Required** - Modern development environment needed
- **Browser Support** - IE11 and legacy browsers no longer supported
- **Build System** - Complete change from Gulp to Vite
- **JavaScript API** - Alpine.js replaces jQuery patterns
- **CSS Structure** - SCSS architecture replaces LESS files
- **File Organization** - New directory structure in `src-modern/`

### 🎯 Upgrade Path

1. **Backup Current Implementation** - Save existing customizations
2. **Install Dependencies** - `npm install` with Node.js 18+
3. **Review New Structure** - Familiarize with `src-modern/` organization
4. **Migrate Customizations** - Port themes and custom code
5. **Test Functionality** - Verify all features work as expected
6. **Deploy New Version** - Use `npm run build` for production

---

## [2.3.2] - 2015-01-12 (Legacy)

### Added
- Bootstrap 3.3.6 support
- Many plugins updated
- RTL language support
- Gulp build system
- jQuery-based interactions

### Features
- Basic admin dashboard
- Form components
- Data tables
- Chart integration
- File upload functionality

---

## [2.3.1] - 2014-11-01 (Legacy)

### Added
- Bootstrap 3.3.0 support
- Fixed jquery-timepicker stylesheet
- Added metisMenu plugin
- Many plugins updated

---

## [2.2.7] - 2014-07-18 (Legacy)

### Added
- Added some layouts sample

---

## [2.2.6] - 2014-07-07 (Legacy)

### Added
- Bootstrap 3.2.0 support

---

## [2.2.5] - 2014-06-04 (Legacy)

### Added
- Fixed side panel(s) code
- Deprecated main.js
- Added core.js & app.js

---

## [2.2.4] - 2014-04-23 (Legacy)

### Added
- RTL version added
- Remove CLEditor
- Added CKEditor

---

## [2.2.3] - 2014-04-13 (Legacy)

### Added
- Rewrite all code

---

## [2.2.2] - 2014-04-10 (Legacy)

### Added
- Remove `alterne.html`
- Right panel available

---

## [2.2.1] - 2014-04-07 (Legacy)

### Added
- All dependency require bower & npm

---

## [2.2.0] - 2014-02-28 (Legacy)

### Added
- Rewrite menu, layout, etc

---

## [2.1.4] - 2014-02-16 (Legacy)

### Added
- Update bootstrap 3.1.1
- Add screenfull.js
- Fixed #menu

---

## [2.1.3] - 2014-01-19 (Legacy)

### Added
- Add suitcss's flex-embed component

---

## [2.1.2] - 2013-11-30 (Legacy)

### Added
- Create menu plugin
- Rewrite `menu.less`

---

## [2.1.1.2] - 2013-10-28 (Legacy)

### Added
- Add bower

---

## [2.1.1.1] - 2013-10-28 (Legacy)

### Added
- Remove bootstrap, font awesome, gmaps submodule

---

## [2.1.1] - 2013-10-23 (Legacy)

### Added
- Added `bgimage.html`
- Added `bgcolor.html` pages

---

## [2.1] - 2013-10-22 (Legacy)

### Added
- Various improvements

---

## [1.0] - 2013-02-14 (Legacy)

### Added
- Initial release
- Bootstrap 2.3.2 framework
- Basic admin layout
- Essential components

---

**Note**: Versions prior to 3.0.0 are considered legacy and are no longer actively maintained. Please upgrade to 3.0.0 for the latest features, security updates, and modern web standards compliance.