import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';

test('Задание 3: Поиск патентов', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.navigate();

  await mainPage.searchPatents();

  const searchResultCount = await mainPage.getSearchResultsCount();

  console.log(`Найдено патентов: ${searchResultCount}`);

  expect(searchResultCount).toBeGreaterThan(0);
});