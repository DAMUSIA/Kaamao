# CI/CD Pipeline Commands Reference

This document details the essential commands used in our GitHub Actions CI/CD pipeline. Running these commands locally before pushing or opening a pull request will ensure your branch passes all checks.

---

## 1. Code Quality & Verification

### Code Formatting (Prettier)

Check if all files match formatting guidelines:

```bash
npm run format:check
```

Automatically fix all formatting issues:

```bash
npm run format:write
```

### Linting (ESLint)

Verify there are no syntax, style, or React-specific best-practice violations:

```bash
npm run lint
```

### TypeScript Type Checking

Run the TypeScript compiler to ensure code compiles and matches types:

```bash
npm run typecheck
```

---

## 2. Unit Testing & Coverage

### Run Unit Tests

Run the Vitest test suite once:

```bash
npm run test
```

### Run Tests in Watch Mode

Run Vitest in interactive watch mode for active development:

```bash
npm run test:watch
```

### Run Tests with Coverage Check

Generate coverage reports and verify against the configured thresholds (e.g., 15% lines/functions/statements, 10% branches):

```bash
npx vitest run --coverage
```

> [!NOTE]
> The `@vitest/coverage-v8` package is required to run coverage checks. If missing locally, install it via:
> `npm install --save-dev @vitest/coverage-v8`

---

## 3. Dependency Security Audits

### Scan for High & Critical Vulnerabilities

Audit the project's dependencies for security vulnerabilities at or above `high` severity level (this is the check executed in the CI workflow):

```bash
npm audit --audit-level=high
```

### Fix Vulnerabilities

Automatically resolve vulnerabilities by updating dependency versions within safe semver constraints:

```bash
npm audit fix
```

---

## 4. Production Build Verification

### Local Build Simulation

Run the production build worker to test compilation, asset optimization, and pages generation:

```bash
npm run build
```
