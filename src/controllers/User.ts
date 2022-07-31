import { User } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";
import { InvalidArgumentError, NotFoundError } from "../errors";
import prisma from "../prisma";
import authorize from "../middleware/auth";

const router = Router();

router.get("/", authorize(), async (req: Request, res: Response, next: NextFunction) => {
  // Get parameters
  const { association: associationId } = req.query;

  // Check parameters
  if (typeof associationId !== "string") {
    return void res.status(400).json({ error: InvalidArgumentError.message });
  }

  const associationMembers = await prisma.associationMember.findMany({
    where: {
      associationId,
    },
    include: {
      user: true,
    },
  });

  const users = associationMembers.map((am) => sanitizeUser(am.user));

  res.json(users);
});

router.get("/:id", authorize(), async (req: Request, res: Response, next: NextFunction) => {
  // Get parameters
  const { id } = req.params;

  // Get user
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  // Check if user exists
  if (!user) {
    return void res.status(404).json({ error: NotFoundError.message });
  }

  // Sanitize and return user
  res.json(sanitizeUser(user));
});

function sanitizeUser(user: User) {
  const sanitizedUser: Record<string, unknown> = { ...user };
  delete sanitizedUser.passwordHash;
  return sanitizedUser;
}

export default router;
