import { prisma } from "@/config";

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

const paymentsRepository = { findTicketById };

export default paymentsRepository;
