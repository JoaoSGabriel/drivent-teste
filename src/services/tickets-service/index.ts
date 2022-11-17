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

const ticketService = { showAllTicketsTypes, showAllTickets };

export default ticketService;
