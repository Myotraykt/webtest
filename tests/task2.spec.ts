import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';

test('Задание 2: Сравнение количества патентов', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.navigate();

  await mainPage.openAboutCompany();

  await mainPage.openPatentsSection();

  const totalPatentsCount = await mainPage.getTotalPatentsCount();

  const russianPatentsCount = await mainPage.getRussianPatentsCount();

  expect(russianPatentsCount).toBeLessThanOrEqual(totalPatentsCount);
});