import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await findTicket(userId, ticketId);

  const payment = await paymentsRepository.findPaymentByTicketId(ticketId);

  return payment;
}

async function createPaymentProcess(body: updatePayment, userId: number) {
  await findTicket(userId, body.ticketId);

  await paymentsRepository.updateTicketStatus(body.ticketId);

  //TODO - implement a create repository

  return;
}

async function findTicket(userId: number, ticketId: number) {
  const ticketData = await paymentsRepository.findTicketById(ticketId);
  if (!ticketData) {
    throw notFoundError();
  }
  if (ticketData.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

const paymentsService = { getPaymentByTicketId, createPaymentProcess };

export type updatePayment = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

export default paymentsService;
