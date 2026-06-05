import { Booking } from "../utils/types";

export class BookingBuilder {
  private booking: Booking = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  withFirstname(v: string): this {
    this.booking.firstname = v;
    return this;
  }
  withLastname(v: string): this {
    this.booking.lastname = v;
    return this;
  }
  withTotalPrice(v: number): this {
    this.booking.totalprice = v;
    return this;
  }
  withDepositPaid(v: boolean): this {
    this.booking.depositpaid = v;
    return this;
  }
  withCheckin(v: string): this {
    this.booking.bookingdates.checkin = v;
    return this;
  }
  withCheckout(v: string): this {
    this.booking.bookingdates.checkout = v;
    return this;
  }
  withAdditionalNeeds(v: string): this {
    this.booking.additionalneeds = v;
    return this;
  }

  static random(): Booking {
    const suffix = Date.now();
    return new BookingBuilder()
      .withFirstname(`Test${suffix}`)
      .withLastname(`User${suffix}`)
      .withTotalPrice(Math.floor(Math.random() * 1000) + 50)
      .build();
  }

  build(): Booking {
    return JSON.parse(JSON.stringify(this.booking));
  }
}
