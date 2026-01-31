import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { testUsers, errorMessages } from '../../fixtures/users';
import { testData } from '../../fixtures/testData';

// Set default timeout for all steps
setDefaultTimeout(60000);

// World context to share state between steps
let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;

// Before hook - runs before each scenario
Before(async function () {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
});

// After hook - runs after each scenario
After(async function () {
  await page?.close();
  await context?.close();
  await browser?.close();
});

// Step Definitions

Given('I am on the SauceDemo login page', async function () {
  await loginPage.navigate();
  await expect(page).toHaveURL(testData.baseUrl + '/');
});

When('I login with valid standard user credentials', async function () {
  const user = testUsers.standard;
  await loginPage.login(user.username, user.password);
});

When('I login with locked out user credentials', async function () {
  const user = testUsers.locked;
  await loginPage.login(user.username, user.password);
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

Then('I should be redirected to the inventory page', async function () {
  await expect(page).toHaveURL(testData.inventoryUrl);
  await expect(inventoryPage.inventoryContainer).toBeVisible();
});

Then('I should see the page title as {string}', async function (expectedTitle: string) {
  await expect(inventoryPage.pageTitle).toHaveText(expectedTitle);
});

Then('I should see {int} inventory items', async function (expectedCount: number) {
  const itemsCount = await inventoryPage.getInventoryItemsCount();
  expect(itemsCount).toBe(expectedCount);
});

Then('the logout option should be available in the menu', async function () {
  await inventoryPage.menuButton.click();
  await expect(inventoryPage.logoutLink).toBeVisible();
});

Then('I should remain on the login page', async function () {
  await expect(page).toHaveURL(testData.baseUrl + '/');
});

Then('I should see an error message containing {string}', async function (expectedMessage: string) {
  await expect(loginPage.errorMessage).toBeVisible();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain(expectedMessage);
});

Then('the inventory page should not be visible', async function () {
  await expect(inventoryPage.inventoryContainer).not.toBeVisible();
});

Then('the login form should still be present', async function () {
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});
