import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPostTickets, getTickets, payments, PostPayments } from "@/controllers";
import { paymentsSchema  } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", payments)
  .post("/process", validateBody(paymentsSchema ), PostPayments);
export { paymentsRouter };
