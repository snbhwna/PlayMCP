# 🚀 CI/CD Pipeline Setup & Configuration Guide

## Overview

This project uses **GitHub Actions** for continuous integration and continuous deployment (CI/CD) of Playwright and Cucumber BDD tests.

## Pipeline Architecture

### Jobs Structure

```yaml
Playwright & BDD Tests CI/CD
│
├── Playwright Tests (9 parallel jobs)
│   ├── Ubuntu + Chromium
│   ├── Ubuntu + Firefox
│   ├── Ubuntu + WebKit
│   ├── Windows + Chromium
│   ├── Windows + Firefox
│   ├── Windows + WebKit
│   ├── macOS + Chromium
│   ├── macOS + Firefox
│   └── macOS + WebKit
│
├── BDD Tests (4 parallel jobs)
│   ├── All Scenarios
│   ├── Smoke Tests
│   ├── Positive Tests
│   └── Negative Tests
│
└── Test Report (aggregation job)
    └── Publishes summary & artifacts
```

## Setup Instructions

### Step 1: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Create a secret with:
   - **Name:** `PLAYWRIGHT_ENV`
   - **Value:** Paste the JSON below

```json
{
  "users": {
    "standard": {
      "username": "standard_user",
      "password": "secret_sauce"
    },
    "locked": {
      "username": "locked_out_user",
      "password": "secret_sauce"
    },
    "problem": {
      "username": "problem_user",
      "password": "secret_sauce"
    },
    "performance": {
      "username": "performance_glitch_user",
      "password": "secret_sauce"
    }
  },
  "baseUrl": "https://www.saucedemo.com"
}
```

### Step 2: Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Under **Actions permissions**, select:
   - ✅ **Allow all actions and reusable workflows**
3. Under **Workflow permissions**, ensure:
   - ✅ **Read and write permissions** (if needed for artifacts)

### Step 3: Push Your Code

Once the workflow file is in `.github/workflows/playwright.yml`, the pipeline will automatically trigger on:

- Push to `main`, `master`, or `develop` branches
- Pull requests to these branches
- Manual workflow dispatch
- Daily at midnight (scheduled)

## Workflow Triggers

### Automatic Triggers

```yaml
on:
  push:
    branches: [ main, master, develop ]
  pull_request:
    branches: [ main, master, develop ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
```

### Manual Trigger

1. Go to **Actions** tab
2. Select **Playwright & BDD Tests CI/CD** workflow
3. Click **Run workflow** dropdown
4. Select branch and click **Run workflow**

## Pipeline Details

### Job: Playwright Tests

**Purpose:** Run Playwright tests across multiple OS and browsers

**Configuration:**
- **Timeout:** 60 minutes
- **Strategy:** Matrix (9 combinations)
- **Browsers Installed:** Per matrix (chromium, firefox, or webkit)

**Steps:**
1. Checkout code
2. Setup Node.js v20
3. Install npm dependencies
4. Install Playwright browsers
5. Create environment file from secrets
6. Run Playwright tests
7. Upload reports and artifacts

**Artifacts:**
- `playwright-report-{os}-{browser}`
- `playwright-results-{os}-{browser}`

### Job: BDD Tests

**Purpose:** Run Cucumber BDD tests with different tag filters

**Configuration:**
- **Timeout:** 30 minutes
- **Platform:** Ubuntu only
- **Strategy:** Matrix (4 test suites)

**Test Suites:**
- **all:** Runs all BDD scenarios
- **smoke:** Runs @smoke tagged tests
- **positive:** Runs @positive tagged tests
- **negative:** Runs @negative tagged tests

**Steps:**
1. Checkout code
2. Setup Node.js v20
3. Install npm dependencies
4. Install Playwright browsers (Chromium only)
5. Create environment file from secrets
6. Run BDD tests (suite-specific)
7. Upload HTML, JSON, and JUnit reports

**Artifacts:**
- `cucumber-report-{suite}` (HTML)
- `cucumber-json-{suite}` (JSON)
- `cucumber-junit-{suite}` (XML)

