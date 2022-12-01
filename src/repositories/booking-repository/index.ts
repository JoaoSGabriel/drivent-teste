import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function findBookingByBookingId(bookingId: number) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
  });
}

async function findRoom(roomId: number) {
  return await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

async function countRoomReservation(roomId: number) {
  return await prisma.booking.count({
    where: { roomId },
  });
}

async function createRoomReservation(roomId: number, userId: number) {
  return await prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function deleteRoomReservation(bookingId: number) {
  return await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
}

const bookingRepository = {
  findBookingByUserId,
  findBookingByBookingId,
  findRoom,
  countRoomReservation,
  createRoomReservation,
  deleteRoomReservation,
};

export default bookingRepository;
