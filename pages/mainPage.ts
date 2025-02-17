import { Locator, Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly burgerButton: Locator;
  readonly aboutCompanyLink: Locator;
  readonly nestedAboutCompanyLink: Locator;

  // отдельно пропишем локаторы для вкладок
  readonly companyTab: Locator;
  readonly ecosystemTab: Locator;
  readonly licensesTab: Locator;
  readonly academyTab: Locator;
  readonly patentsTab: Locator;
  readonly awardsTab: Locator;
  readonly requisitesTab: Locator;
  readonly vacanciesTab: Locator;
  readonly contactsTab: Locator;

  // task2
  readonly totalPatentCount: Locator;
  readonly russianPatentCount: Locator;

  // task3
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly searchResult: Locator;
  readonly searchResultCount: Locator;


  constructor(page: Page) {
    this.page = page;
    this.burgerButton = page.locator('button.b-header__menu-hamburger');
    this.aboutCompanyLink = page.locator('div.b-header__mobile-menu-item:has-text("О компании")');
    this.nestedAboutCompanyLink = page.locator('div.b-header__mobile-menu-section:has-text("О компании")');
    this.searchInput = page.locator('input[data-testid="search-input"]');

    // task1
    this.companyTab = page.locator('a.b-header__mobile-menu-link:has-text("Компания «ИнфоТеКС»")');
    this.ecosystemTab = page.locator('a.b-header__mobile-menu-link:has-text("Экосистема ИнфоТеКС")');
    this.licensesTab = page.locator('a.b-header__mobile-menu-link:has-text("Лицензии")');
    this.academyTab = page.locator('a.b-header__mobile-menu-link:has-text("Академия")');
    this.patentsTab = page.locator('a.b-header__mobile-menu-link:has-text("Патенты")');
    this.awardsTab = page.locator('a.b-header__mobile-menu-link:has-text("Награды")');
    this.requisitesTab = page.locator('a.b-header__mobile-menu-link:has-text("Реквизиты")');
    this.vacanciesTab = page.locator('a.b-header__mobile-menu-link:has-text("Вакансии")');
    this.contactsTab = page.locator('a.b-header__mobile-menu-link:has-text("Контакты")');

    // task2
    this.totalPatentCount = page.locator('div.b-files-page__title-count');
    this.russianPatentCount = page.locator('span.b-files-page__category-count');

    // task3
    this.searchButton = page.locator('svg.b-header__menu-icon--loupe');
    this.searchInput = page.locator('input.b-header__search-field');
    this.searchResultCount = page.locator('.b-search-page__result-count span');
    this.searchResult = page.locator('div.b-header__search-total-count a');
  }

  // переходим по ссылке
  async navigate() {
    await this.page.goto('/');
  }

  // открываем раздел "о компании"
  async openAboutCompany() {
    await this.burgerButton.click();

    await this.aboutCompanyLink.waitFor({ state: 'visible' });

    await this.aboutCompanyLink.click();

    await this.nestedAboutCompanyLink.click();
  }

  // открываем секцию "патенты"
  async openPatentsSection() {
    await this.patentsTab.click();
  }

  // получаем общее количество патентов
  async getTotalPatentsCount(): Promise<number> {
    const totalCountText = await this.totalPatentCount.textContent();
    return parseInt(totalCountText || '0', 10);
  }

  // получаем только патенты РФ
  async getRussianPatentsCount(): Promise<number> {
    const russianCountText = await this.russianPatentCount.nth(0).textContent();
    return parseInt(russianCountText || '0', 10);
  }

  // логика поиска по ключевому слову "патенты"
  async searchPatents() {
    await this.searchButton.click();

    await this.searchInput.fill('Патенты');

    await this.searchInput.press('Enter');

    await this.searchResult.click();
  }

  // получаем общее количество результатов поиска
  async getSearchResultsCount(): Promise<number> {
    const resultsText = await this.searchResultCount.textContent();
  
    if (!resultsText) {
      return 0;
    }
  
    return parseInt(resultsText.trim(), 10);
  }
}