import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: true,
      },
    ],
  ],
  use: {
    baseURL: "https://restful-booker.herokuapp.com",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  projects: [
    {
      name: "API Tests",
      testMatch: "**/*.spec.ts",
    },
  ],
});
