import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';

test('Задание 1: Проверка вкладок в разделе "О компании"', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.navigate();

  await mainPage.openAboutCompany();

  await expect(mainPage.companyTab).toBeVisible();
  await expect(mainPage.ecosystemTab).toBeVisible();
  await expect(mainPage.licensesTab).toBeVisible();
  await expect(mainPage.academyTab).toBeVisible();
  await expect(mainPage.patentsTab).toBeVisible();
  await expect(mainPage.awardsTab).toBeVisible();
  await expect(mainPage.requisitesTab).toBeVisible();
  await expect(mainPage.vacanciesTab).toBeVisible();
  await expect(mainPage.contactsTab).toBeVisible();
});