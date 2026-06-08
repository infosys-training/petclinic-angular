# Angular Migration Estimate — PetClinic Angular

**Date:** 2026-06-08
**Current Version:** Angular 16.2.1 · TypeScript 4.9.5 · RxJS 6.3.1
**Target Version:** Angular 19 (latest stable) · TypeScript 5.6+ · RxJS 7.8+

---

## 1. Codebase Inventory

| Metric | Count |
|--------|-------|
| Components | 21 |
| Services / Injectables | 10 |
| NgModules | 16 (7 feature + 7 routing + app + testing) |
| Resolvers (class-based) | 2 |
| HTML Templates | 22 |
| CSS Stylesheets | 24 |
| Unit Test Specs | 28 |
| E2E Tests (Protractor) | 2 |
| TypeScript LoC (src/) | ~5,280 |
| HTML LoC | ~1,570 |
| CSS LoC | ~410 |
| Feature Domains | 6 (Owners, Pets, PetTypes, Visits, Vets, Specialties) |

### Dependency Snapshot

| Dependency | Current | Target | Status |
|-----------|---------|--------|--------|
| @angular/core | 16.2.1 | 19.x | 3 major versions behind |
| @angular/material | 16.2.1 | 19.x | 3 major versions behind |
| TypeScript | 4.9.5 | 5.6+ | Required by Angular 18+ |
| RxJS | ^6.3.1 | 7.8+ | Major version behind |
| Bootstrap | ^3.3.7 | 5.3+ | **EOL** — 2 majors behind |
| jQuery | ^3.3.1 | — | **Remove** (unnecessary with Angular) |
| Tether | ^1.4.4 | — | **Remove** (Bootstrap 3 dependency) |
| Moment.js | ^2.29.4 | — | **Replace** (maintenance-mode, 300 KB) |
| Protractor | ~7.0.0 | — | **Replace** (deprecated, removed from CLI) |
| ESLint | ^8.39.0 | 9.x | Flat config migration |
| Karma | ~6.3.16 | — | Consider migration to Jest/Vitest |
| core-js | ^3.32.1 | — | **Remove** (no longer needed) |

---

## 2. Migration Work Items

### Phase 1 — Foundation (Angular 16 → 17)
*Estimated effort: 3–4 days*

| # | Work Item | Files Affected | Effort | Risk |
|---|-----------|---------------|--------|------|
| 1.1 | Run `ng update @angular/core@17 @angular/cli@17` | package.json, angular.json | 0.5d | Low |
| 1.2 | Run `ng update @angular/material@17` | package.json | 0.5d | Low |
| 1.3 | Upgrade TypeScript to 5.2+ | tsconfig.json, package.json | 0.25d | Low |
| 1.4 | Upgrade RxJS 6 → 7 (`rxjs-compat` removal) | All services, tests | 0.5d | Medium |
| 1.5 | Migrate `*ngIf` / `*ngFor` → `@if` / `@for` (new control flow) | 22 HTML files | 1d | Low |
| 1.6 | Fix deprecation warnings & test failures | Test files | 0.5d | Medium |

**Key Breaking Changes:**
- `@for` requires a `track` expression (e.g. `@for (item of items; track item.id)`)
- TypeScript 5.x strict mode changes
- RxJS 7 removes deprecated `throwError(string)` — must use `throwError(() => new Error(...))`

---

### Phase 2 — Standalone Migration (Angular 17 → 18)
*Estimated effort: 5–7 days*

