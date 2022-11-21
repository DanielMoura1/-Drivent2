import paymentsRepository from "@/repositories/payments-repository";
import { notFoundError, requestError } from "@/errors";

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
    
async function Get(id: number) {
  const res = await paymentsRepository.GetPayment(id);
  return res;
}
async function GetEnrollment(id: number) {
  const res = await paymentsRepository.GetPaymentCompare(id);
  return res;
}
async function GetUser(token: string) {
  const res = await paymentsRepository.GetUser(token);
  return res;
}
async function getTickets(id: number, token: string): Promise<tickets> {
  const res = await paymentsRepository.getTickets(id);

  if(res.length===0) {
    throw notFoundError();
  }
   
  const ok =await paymentsRepository.GetS(token);
  if(ok[0].id !==res[0].enrollmentId) {
    throw requestError(401, "abc");
  }
  return res[0];
}
async function createPayments(body: body, ticket: tickets) {
  const res =await paymentsRepository.createPayments(body, ticket);
  return res;
}
async function updatedPayment(id: number) {
  const res =await paymentsRepository.updated(id);
  return res;
}
const paymentsService = {
  Get, GetEnrollment, GetUser, getTickets, createPayments, updatedPayment
};
export default paymentsService;
