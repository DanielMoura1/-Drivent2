import { prisma } from "@/config";

async function GetTicketType() {
  return prisma.ticketType.findMany();
}
async function GetSession(token: string) {
  const id= await prisma.session.findMany(
    {
      where: {
        token: token
      },
      include: {
        User: true
      }
    }
  );
  
  return id[0].userId;
}
async function GetEnrollments(ID: number) {
  const id= prisma.enrollment.findMany({
    where: {
      userId: ID-1

    },
    include: {
      Ticket: {
        include: {
          TicketType: true
        }
      }
    }
  }
    
  );
  
  return id;
}
async function GetUserPost(ID: number, token: string) {
  return await prisma.session.findMany({
    where: {
      token: token
    },
    include: {
      User: true
    }
  });
}
async function GetEnrollmentsPost(ID: number) {
  return await prisma.enrollment.findMany({
    where: {
      userId: ID-1
    },
  });
}
async function GetTicketsPost(ID: number) {
  return await prisma.ticketType.findMany({
    where: {
      id: ID
    },
  });
}
async function create(enrollment: any, ticketsTypes: any) {
  const id= await prisma.ticket.create({
    data: {
      ticketTypeId: ticketsTypes.id,
      enrollmentId: enrollment.id,
      status: "RESERVED",
      createdAt: ticketsTypes.createdAt,
      updatedAt: ticketsTypes.updatedAt,
    }
  });
}
async function ticktsTicktsType(ID: number) {
  return await prisma.ticket.findMany({
    where: {
      ticketTypeId: ID
    }, include: {
      TicketType: true
    }
    
  });
}

const tickesRepository = {
  GetTicketType, GetSession, GetEnrollments,
  GetEnrollmentsPost, GetUserPost, GetTicketsPost,
  create, ticktsTicktsType
};
  
export default tickesRepository;
