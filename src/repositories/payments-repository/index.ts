import { prisma } from "@/config";

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
async function GetPayment(id: number) {
  return await prisma.ticket.findMany({
    where: {
      id: id
    }, include: {
      Payment: true
    },
        
  });
}
async function GetPaymentCompare(id: number) {
  return await prisma.ticket.findMany({
    where: {
      id: id
    }, include: {
      Enrollment: true
    },
        
  });
}
async function GetUser(token: string) {
  return await prisma.session.findMany({
    where: {
      token: token
    },
  });
}
async function getTickets(id: number) {
  return await prisma.ticket.findMany({
    where: {
      id: id
    },
  });
}
async function GetS(token: string) {
  const n=await prisma.session.findMany({
    where: {
      token: token
    }
  });
  const res=await prisma.enrollment.findMany({
    where: {
      userId: n[0].userId-1
    }
  });
  return res;
}
async function createPayments(body: body, ticket: tickets) {
  const valor = await prisma.ticketType.findMany({
    where: {
      id: ticket.ticketTypeId
    }
  });
  const n =(body.cardData.number).toString();
  const s =n.length;
  const num=n[s-4]+n[s-3]+n[s-2]+n[s-1];
  const id= await prisma.payment.create({
    data: {
      ticketId: body.ticketId,
      value: valor[0].price,
      cardIssuer: body.cardData.issuer,
      cardLastDigits: num,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt
    }
  });
  const res= await prisma.payment.findMany({
    where: {
      ticketId: body.ticketId
    }
  });
  return res[0];
}
async function updated(id: number) {
  const updateUser = await prisma.ticket.update({
    where: {
      id: id
    },
    data: {
      status: "PAID",
    },
  });
}
const paymentsRouter = {
  GetPayment, GetPaymentCompare, GetUser, getTickets, GetS, createPayments, updated
};
  
export default paymentsRouter;
