import { CreateOrUpdateEnrollmentWithAddress } from "@/services/enrollments-service";
import { getStates, isValidCEP, isValidCPF, isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import Joi from "joi";

export const paymentsSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required()
  })
});
