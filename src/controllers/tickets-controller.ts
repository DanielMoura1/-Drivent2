import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function tickets(req: AuthenticatedRequest, res: Response) {
  try {
    const ok = await ticketsService.teste();
    return res.status(httpStatus.OK).send(ok);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { authorization } = req.headers;
  const token: string = authorization?.replace("Bearer ", "");
  try {
    const id = await ticketsService.get(token);

    return res.status(httpStatus.OK).send(id);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(404);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
export async function getPostTickets(req: AuthenticatedRequest, res: Response) {
  const { authorization } = req.headers;
  const token: string = authorization?.replace("Bearer ", "");
  const { ticketTypeId } = req.body;
  
  try {
    const id = await ticketsService.post(ticketTypeId, token);
       
    return res.status(201).send(id);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(404);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
  
