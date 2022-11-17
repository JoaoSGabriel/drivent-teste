import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(_req: Request, res: Response) {
  try {
    return res.status(httpStatus.OK).send({});
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(_req: Request, res: Response) {
  try {
    return res.status(httpStatus.OK).send({});
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
