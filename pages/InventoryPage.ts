import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.pageTitle = page.locator('.title');
  }

  async isLoaded(): Promise<boolean> {
    return await this.inventoryContainer.isVisible();
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async getInventoryItemsCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