### Job: Test Report

**Purpose:** Aggregate and publish test results

**Configuration:**
- **Depends on:** playwright-tests, bdd-tests
- **Runs:** Always (even if tests fail)

**Steps:**
1. Download all artifacts
2. Publish comprehensive test summary to GitHub

## Viewing Test Results

### GitHub Actions Summary

After a workflow run:

1. Go to **Actions** tab
2. Click on the workflow run
3. View the **Summary** section for:
   - Test execution overview
   - Matrix results
   - BDD test suites status
   - Artifacts section

### Downloading Reports

1. Scroll to **Artifacts** section in workflow summary
2. Click to download any report
3. Extract and open HTML files in browser

### Test Logs

1. Click on any job (e.g., "Playwright - ubuntu-latest - chromium")
2. Expand steps to view detailed logs
3. Review test execution output

## Pipeline Optimization

### Caching Strategy

The pipeline uses npm caching to speed up builds:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

### Fail-Fast Disabled

Both jobs use `fail-fast: false` to ensure all matrix combinations run even if one fails.

### Parallel Execution

- **Playwright:** 9 jobs run in parallel
- **BDD:** 4 jobs run in parallel
- **Total:** Up to 13 concurrent jobs

## Cost Considerations

### GitHub Actions Minutes

- **Free tier:** 2,000 minutes/month
- **This pipeline:** ~30-45 minutes per run (all jobs combined)
- **Estimated runs:** ~44-66 runs per month on free tier

### Optimization Tips

1. **Run BDD on Ubuntu only** (already implemented)
2. **Use matrix selectively** - Can reduce browser/OS combinations
3. **Schedule wisely** - Adjust cron frequency if needed
4. **Manual triggers** - Use workflow_dispatch for on-demand runs

## Troubleshooting

### Pipeline Failing?

**Check:**
1. ✅ Secrets are configured correctly
2. ✅ Dependencies in package.json are up to date
3. ✅ Playwright browsers install successfully
4. ✅ Test code doesn't have syntax errors

### Artifacts Not Uploading?

Ensure:
- Paths in workflow match actual file locations
- Files are generated before upload step
- `if: always()` is present on upload steps

### Long Run Times?

Consider:
- Reducing matrix combinations
- Running fewer test suites
- Using smaller runners (if on paid plan)

## Best Practices

✅ **Keep secrets secure** - Never commit credentials to repository
✅ **Review failed tests** - Download artifacts and analyze reports
✅ **Monitor pipeline health** - Check success rates regularly
✅ **Update dependencies** - Keep Playwright and dependencies current
✅ **Tag your scenarios** - Enables flexible BDD test filtering
✅ **Use meaningful commit messages** - Helps track which change broke tests

## Example Workflow Run

```
✅ Playwright Tests (9/9 passed)
   ├── ✅ Ubuntu + Chromium (6m 23s)
   ├── ✅ Ubuntu + Firefox (6m 45s)
   ├── ✅ Ubuntu + WebKit (7m 12s)
   ├── ✅ Windows + Chromium (8m 34s)
   ├── ✅ Windows + Firefox (8m 56s)
   ├── ✅ Windows + WebKit (9m 21s)
   ├── ✅ macOS + Chromium (7m 45s)
   ├── ✅ macOS + Firefox (8m 02s)
   └── ✅ macOS + WebKit (8m 29s)

✅ BDD Tests (4/4 passed)
   ├── ✅ All Scenarios (44s)
   ├── ✅ Smoke Tests (10s)
   ├── ✅ Positive Tests (24s)
   └── ✅ Negative Tests (20s)

✅ Test Report
   └── ✅ Published summary (15s)

Total Time: ~10m 30s
Artifacts: 22 files uploaded
```

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [Cucumber CI Integration](https://cucumber.io/docs/cucumber/continuous-integration/)

---

**Your CI/CD pipeline is ready! 🚀**

Push your code and watch the magic happen in the Actions tab!
