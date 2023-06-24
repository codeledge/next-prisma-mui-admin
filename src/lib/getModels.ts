import { getDmmf } from "./getDmmf";

export const getModels = async () => {
  return (await getDmmf()).datamodel.models;
};
