import { Request, Response } from "express";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";

export async function getPaymentsController(req: Request, res: Response) {
  try {
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postPaymentsController(req: Request, res: Response) {
  try {
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
