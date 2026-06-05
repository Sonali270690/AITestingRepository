export interface EnvConfig {
  baseURL: string;
  adminUsername: string;
  adminPassword: string;
}

export const envConfig: EnvConfig = {
  baseURL: process.env.BASE_URL || "https://restful-booker.herokuapp.com",
  adminUsername: process.env.ADMIN_USERNAME || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "password123",
};

export const endpoints = {
  auth: "/auth",
  booking: "/booking",
  bookingById: (id: number | string) => `/booking/${id}`,
  ping: "/ping",
} as const;
