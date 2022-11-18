import { getPaymentsController, postPaymentsController } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { incomingPaymentSchema } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentsController)
  .post("/process", validateBody(incomingPaymentSchema), postPaymentsController);

export { paymentsRouter };