| # | Work Item | Files Affected | Effort | Risk |
|---|-----------|---------------|--------|------|
| 2.1 | Run `ng update @angular/core@18 @angular/cli@18` | package.json, angular.json | 0.5d | Low |
| 2.2 | Convert all 21 components to **standalone** | 21 component .ts files | 2d | Medium |
| 2.3 | Remove all 16 NgModule files | 16 module .ts files | 0.5d | Low |
| 2.4 | Replace `HttpClientModule` → `provideHttpClient()` | app.module.ts → app.config.ts | 0.25d | Low |
| 2.5 | Replace `FormsModule` / `ReactiveFormsModule` → per-component imports | 21 components, 28 test files | 1d | Medium |
| 2.6 | Migrate class-based resolvers → functional `ResolveFn` | 2 resolver files, 2 routing files | 0.5d | Low |
| 2.7 | Replace `RouterTestingModule` → `provideRouter()` in tests | 10 test files | 0.5d | Low |
| 2.8 | Move `bootstrapModule` → `bootstrapApplication` with `appConfig` | main.ts, new app.config.ts | 0.25d | Low |
| 2.9 | Remove `polyfills.ts` entry (move to angular.json `polyfills` array) | polyfills.ts, angular.json | 0.25d | Low |
| 2.10 | Switch builder: `browser` → `application` (esbuild) | angular.json | 0.5d | Medium |
| 2.11 | Fix all test failures from standalone migration | 28 test files | 1d | Medium |

**Key Breaking Changes:**
- `HttpClientModule` removed — must use `provideHttpClient()`
- NgModule-based bootstrapping deprecated
- `BrowserAnimationsModule` → `provideAnimations()`
- `fileReplacements` for environment files changes with `application` builder

---

### Phase 3 — Latest Angular + Signals (Angular 18 → 19)
*Estimated effort: 2–3 days*

| # | Work Item | Files Affected | Effort | Risk |
|---|-----------|---------------|--------|------|
| 3.1 | Run `ng update @angular/core@19 @angular/cli@19` | package.json, angular.json | 0.5d | Low |
| 3.2 | Run `ng update @angular/material@19` | package.json | 0.5d | Low |
| 3.3 | Adopt `input()` / `output()` signal APIs (optional but recommended) | 21 components | 1d | Low |
| 3.4 | Convert `subscribe()` chains to signal-based patterns where beneficial | ~44 subscribe calls | 1d | Medium |
| 3.5 | ESLint 9 flat config migration | .eslintrc.json → eslint.config.js | 0.25d | Low |

---

### Phase 4 — Dependency Modernization
*Estimated effort: 5–7 days*

| # | Work Item | Files Affected | Effort | Risk |
|---|-----------|---------------|--------|------|
| 4.1 | **Bootstrap 3 → Bootstrap 5** | All 22 HTML files, 24 CSS files, angular.json | 2–3d | **High** |
| 4.2 | **Remove jQuery + Tether** | angular.json scripts array | 0.25d | Low |
| 4.3 | **Moment.js → date-fns** (or native Temporal API) | 10 files using moment | 1d | Medium |
| 4.4 | Update Material datepicker adapter (Moment → date-fns) | pets.module, visits.module | 0.5d | Medium |
| 4.5 | Remove `core-js` polyfill | package.json, polyfills | 0.25d | Low |
| 4.6 | **Protractor → Playwright** (E2E test migration) | 2 E2E files, protractor.conf.js | 1d | Medium |
| 4.7 | Optional: Karma/Jasmine → Jest or Vitest | karma.conf.js, 28 spec files | 2d | Medium |

**Bootstrap 3 → 5 Breaking Changes (highest-risk item):**
- Grid: `col-sm-offset-*` → `offset-sm-*`
- Panels → Cards
- Glyphicons removed → use Bootstrap Icons or Font Awesome
- `btn-default` → `btn-secondary` or `btn-outline-primary`
- `has-error` / `has-success` → `is-invalid` / `is-valid`
- `control-label` → `form-label`
- jQuery plugins → native Bootstrap JS

---

## 3. Effort Summary

| Phase | Description | Effort (days) | Risk Level |
|-------|-------------|---------------|------------|
| Phase 1 | Angular 16 → 17 + RxJS 7 | 3–4 | Low–Medium |
| Phase 2 | Angular 17 → 18 + Standalone | 5–7 | Medium |
| Phase 3 | Angular 18 → 19 + Signals | 2–3 | Low–Medium |
| Phase 4 | Dependency Modernization | 5–7 | Medium–High |
| | **Buffer** (integration issues, regressions) | 2–3 | |
| | **Total** | **17–24 days** | |

