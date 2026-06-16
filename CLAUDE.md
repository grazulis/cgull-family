# cgull-family

<!-- One-paragraph description: what this project is and who it's for. -->

The CGULL Family app is for parents of children who have been enrolled into the C-GULL birth cohort study (https://www.cgullstudy.com/) to allow them to see what data has been collected about their child and themselves across different local health data sources, to recieve news about the study, get notifications about follow up and learn about opportunities to participate in further sub-studies. 

## Stack

<!-- Languages, frameworks, runtimes, package manager, key libraries. -->

This is a protoype project to be designed in HTML but scalable for viewing easily on a phone screen or a desktop computer using Safari or Chrome. For the prototype test data will be created and can be stored locally, without connecting to a backend. In the future this may take the form of a personal data store.

## Layout

<!-- Top-level directories and what lives in each. -->
```
.
├── index.html              ← landing page (entry point)
├── select.html             ← child picker (multi-births)
├── olivia.html             ← per-child hub (sample)
├── news.html               ← "Stay in the loop" updates
├── next.html               ← "Know what's next" — upcoming milestones
├── style.css               ← all styling
├── app.js                  ← shared interactions (report-an-error dialog, etc.)
├── imgs/                   ← logo and any image assets
├── tests/                  ← Playwright happy-path spec
├── playwright.config.js
├── package.json            ← dev-only (Playwright)
├── .nojekyll               ← tells GitHub Pages to skip Jekyll processing
├── .gitignore
├── DESIGN.md               ← design system notes
└── CLAUDE.md               ← this file
```

All asset paths are **relative** (`href="news.html"`, `src="imgs/..."`, etc.) so the site works whether served from the domain root locally or from a project sub-path on GitHub Pages (`username.github.io/cgull-family/`). Never reintroduce leading-slash paths.

## Commands

<!-- Common dev commands: install, run, build, test, lint, format. -->

```bash
# Start a local server (Python built-in, no install needed)
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## Deploying (GitHub Pages)

The repo is structured to deploy as-is from the root of `main`:

1. Push to a GitHub repo (`git init` if not yet a repo, then `git remote add origin …` and push).
2. **Repo Settings → Pages → Build and deployment**
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `(root)`
3. Wait ~30 seconds; the site appears at `https://<user>.github.io/<repo>/`.

Notes:
- `.nojekyll` ships at the repo root so GH Pages serves files verbatim (no Jekyll processing, no swallowed underscore-prefixed files).
- All in-page links use relative paths so the site works under a project sub-path.
- `node_modules/`, Playwright artifacts, OS noise, and `.claude/` are git-ignored — nothing dev-only ends up deployed.
- No build step. Edits land on the live site as soon as a push to `main` finishes propagating.

## Conventions

<!-- Style, naming, file organization, commit message format, branch naming. -->

## Testing

Three tiers, scaled to a prototype. Keep tooling light — heavy frameworks would dwarf the app.

### 1. Manual smoke checklist (essential)

Walk before any demo. Tracked in `TESTING.md`:

- Loads on iPhone Safari, Android Chrome, desktop Chrome, desktop Safari
- Layout reflows from ~360px to ~1440px without horizontal scroll
- Every screen renders with the sample CSV (data view, news, notifications, sub-studies)
- localStorage persists across reload; clearing it falls back to seed data cleanly
- Empty state (no data rows for a child) and error state (malformed CSV row) don't crash the page

### 2. Unit tests for pure logic

Anything in `app.js` that isn't DOM manipulation — CSV parsing, date formatting, filtering data by child, notification scheduling — gets a unit test. Use a zero-config runner like [`uvu`](https://github.com/lukeed/uvu) or a browser-native `<script type="module">` test page. **Do not** pull in Jest/Vitest unless the project outgrows a single `app.js`.

Highest-leverage target: put all data access behind a small `dataStore.js` module (`getChildren()`, `getRecordsFor(childId)`, etc.). Unit tests on that module become the contract the future personal-data-store backend will have to satisfy.

### 3. One Playwright happy-path (optional)

Runs against `python3 -m http.server` with no app changes. Covers WebKit + Chromium (matches the Safari/Chrome target) and gives mobile viewport emulation. One spec is enough:

> load app → pick a child → see their data → mark a notification read → reload → state persisted

That single test catches the bulk of regressions.

### Skip for now

- **CSS / visual regression** — overkill while the design is still moving.
- **Real-device testing** — viewport emulation is enough until the UI firms up.
- **Accessibility beyond a Lighthouse run** — note it as a follow-up; a parent-facing health app will eventually need WCAG attention.
- **Backend mocking** — there is no backend; test the localStorage layer directly.

## Gotchas

<!-- Non-obvious things a new contributor (or Claude) would trip over. -->
