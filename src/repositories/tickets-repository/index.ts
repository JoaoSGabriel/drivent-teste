import { prisma } from "@/config";
import { UserTicket } from "@/protocols";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketsTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTickets(userId: number): Promise<UserTicket> {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = { getTicketsTypes, getTickets };

export default ticketRepository;
