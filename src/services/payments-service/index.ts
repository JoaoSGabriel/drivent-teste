import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";

async function assignTicketAsPaid(userId: number, ticketId: number) {
  const ticketData = await paymentsRepository.findTicketById(ticketId);
  if (!ticketData) {
    throw notFoundError();
  }
  if (ticketData.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.findPaymentByTicketId(ticketId);

  return payment;
}

const paymentsService = { assignTicketAsPaid };

export default paymentsService;
