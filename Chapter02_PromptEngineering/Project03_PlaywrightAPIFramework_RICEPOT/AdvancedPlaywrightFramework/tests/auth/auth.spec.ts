import { test, expect } from "../../src/fixtures/api.fixtures";

test.describe("Auth - CreateToken @smoke", () => {
  test("POST /auth with valid credentials returns a token", async ({
    authApi,
  }) => {
    const response = await authApi.createToken();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("token");
    expect(typeof body.token).toBe("string");
    expect(body.token.length).toBeGreaterThan(0);
  });

  test("POST /auth with invalid credentials returns reason", async ({
    authApi,
  }) => {
    const response = await authApi.createToken({
      username: "invalid",
      password: "invalid",
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("reason");
    expect(body.reason).toBe("Bad credentials");
  });
});
