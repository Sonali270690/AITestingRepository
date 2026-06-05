import { test, expect } from "../../src/fixtures/api.fixtures";

test.describe("Booking - Read endpoints @regression", () => {
  test("GET /booking returns array of booking IDs", async ({ bookingApi }) => {
    const response = await bookingApi.getBookingIds();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    if (body.length > 0) {
      expect(body[0]).toHaveProperty("bookingid");
      expect(typeof body[0].bookingid).toBe("number");
    }
  });

  test("GET /booking with firstname filter", async ({ bookingApi }) => {
    const response = await bookingApi.getBookingIds({ firstname: "sally" });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test("GET /booking/:id returns booking details for a known id", async ({
    bookingApi,
  }) => {
    const idsResp = await bookingApi.getBookingIds();
    const ids = await idsResp.json();
    test.skip(ids.length === 0, "No bookings available to fetch");

    const response = await bookingApi.getBooking(ids[0].bookingid);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("firstname");
    expect(body).toHaveProperty("lastname");
    expect(body).toHaveProperty("totalprice");
    expect(body).toHaveProperty("depositpaid");
    expect(body).toHaveProperty("bookingdates");
    expect(body.bookingdates).toHaveProperty("checkin");
    expect(body.bookingdates).toHaveProperty("checkout");
  });

  test("GET /booking/:id with non-existent id returns 404", async ({
    bookingApi,
  }) => {
    const response = await bookingApi.getBooking(9999999);
    expect(response.status()).toBe(404);
  });
});
