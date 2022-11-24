import { prisma } from "@/config";

async function findTicketByUserId(userId: number) {
  return await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function getAllHotels() {
  return await prisma.hotel.findMany();
}

async function getAllRoomsFromHotel(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  findTicketByUserId,
  getAllHotels,
  getAllRoomsFromHotel,
};

export default hotelsRepository;
