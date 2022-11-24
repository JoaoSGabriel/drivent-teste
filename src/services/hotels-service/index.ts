import { notFoundError, requestError, unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import { BAD_REQUEST } from "http-status";

async function showAllHotels(userId: number) {
  const ticket = await hotelsRepository.findTicketByUserId(userId);

  if (ticket.status !== "PAID" || ticket.TicketType.isRemote !== false || ticket.TicketType.includesHotel !== true) {
    throw unauthorizedError();
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
