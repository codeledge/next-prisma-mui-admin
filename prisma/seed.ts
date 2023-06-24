import { prismaClient } from "./prismaClient";
import {
  array,
  randomEmail,
  randomFullName,
  randomInt,
  randomParagraph,
  randomPassword,
} from "deverything";

async function main() {
  const createUsers = array(randomInt(10, 20), () =>
    prismaClient.user.create({
      data: {
        email: randomEmail(),
        password: randomPassword(),
        name: randomFullName(),
        posts: {
          create: array(randomInt(0, 20), () => ({
            title: randomParagraph(),
            content: randomParagraph(),
          })),
        },
      },
    })
  );
  for (const createUser of createUsers) {
    await createUser;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
