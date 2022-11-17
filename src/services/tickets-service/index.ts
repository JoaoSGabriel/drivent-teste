import ticketsRepository from "@/repositories/tickets-repository";

async function showAllTicketsTypes() {
  const ticketsType = await ticketsRepository.getTicketsTypes();
  if (ticketsType.length !== 0) return ticketsType;
  return [];
}

async function showAllTickets(userId: number) {
  return await ticketsRepository.getTickets(userId);
}

const ticketService = { showAllTicketsTypes, showAllTickets };

export default ticketService;
