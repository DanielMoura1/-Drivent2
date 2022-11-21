import { AuthenticatedRequest } from "@/middlewares";
import paymentsService  from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function payments(req: AuthenticatedRequest, res: Response) {
  type ticket ={
    ticketId: string
   }
  const { ticketId }= req.query as ticket;
  const { authorization } = req.headers;
  const token: string = authorization?.replace("Bearer ", "");
  try {
    if(!ticketId) {
      return res.sendStatus(400);
    }
  
    const Payment =await paymentsService.Get(parseInt(ticketId));
     
    if(!Payment[0]) {
      return res.sendStatus(404);
    }
    const enrollment =await paymentsService.GetEnrollment(parseInt(ticketId));
    const user =await paymentsService.GetUser(token);
    if(enrollment[0].Enrollment.userId+1!==user[0].userId) {
      return res.sendStatus(401);
    }
    return res.status(httpStatus.OK).send(Payment[0].Payment[0]);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
export async function PostPayments(req: AuthenticatedRequest, res: Response) {
    type body ={
      ticketId: number,
      cardData: {
        issuer: string,
        number: number,
        name: string,
        expirationDate: Date,
        cvv: number
      }
     }
     type tickets ={
      ticketTypeId: number,
      enrollmentId: number,
      status: string,
      createdAt: string |Date,
      updatedAt: string |Date
  }
      
     const body: body = req.body;
     const { authorization } = req.headers;
     const token: string = authorization?.replace("Bearer ", "");
     try {
       const tickets: tickets = await paymentsService.getTickets(body.ticketId, token);
       const payment= await paymentsService.createPayments(body, tickets);
       await paymentsService.updatedPayment(body.ticketId);
       return res.status(httpStatus.OK).send(payment);
     } catch (error) {
       if (error.name === "NotFoundError") {
         return res.sendStatus(404);
       }
       if (error.name === "RequestError") {
         return res.sendStatus(401);
       }
       return res.sendStatus(httpStatus.NO_CONTENT);
     }
}
    
