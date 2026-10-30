/** Central configuration for browser and application settings. */
export const config = {
  baseUrl: process.env.BASE_URL ?? "https://www.flipkart.com",
  headless: process.env.HEADLESS === "true",
  slowMo: Number(process.env.SLOW_MO ?? 0),
  defaultTimeout: 60000,
};
