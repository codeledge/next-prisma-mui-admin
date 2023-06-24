import { prismaClient } from "../../../../prisma/prismaClient";
import ModelTable from "./ModelTable";
import { getModels } from "@/lib/getModels";

export const metadata = {
  title: "Prisma Admin - Table",
};

export default async function TablePage({
  params: { modelName },
}: {
  params: { modelName: keyof typeof prismaClient };
}) {
  const models = await getModels();
  const dmmfModel = models.find(({ name }) => name === modelName);
  if (!dmmfModel) throw new Error(`Model ${String(modelName)} not found`);

  const fields = dmmfModel.fields;

  const foreignKeys = fields.filter(({ kind }) => kind === "object");

  // console.log(pretty(fields));

  const model = prismaClient[modelName] as {
    findMany: Function;
  };

  const rows = await model.findMany();

  for (const row of rows) {
    for (const foreignKey of foreignKeys) {
      const toField = foreignKey.relationToFields?.[0];
      const fromField = foreignKey.relationFromFields?.[0];
      if (toField && fromField) {
        row[foreignKey.name] = await prismaClient[
          foreignKey.type.toLowerCase()
        ].count({
          where: {
            [toField]: row[fromField],
          },
        });
      } else {
        const foreignModel = models.find(
          ({ name }) => name === foreignKey.type
        );
        if (foreignModel) {
          const field = foreignModel.fields.find(
            ({ relationName }) => relationName === foreignKey.relationName
          )!;
          const toField = field.relationToFields?.[0];
          const fromField = field.relationFromFields?.[0];
          row[foreignKey.name] = await prismaClient[
            foreignKey.type.toLowerCase()
          ].count({
            where: {
              [fromField!]: row[toField],
            },
          });
        }
      }
    }
  }

  return (
    <main>
      <ModelTable modelName={String(modelName)} rows={rows} fields={fields} />
    </main>
  );
}
