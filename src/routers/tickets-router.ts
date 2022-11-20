import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPostTickets, getTickets, tickets } from "@/controllers";
import { ticketsSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", tickets)
  .get("/", getTickets)
  .post("/", validateBody(ticketsSchema), getPostTickets);

export { ticketsRouter };
