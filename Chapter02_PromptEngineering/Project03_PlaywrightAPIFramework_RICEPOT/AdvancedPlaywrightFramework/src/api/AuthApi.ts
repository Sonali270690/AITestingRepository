import { BaseApiClient } from "./BaseApiClient";
import { endpoints, envConfig } from "../config/env.config";
import { AuthCredentials, AuthTokenResponse } from "../utils/types";

export class AuthApi extends BaseApiClient {
  async createToken(
    credentials: AuthCredentials = {
      username: envConfig.adminUsername,
      password: envConfig.adminPassword,
    },
  ) {
    return this.post(endpoints.auth, { data: credentials });
  }

  async getToken(credentials?: AuthCredentials): Promise<string> {
    const response = await this.createToken(credentials);
    if (response.status() !== 200) {
      throw new Error(`Auth failed with status ${response.status()}`);
    }
    const body = (await response.json()) as AuthTokenResponse;
    if (!body.token) {
      throw new Error("Auth response did not contain a token");
    }
    return body.token;
  }
}
