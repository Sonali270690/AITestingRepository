import { BaseApiClient } from "./BaseApiClient";
import { endpoints } from "../config/env.config";

export class PingApi extends BaseApiClient {
  async healthCheck() {
    return this.get(endpoints.ping);
  }
}