> **Recommended team size:** 1–2 developers
> **Calendar estimate:** 4–6 weeks (1 dev) or 2–3 weeks (2 devs)

---

## 4. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | Bootstrap 3→5 visual regressions | High | High | Side-by-side visual comparison testing; consider a CSS migration tool |
| R2 | Test breakage from standalone migration | Medium | Medium | Migrate tests alongside components; keep green build at each step |
| R3 | RxJS 7 behavioral changes | Medium | Medium | Run full test suite after RxJS upgrade before other changes |
| R4 | Material datepicker date-format changes | Medium | Medium | Write golden-file date tests before migration |
| R5 | Backend API incompatibility | Low | High | Backend (Spring PetClinic REST) is unchanged; verify REST contract |
| R6 | Loss of E2E coverage during Protractor removal | Medium | Low | Protractor tests are minimal (1 test); Playwright adds better coverage |

---

## 5. Recommended Migration Strategy

### Approach: **Incremental, one major version at a time**

```
┌─────────────────────────────────────────────────────┐
│  Week 1-2:  Angular 16→17 + RxJS 7 + control flow  │
│             (Phase 1)                               │
├─────────────────────────────────────────────────────┤
│  Week 2-4:  Angular 17→18 + standalone + builder    │
│             (Phase 2)                               │
├─────────────────────────────────────────────────────┤
│  Week 4-5:  Angular 18→19 + signals + ESLint 9     │
│             (Phase 3)                               │
├─────────────────────────────────────────────────────┤
│  Week 5-6:  Bootstrap 5, remove moment/jQuery,      │
│             Playwright E2E (Phase 4)                │
└─────────────────────────────────────────────────────┘
```

### Key Principles

1. **One `ng update` per PR** — keeps diffs reviewable and bisectable
2. **Green build after every step** — all 28 unit tests must pass before proceeding
3. **Bootstrap 3 → 5 is the riskiest item** — do it last so Angular infra is stable
4. **Automate where possible** — Angular CLI schematics handle much of the mechanical migration (`ng update` runs code transforms)
5. **Feature-freeze during migration** — avoid parallel feature work on the same branch

---

## 6. Files Changed Per Phase (Summary)

| Phase | New Files | Modified Files | Deleted Files |
|-------|-----------|---------------|---------------|
| Phase 1 | 0 | ~30 (package.json, tsconfigs, HTML templates, services) | 0 |
| Phase 2 | 1 (app.config.ts) | ~60 (all components, tests, routing, angular.json) | 17 (16 NgModules + polyfills.ts) |
| Phase 3 | 0 | ~25 (components, package.json, eslint config) | 1 (.eslintrc.json) |
| Phase 4 | 2 (playwright config, playwright test) | ~50 (all templates, CSS, angular.json) | 3 (protractor.conf.js, e2e/ files) |

---

## 7. Out-of-Scope / Optional Enhancements

These are not required for the migration but are worth considering:

- **Server-Side Rendering (SSR)** — Angular 19 has first-class SSR with hydration
- **Zoneless change detection** — experimental in v18, stable path in v19
- **Typed forms** — convert template-driven forms to strongly-typed reactive forms
- **Cypress instead of Playwright** — alternative E2E framework if team prefers
- **Replace Bootstrap entirely with Angular Material** — reduces two UI frameworks to one
- **Jest migration** — replace Karma/Jasmine with Jest for faster test execution
- **Nx workspace** — monorepo tooling for caching, affected tests, etc.

---

## 8. Prerequisites

- [ ] Node.js 20+ (Angular 19 requires Node 20.11+)
- [ ] Ensure Spring PetClinic REST backend is available for integration testing
- [ ] Agree on target UI framework (Bootstrap 5 vs. full Angular Material)
- [ ] Decide E2E framework (Playwright recommended)
- [ ] Decide test runner (keep Karma or migrate to Jest)
