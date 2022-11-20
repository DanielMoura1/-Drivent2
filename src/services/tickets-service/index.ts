
import tickesRepository from "@/repositories/tickes-repository";
import { notFoundError } from "@/errors";

async function teste() {
  const res = await tickesRepository.GetTicketType(); 
  return res;
}
async function get(token: string) {
  const id = await tickesRepository.GetSession(token);
  const enrollment = await tickesRepository.GetEnrollments(id);
  if(enrollment.length ===0) {
    throw notFoundError();
  }
  if(enrollment[0].Ticket.length==0) {
    throw notFoundError();
  }
  return enrollment[0].Ticket[0];
}
async function post(id: number, token: string) {
  const ID = await tickesRepository.GetUserPost(id, token);
  const enrollment = await tickesRepository.GetEnrollmentsPost(ID[0].User.id);
  console.log("enrollment");
  console.log(enrollment);
  if(enrollment.length ===0) {
    console.log("dan");
    throw notFoundError();
  }
  const TicketType = await tickesRepository.GetTicketsPost(id);
  await tickesRepository.create(enrollment[0], TicketType[0]);
  const ticktsTicktsType =await tickesRepository.ticktsTicktsType(id);
  console.log("tickes");
  console.log(ticktsTicktsType);
  return ticktsTicktsType[0];
}
const ticketsService = {
  teste, get, post
};
export default ticketsService;
