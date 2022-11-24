import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { Hotel, Room } from "@prisma/client";

export async function createHotel(): Promise<Hotel> {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createHotelRoom(hotelId: number): Promise<Room> {
  return await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number({ min: 1, max: 5 }),
      hotelId,
    },
  });
}
