import { BaseApiClient } from "./BaseApiClient";
import { endpoints } from "../config/env.config";
import { Booking, BookingSearchParams, PartialBooking } from "../utils/types";

export class BookingApi extends BaseApiClient {
  private authHeader(token?: string): Record<string, string> {
    return token ? { Cookie: `token=${token}` } : {};
  }

  async getBookingIds(params?: BookingSearchParams) {
    return this.get(endpoints.booking, {
      params: params as Record<string, string> | undefined,
    });
  }

  async getBooking(id: number | string) {
    return this.get(endpoints.bookingById(id));
  }

  async createBooking(booking: Booking) {
    return this.post(endpoints.booking, { data: booking });
  }

  async updateBooking(id: number | string, booking: Booking, token: string) {
    return this.put(endpoints.bookingById(id), {
      data: booking,
      headers: this.authHeader(token),
    });
  }

  async partialUpdateBooking(
    id: number | string,
    booking: PartialBooking,
    token: string,
  ) {
    return this.patch(endpoints.bookingById(id), {
      data: booking,
      headers: this.authHeader(token),
    });
  }

  async deleteBooking(id: number | string, token: string) {
    return this.delete(endpoints.bookingById(id), {
      headers: this.authHeader(token),
    });
  }
}
