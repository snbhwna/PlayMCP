import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the website before each test
    await page.goto('https://www.saucedemo.com');
  });

  test('Scenario 1: Valid Login', async ({ page }) => {
    // The credentials are visible on the login page
    // Username: standard_user
    // Password: secret_sauce
    
    // Fill in the login form
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    
    // Click the login button
    await page.click('#login-button');
    
    // Assertions to validate successful login
    // 1. Verify URL changed to inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // 2. Verify the inventory container is visible
    await expect(page.locator('.inventory_container')).toBeVisible();
    
    // 3. Verify the shopping cart is present (indicates user is logged in)
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    
    // 4. Verify at least one product is displayed
    await expect(page.locator('.inventory_item')).toHaveCount(6); // SauceDemo shows 6 products
    
    // 5. Verify the app logo is displayed
    await expect(page.locator('.app_logo')).toBeVisible();
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    
    // 6. Verify the burger menu is accessible (user is authenticated)
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
    
    // 7. Verify no error message is displayed
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
    
    console.log('✅ Scenario 1: Valid Login - PASSED');
  });

  test('Scenario 2: Locked Out User', async ({ page }) => {
    // The credentials for locked out user are visible on the login page
    // Username: locked_out_user
    // Password: secret_sauce
    
    // Fill in the login form with locked out user credentials
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    
    // Click the login button
    await page.click('#login-button');
    
    // Assertions to validate locked out user scenario
    // 1. Verify user stays on the login page (URL doesn't change)
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    // 2. Verify error message is displayed
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    
    // 3. Verify specific error message text
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out');
    
    // 4. Verify error button (X) is present to close the error
    await expect(page.locator('.error-button')).toBeVisible();
    
    // 5. Verify login button is still present (user hasn't logged in)
    await expect(page.locator('#login-button')).toBeVisible();
    
    // 6. Verify the form fields are still present
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    
    // 7. Verify the inventory page is not accessible
    await expect(page.locator('.inventory_container')).not.toBeVisible();
    
    // 8. Verify the error styling is applied
    await expect(page.locator('#user-name')).toHaveClass(/error/);
    await expect(page.locator('#password')).toHaveClass(/error/);
    
    console.log('✅ Scenario 2: Locked Out User - PASSED');
  });

  test.afterEach(async ({ page, browser }) => {
    // Close the page after each test
    await page.close();
  });
});

test.afterAll(async ({ browser }) => {
  // Close the browser after all tests
  await browser.close();
});
