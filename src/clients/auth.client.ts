import { APIRequestContext } from "@playwright/test";
import { TokenResponse } from "../types/booking.types";

export class AuthClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getToken(): Promise<string> {
    const response = await this.request.post("/auth", {
      data: {
        username: "admin",
        password: "password123",
      },
    });
    const body: TokenResponse = await response.json();
    return body.token;
  }
}
