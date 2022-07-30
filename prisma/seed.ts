import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  await prisma.colonyComment.deleteMany();
  await prisma.colony.deleteMany();
  await prisma.beekeeper.deleteMany();
  await prisma.publicComment.deleteMany();
  await prisma.news.deleteMany();
  await prisma.associationMember.deleteMany();
  await prisma.user.deleteMany();
  await prisma.association.deleteMany();
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

  // Create association
  const { id: associationId } = await prisma.association.create({
    data: {
      id: "cl686rjxd000009mmabyld8us",
      location: "Saaldorf",
      name: "Saaldorf-Biene",
      description: "Die angaschierte Bienen Community in Saaldorf.",
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

  // Create association member
  await prisma.associationMember.create({
    data: {
      associationId,
      userId,
      isAdmin: true,
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

  // Create news
  const { id: newsId } = await prisma.news.create({
    data: {
      id: "cl681njqg000509mi1oyxbfzt",
      title: "Krankheit",
      content: "Die Bienen sind krank geworden! :(",
      hasPriority: true,
      associationId,
      authorId: userId,
    },
  });

  await prisma.news.create({
    data: {
      id: "cl68dvp43000009ld1zmu7tah",
      title: "Krankheit",
      content: "Eine zweite News",
      associationId,
      authorId: userId,
    },
  });

  // Create news comment
  await prisma.publicComment.create({
    data: {
      newsId,
      authorId: userId,
      content: "Oh nein, gute Besserung!",
    },
  });
}

main();
