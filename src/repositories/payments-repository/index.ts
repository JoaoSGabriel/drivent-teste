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

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentsRepository = { findTicketById, findPaymentByTicketId };

export default paymentsRepository;
