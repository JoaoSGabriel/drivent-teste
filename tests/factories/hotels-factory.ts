import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

export async function createHotel(): Promise<Hotel> {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}
