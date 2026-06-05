import { APIRequestContext, APIResponse, request } from "@playwright/test";
import { envConfig } from "../config/env.config";
import { Logger } from "../utils/logger";

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
  failOnStatusCode?: boolean;
}

/**
 * BaseApiClient — wraps Playwright APIRequestContext to provide
 * a reusable HTTP client with logging and error handling.
 */
export class BaseApiClient {
  protected context!: APIRequestContext;
  protected baseURL: string;

  constructor(baseURL: string = envConfig.baseURL) {
    this.baseURL = baseURL;
  }

  async init(extraHeaders: Record<string, string> = {}): Promise<void> {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...extraHeaders,
      },
    });
    Logger.info(`Initialized API context for ${this.baseURL}`);
  }

  async dispose(): Promise<void> {
    if (this.context) {
      await this.context.dispose();
      Logger.info("Disposed API context");
    }
  }

  getContext(): APIRequestContext {
    if (!this.context) {
      throw new Error("API context not initialized. Call init() first.");
    }
    return this.context;
  }

  async get(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<APIResponse> {
    Logger.info(`GET ${endpoint}`);
    try {
      return await this.getContext().get(endpoint, {
        headers: options.headers,
        params: options.params,
        failOnStatusCode: options.failOnStatusCode ?? false,
      });
    } catch (err) {
      Logger.error(`GET ${endpoint} failed`, err);
      throw err;
    }
  }

  async post(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<APIResponse> {
    Logger.info(`POST ${endpoint}`);
    try {
      return await this.getContext().post(endpoint, {
        headers: options.headers,
        data: options.data,
        failOnStatusCode: options.failOnStatusCode ?? false,
      });
    } catch (err) {
      Logger.error(`POST ${endpoint} failed`, err);
      throw err;
    }
  }

  async put(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<APIResponse> {
    Logger.info(`PUT ${endpoint}`);
    try {
      return await this.getContext().put(endpoint, {
        headers: options.headers,
        data: options.data,
        failOnStatusCode: options.failOnStatusCode ?? false,
      });
    } catch (err) {
      Logger.error(`PUT ${endpoint} failed`, err);
      throw err;
    }
  }

  async patch(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<APIResponse> {
    Logger.info(`PATCH ${endpoint}`);
    try {
      return await this.getContext().patch(endpoint, {
        headers: options.headers,
        data: options.data,
        failOnStatusCode: options.failOnStatusCode ?? false,
      });
    } catch (err) {
      Logger.error(`PATCH ${endpoint} failed`, err);
      throw err;
    }
  }

  async delete(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<APIResponse> {
    Logger.info(`DELETE ${endpoint}`);
    try {
      return await this.getContext().delete(endpoint, {
        headers: options.headers,
        failOnStatusCode: options.failOnStatusCode ?? false,
      });
    } catch (err) {
      Logger.error(`DELETE ${endpoint} failed`, err);
      throw err;
    }
  }
}
