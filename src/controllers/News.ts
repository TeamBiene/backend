import { Router, Request, Response, NextFunction } from "express";
import { InvalidArgumentError } from "../errors";
import prisma from "../prisma";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  // Get parameters
  const { association: associationId } = req.query;

  // Check parameters
  if (typeof associationId !== "string") {
    return void res.status(400).json({ error: InvalidArgumentError.message });
  }

  const news = await prisma.news.findMany({
    where: {
      associationId,
    },
  });

  res.json(news);
});

export default router;
