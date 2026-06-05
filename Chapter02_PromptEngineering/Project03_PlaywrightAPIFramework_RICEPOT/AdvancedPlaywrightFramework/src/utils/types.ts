export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthTokenResponse {
  token: string;
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

export interface BookingId {
  bookingid: number;
}

export interface CreateBookingResponse {
  bookingid: number;
  booking: Booking;
}

export interface BookingSearchParams {
  firstname?: string;
  lastname?: string;
  checkin?: string;
  checkout?: string;
}

export type PartialBooking = Partial<Booking>;
