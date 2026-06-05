import { test, expect } from "../../src/fixtures/api.fixtures";

test.describe("Ping - HealthCheck @smoke", () => {
  test("GET /ping should return 201 Created", async ({ pingApi }) => {
    const response = await pingApi.healthCheck();
    expect(response.status()).toBe(201);
  });
});
