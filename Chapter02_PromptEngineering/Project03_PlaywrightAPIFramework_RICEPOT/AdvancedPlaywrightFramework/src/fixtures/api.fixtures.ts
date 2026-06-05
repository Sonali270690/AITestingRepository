import { test as base } from "@playwright/test";
import { AuthApi } from "../api/AuthApi";
import { BookingApi } from "../api/BookingApi";
import { PingApi } from "../api/PingApi";

type ApiFixtures = {
  authApi: AuthApi;
  bookingApi: BookingApi;
  pingApi: PingApi;
  token: string;
};

export const test = base.extend<ApiFixtures>({
  authApi: async ({}, use) => {
    const api = new AuthApi();
    await api.init();
    await use(api);
    await api.dispose();
  },

  bookingApi: async ({}, use) => {
    const api = new BookingApi();
    await api.init();
    await use(api);
    await api.dispose();
  },

  pingApi: async ({}, use) => {
    const api = new PingApi();
    await api.init();
    await use(api);
    await api.dispose();
  },

  token: async ({ authApi }, use) => {
    const token = await authApi.getToken();
    await use(token);
  },
});

export { expect } from "@playwright/test";
