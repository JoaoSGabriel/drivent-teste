import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function showAllTicketsTypes() {
  const ticketsType = await ticketsRepository.getTicketsTypes();
  if (ticketsType.length !== 0) return ticketsType;
  return [];
}

async function showAllTickets(userId: number) {
  const ticket = await ticketsRepository.getTickets(userId);

  if (!ticket.enrollmentId || !ticket) throw notFoundError();

  return ticket;
}

async function createUserTicket(userId: number, ticketTypeId: number) {
  const enrollment = await ticketsRepository.findUserEnrollment(userId);
  if (!enrollment) throw notFoundError();

  const newTicket = await ticketsRepository.createNewTicket(ticketTypeId, enrollment.id);

  return newTicket;
}

const ticketService = { showAllTicketsTypes, showAllTickets, createUserTicket };

export default ticketService;
