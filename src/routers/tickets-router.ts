import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTickets, getTicketsTypes, postTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/", getTickets).post("/", postTickets).get("/types", getTicketsTypes);

export { ticketsRouter };
