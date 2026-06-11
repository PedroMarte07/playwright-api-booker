import { test, expect } from "@playwright/test";
import { BookingClient } from "../src/clients/booking.client";
import { AuthClient } from "../src/clients/auth.client";
import { validBooking, updatedBooking } from "../src/data/booking.data";

test.describe("Booking API", () => {
  let bookingClient: BookingClient;
  let authClient: AuthClient;
  let token: string;

  test.beforeEach(async ({ request }) => {
    bookingClient = new BookingClient(request);
    authClient = new AuthClient(request);
    token = await authClient.getToken();
  });

  test("should create a booking", async () => {
    const response = await bookingClient.createBooking(validBooking);
    expect(response.bookingid).toBeDefined();
    expect(response.booking.firstname).toBe(validBooking.firstname);
    expect(response.booking.lastname).toBe(validBooking.lastname);
    expect(response.booking.totalprice).toBe(validBooking.totalprice);
  });

  test("should get a booking", async () => {
    const created = await bookingClient.createBooking(validBooking);
    const response = await bookingClient.getBooking(created.bookingid);
    expect(response).not.toBeNull();
    expect(response!.firstname).toBe(validBooking.firstname);
    expect(response!.lastname).toBe(validBooking.lastname);
  });

  test("should update a booking", async () => {
    const created = await bookingClient.createBooking(validBooking);
    const response = await bookingClient.updateBooking(
      created.bookingid,
      updatedBooking,
      token,
    );
    expect(response.firstname).toBe(updatedBooking.firstname);
    expect(response.totalprice).toBe(updatedBooking.totalprice);
    expect(response.bookingdates.checkin).toBe(
      updatedBooking.bookingdates.checkin,
    );
  });

  test("should delete a booking", async () => {
    const created = await bookingClient.createBooking(validBooking);
    await bookingClient.deleteBooking(created.bookingid, token);
    const response = await bookingClient.getBooking(created.bookingid);
    expect(response).toBeNull();
  });
});
