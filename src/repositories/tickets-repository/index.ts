import { prisma } from "@/config";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketsTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTickets(userId: number): Promise<Ticket> {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId: userId,
    },
  });
}

const ticketRepository = { getTicketsTypes, getTickets };

export default ticketRepository;
