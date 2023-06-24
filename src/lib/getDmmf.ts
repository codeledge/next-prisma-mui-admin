import { DMMF } from "@prisma/client/runtime";
import { prismaClient } from "../../prisma/prismaClient";

export const getDmmf = async (): Promise<DMMF.Document> => {
  //@ts-ignore
  return await prismaClient._getDmmf();
};
