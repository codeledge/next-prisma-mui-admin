import { prismaClient } from "../../prisma/prismaClient";
import { DMMF } from "@prisma/client/runtime";
import ModelList from "./ModelList";
import { getModels } from "@/lib/getModels";

export const metadata = {
  title: "Prisma Admin",
};

export default async function Home() {
  const modelNames = (await getModels()).map(({ name }) => name);

  const modelStats = await Promise.all(
    modelNames.map((modelName) => {
      const model = prismaClient[modelName] as {
        count: Function;
      };
      return {
        count: model.count(),
        name: modelName,
      };
    })
  );
  return (
    <main>
      <ModelList modelStats={modelStats} />
    </main>
  );
}
