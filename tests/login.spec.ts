import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage } from '../pages';
import { testUsers, errorMessages } from '../fixtures/users';
import { testData } from '../fixtures/testData';

test.describe('SauceDemo Login Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
  });

  test('Scenario 1: Valid Login - Standard User', async ({ page }) => {
    // Arrange
    const user = testUsers.standard;

    // Act
    await loginPage.login(user.username, user.password);

    // Assert
    await expect(page).toHaveURL(testData.inventoryUrl);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.pageTitle).toHaveText(testData.pageTitle);
    
    const itemsCount = await inventoryPage.getInventoryItemsCount();
    expect(itemsCount).toBe(testData.expectedInventoryItemsCount);
    
    // Verify user is actually logged in by checking if logout option is available
    await inventoryPage.menuButton.click();
    await expect(inventoryPage.logoutLink).toBeVisible();
  });

  test('Scenario 2: Locked Out User', async ({ page }) => {
    // Arrange
    const user = testUsers.locked;

    // Act
    await loginPage.login(user.username, user.password);

    // Assert - User should remain on login page
    await expect(page).toHaveURL(testData.baseUrl + '/');
    
    // Error message should be displayed
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(errorMessages.lockedOut);
    
    // Inventory page should not be visible
    await expect(inventoryPage.inventoryContainer).not.toBeVisible();
    
    // Login form should still be present
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Additional: Invalid Username', async ({ page }) => {
    // Act
    await loginPage.login('invalid_user', 'secret_sauce');

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(errorMessages.invalidCredentials);
  });

  test('Additional: Empty Username', async ({ page }) => {
    // Act
    await loginPage.login('', 'secret_sauce');

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(errorMessages.usernameRequired);
  });

  test('Additional: Empty Password', async ({ page }) => {
    // Act
    await loginPage.login('standard_user', '');

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(errorMessages.passwordRequired);
  });
});
