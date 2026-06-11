import { APIRequestContext } from "@playwright/test";
import { Booking, BookingResponse } from "../types/booking.types";

export class BookingClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createBooking(data: Booking): Promise<BookingResponse> {
    const response = await this.request.post("/booking", {
      data,
    });
    return response.json();
  }

  async getBooking(id: number): Promise<Booking | null> {
    const response = await this.request.get(`/booking/${id}`);
    if (response.status() === 404) {
      return null;
    }
    return response.json();
  }

  async updateBooking(
    id: number,
    data: Booking,
    token: string,
  ): Promise<Booking> {
    const response = await this.request.put(`/booking/${id}`, {
      data,
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response.json();
  }

  async deleteBooking(id: number, token: string): Promise<void> {
    await this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
