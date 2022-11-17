import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTickets, getTicketsTypes, postTickets } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .post("/", validateBody(createTicketSchema), postTickets)
  .get("/types", getTicketsTypes);

export { ticketsRouter };
