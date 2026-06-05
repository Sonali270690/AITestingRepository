import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

const env = process.env.TEST_ENV || "qa";
dotenv.config({ path: path.resolve(__dirname, `src/config/.env.${env}`) });

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["junit", { outputFile: "test-results/results.xml" }],
  ],
  use: {
    baseURL: process.env.BASE_URL || "https://restful-booker.herokuapp.com",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "api",
      testMatch: /.*\.spec\.ts/,
    },
  ],
});
