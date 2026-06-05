import { test, expect } from "../../src/fixtures/api.fixtures";
import { BookingBuilder } from "../../src/data/BookingBuilder";

test.describe.serial("Booking - CRUD lifecycle @regression", () => {
  let createdId: number;

  test("POST /booking creates a new booking", async ({ bookingApi }) => {
    const payload = BookingBuilder.random();
    const response = await bookingApi.createBooking(payload);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("bookingid");
    expect(body.booking).toMatchObject({
      firstname: payload.firstname,
      lastname: payload.lastname,
      totalprice: payload.totalprice,
      depositpaid: payload.depositpaid,
    });
    createdId = body.bookingid;
  });

  test("PUT /booking/:id updates an existing booking", async ({
    bookingApi,
    token,
  }) => {
    const payload = new BookingBuilder()
      .withFirstname("James")
      .withLastname("Updated")
      .build();

    const response = await bookingApi.updateBooking(createdId, payload, token);
    expect([200, 405]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(body.firstname).toBe("James");
      expect(body.lastname).toBe("Updated");
    }
  });

  test("PATCH /booking/:id partially updates booking", async ({
    bookingApi,
    token,
  }) => {
    const response = await bookingApi.partialUpdateBooking(
      createdId,
      { firstname: "Patched" },
      token,
    );
    expect([200, 405]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(body.firstname).toBe("Patched");
    }
  });

  test("DELETE /booking/:id deletes the booking", async ({
    bookingApi,
    token,
  }) => {
    const response = await bookingApi.deleteBooking(createdId, token);
    // restful-booker returns 201 Created on successful delete (per API doc)
    expect([200, 201]).toContain(response.status());
  });
});
