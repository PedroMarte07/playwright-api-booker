import { Booking } from "../types/booking.types";

export const validBooking: Booking = {
  firstname: "Pedro",
  lastname: "Marte",
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: "2026-07-01",
    checkout: "2026-07-05",
  },
  additionalneeds: "Breakfast",
};

export const updatedBooking: Booking = {
  firstname: "Pedro",
  lastname: "Marte",
  totalprice: 200,
  depositpaid: false,
  bookingdates: {
    checkin: "2026-08-01",
    checkout: "2026-08-10",
  },
  additionalneeds: "Lunch",
};
