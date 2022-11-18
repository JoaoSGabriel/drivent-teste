import { Request, Response } from "express";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import { AuthenticatedRequest } from "@/middlewares";
import { requestError } from "@/errors";

export async function getPaymentsController(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  if (!ticketId) throw requestError(400, "make bad request");

  const { userId } = req;

  try {
    const payment = await paymentsService.assignTicketAsPaid(userId, Number(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postPaymentsController(req: Request, res: Response) {
  try {
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
