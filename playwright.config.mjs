import { defineConfig } from '@playwright/test';

const baseURL = process.env.PAGE_URL;
if (!baseURL) throw new Error('PAGE_URL is required for deployed acceptance tests');

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.browser.mjs',
  use: { baseURL, headless: true },
  reporter: [['list']],
});
