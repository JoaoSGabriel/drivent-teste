import { prisma } from "@/config";
import { UserTicket } from "@/protocols";
import { Ticket, TicketType } from "@prisma/client";
import dayjs from "dayjs";

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

async function createNewTicket(ticketTypeId: number, enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.create({
    data: {
      status: "RESERVED",
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = { getTicketsTypes, getTickets, findUserEnrollment, createNewTicket };

export default ticketRepository;
