import { Request, Response } from "express";
import ticketService from "@/services/tickets-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function getTicketsTypes(_req: Request, res: Response) {
  try {
    const tickets = await ticketService.showAllTicketsTypes();
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const tickets = await ticketService.showAllTickets(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTickets(_req: Request, res: Response) {
  try {
    return res.status(httpStatus.OK).send({});
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
