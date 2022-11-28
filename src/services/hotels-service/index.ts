import { notFoundError, requestError, unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";

async function showAllHotels(userId: number) {
  const enrollment = await hotelsRepository.getEnrollmentbyUserId(userId);
  if (!enrollment) {
    throw requestError(403, "Forbidden");
  }

  const ticket = await hotelsRepository.findTicketByUserId(userId);

  if (
    !ticket ||
    ticket.status !== "PAID" ||
    ticket.TicketType.isRemote !== false ||
    ticket.TicketType.includesHotel !== true
  ) {
    throw requestError(403, "Forbidden");
  }

  const hotels = await hotelsRepository.getAllHotels();

  return hotels;
}

async function showAllHotelRooms(hotelId: number) {
  const rooms = await hotelsRepository.getAllRoomsFromHotel(hotelId);
  if (!rooms) throw notFoundError();

  return rooms;
}

const hotelService = {
  showAllHotels,
  showAllHotelRooms,
};

export default hotelService;
