import { prisma } from "@/config";
import { UserTicket } from "@/protocols";
import { TicketType } from "@prisma/client";

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

async function findUserEnrollment(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}

async function createNewTicket(ticketTypeId: number, enrollmentId: number): Promise<UserTicket> {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: "RESERVED",
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = { getTicketsTypes, getTickets, findUserEnrollment, createNewTicket };

export default ticketRepository;
