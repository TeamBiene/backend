import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  const beekeeper = await prisma.beekeeper.findUnique({
    where: {
      userId: "",
    },
    include: {
      colonies: true,
    },
  });
}
