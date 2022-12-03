import { notFoundError, requestError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function validationUserStatus(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }
}

async function validateSelectRoom(roomId: number) {
  const selectRoom = await bookingRepository.findRoom(roomId);
  if (!selectRoom) throw notFoundError();

  const capacity = await bookingRepository.countRoomReservation(roomId);
  if (selectRoom.capacity - capacity === 0) {
    throw cannotListHotelsError();
  }
}

async function showBookingByUser(userId: number) {
  await validationUserStatus(userId);

  const booking = await bookingRepository.findBookingByUserId(userId);
  if (!booking) {
    throw notFoundError();
  }

  return booking;
}

async function createNewReservation(roomId: number, userId: number) {
  await validationUserStatus(userId);
  await validateSelectRoom(roomId);

  const newBooking = await bookingRepository.createRoomReservation(roomId, userId);
  return newBooking;
}

async function updateCurrentlyReservation(roomId: number, userId: number, bookingId: number) {
  const myBooking = await bookingRepository.findBookingByBookingId(bookingId);
  if (!myBooking) throw cannotListHotelsError();

  await validateSelectRoom(roomId);

  await bookingRepository.deleteRoomReservation(bookingId);

  const newBooking = await bookingRepository.createRoomReservation(roomId, userId);
  return newBooking;
}

const bookingService = { showBookingByUser, createNewReservation, updateCurrentlyReservation };

export default bookingService;
