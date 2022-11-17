import { getPaymentsController, postPaymentsController } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken).get("/", getPaymentsController).post("/process", postPaymentsController);

export { paymentsRouter };
