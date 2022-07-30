import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  await prisma.colonyComment.deleteMany();
  await prisma.colony.deleteMany();
  await prisma.beekeeper.deleteMany();
  await prisma.user.deleteMany();
  await prisma.breed.deleteMany();

  // Create breeds
  const { id: breedId } = await prisma.breed.create({
    data: {
      id: "cl681mbw7000009mi1pcf0pr4",
      name: "Carnica",
    },
  });

  await prisma.breed.create({
    data: {
      id: "cl681mlta000109mi4ck29cwr",
      name: "Kaukasische Biene",
    },
  });

  await prisma.breed.create({
    data: {
      id: "cl681mvrg000209mid9c70njo",
      name: "Dunkle Biene",
    },
  });

  await prisma.breed.create({
    data: {
      id: "cl681mzb3000309mi3kedhhus",
      name: "Italienische Biene",
    },
  });

  // Create user
  const { id: userId } = await prisma.user.create({
    data: {
      id: "cl681nati000409mi1oyxbfzt",
      name: "John Doe",
      passwordHash: "123456",
      email: "john@gmail.com",
    },
  });

  // Create beekeeper
  await prisma.beekeeper.create({
    data: {
      userId,
    },
  });

  // Create colony
  await prisma.colony.create({
    data: {
      breedId,
      count: 100,
      beekeeperId: userId,
      flightRadius: 2500,
      name: "Garten Volk",
      latitude: 48.215623,
      longitude: 16.3701806,
    },
  });
}

main();
