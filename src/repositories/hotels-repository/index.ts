import { prisma } from "@/config";

async function getEnrollmentbyUserId(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}

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
  getEnrollmentbyUserId,
  findTicketByUserId,
  getAllHotels,
  getAllRoomsFromHotel,
};

export default hotelsRepository;
