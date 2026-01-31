# 🎭 Playwright Test Automation Framework with BDD

A comprehensive test automation framework for [SauceDemo](https://www.saucedemo.com) using Playwright with TypeScript, Page Object Model design pattern, and Cucumber BDD.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [BDD Testing with Cucumber](#bdd-testing-with-cucumber)
- [Test Scenarios](#test-scenarios)
- [CI/CD](#cicd)
- [Reports](#reports)

## 🗂️ Project Structure

```
PlayAPI/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD pipeline
├── features/
│   ├── login.feature               # Gherkin feature files (BDD)
│   └── step_definitions/
│       └── login.steps.ts          # Cucumber step definitions
├── fixtures/
│   ├── users.ts                    # User credentials and test data
│   └── testData.ts                 # Application test data
├── pages/
│   ├── LoginPage.ts                # Login page object
│   ├── InventoryPage.ts            # Inventory page object
│   └── index.ts                    # Page exports
├── tests/
│   └── login.spec.ts               # Playwright test scenarios
├── cucumber.config.js              # Cucumber configuration
├── playwright.config.js            # Playwright configuration
├── playwright.env.json             # Environment variables (credentials)
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## ✅ Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git** (for version control)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd PlayAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## ⚙️ Configuration

### Environment Variables

The `playwright.env.json` file contains sensitive credentials. This file is excluded from version control.

**Structure:**
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
    }
  },
  "baseUrl": "https://www.saucedemo.com"
}
```

### Playwright Configuration

The `playwright.config.js` file contains test execution settings:
- Browser types (Chromium, Firefox, WebKit)
- Timeouts and retries
- Base URL
- Report generation
- Screenshot and video capture settings

## 🚀 Running Tests

### Playwright Tests

#### Run all tests
```bash
npm test
```

#### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

#### Run specific test file
```bash
npx playwright test tests/login.spec.ts
```

#### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

#### Run tests in debug mode
```bash
npx playwright test --debug
```

#### Run tests with UI mode (interactive)
```bash
npx playwright test --ui
```

## 🥒 BDD Testing with Cucumber

### Run all BDD tests
```bash
npm run test:bdd
```

### Run smoke tests only
```bash
npm run test:bdd:smoke
```

### Run positive test scenarios
```bash
npm run test:bdd:positive
```

### Run negative test scenarios
```bash
npm run test:bdd:negative
```

### Run BDD tests and open report
```bash
npm run test:bdd:report
```

### Run specific feature file
```bash
npx cucumber-js features/login.feature
```

### Run scenarios by tag
```bash
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@positive"
npx cucumber-js --tags "@negative"
npx cucumber-js --tags "@smoke and @positive"
```

### BDD Test Structure

**Feature Files** (`features/*.feature`)
- Written in Gherkin syntax
- Human-readable test scenarios
- Tagged for easy filtering (@smoke, @positive, @negative)

**Step Definitions** (`features/step_definitions/*.steps.ts`)
- TypeScript implementation of Gherkin steps
- Reusable step functions
- Integration with Page Objects

**Example Gherkin Scenario:**
```gherkin
@smoke @positive
Scenario: Valid Login - Standard User
  Given I am on the SauceDemo login page
  When I login with valid standard user credentials
  Then I should be redirected to the inventory page
  And I should see the page title as "Products"
  And I should see 6 inventory items
```

## 🧪 Test Scenarios

### Login Tests (`tests/login.spec.ts`)

1. **Scenario 1: Valid Login - Standard User**
   - Logs in with valid standard user credentials
   - Verifies successful navigation to inventory page
   - Validates page title and inventory items
   - Confirms logout option is available

2. **Scenario 2: Locked Out User**
   - Attempts login with locked user credentials
   - Verifies error message is displayed
   - Confirms user remains on login page
   - Validates inventory page is not accessible

3. **Additional Test Cases:**
   - Invalid username validation
   - Empty username validation
   - Empty password validation

### Page Objects

**LoginPage** (`pages/LoginPage.ts`)
- `navigate()`: Navigate to login page
- `login(username, password)`: Perform login
- `getErrorMessage()`: Get error message text
- `isErrorVisible()`: Check if error is displayed

**InventoryPage** (`pages/InventoryPage.ts`)
- `isLoaded()`: Check if inventory page loaded
- `getPageTitle()`: Get page title
- `getInventoryItemsCount()`: Count inventory items
- `logout()`: Perform logout

## 📊 Reports

### Playwright Reports

#### View test results
```bash
npx playwright show-report
```

#### Generate HTML report
The HTML report is automatically generated after test execution in the `playwright-report` folder.

#### View trace
```bash
npx playwright show-trace trace.zip
```

### Cucumber Reports

After running BDD tests, reports are generated in multiple formats:

- **HTML Report**: `cucumber-report.html` (Open in browser)
- **JSON Report**: `cucumber-report.json` (For CI/CD integration)
- **JUnit XML**: `cucumber-report.xml` (For CI/CD systems)

**View HTML Report:**
```bash
start cucumber-report.html  # Windows
open cucumber-report.html   # macOS
xdg-open cucumber-report.html  # Linux
```

## 🔄 CI/CD

The project includes a GitHub Actions workflow that:
- Runs on push to `main` branch and pull requests
- Tests on multiple OS (Ubuntu, Windows, macOS)
- Executes tests on multiple browsers
- Generates and uploads test reports
- Stores test artifacts

**Workflow file:** `.github/workflows/playwright.yml`

### Viewing CI/CD Results

1. Go to your GitHub repository
2. Click on the **Actions** tab
3. Select the latest workflow run
4. View test results and download artifacts

## 🛠️ Troubleshooting

### Tests failing locally?
```bash
# Clear Playwright cache
npx playwright install --force

# Update dependencies
npm install
```

### Browser not launching?
```bash
# Install system dependencies (Linux)
npx playwright install-deps
```

### Need to update browsers?
```bash
npx playwright install
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Syntax Reference](https://cucumber.io/docs/gherkin/reference/)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Run tests locally
5. Submit a pull request

## 📝 License

This project is for educational and testing purposes.

---

**Happy Testing! 🎭**
