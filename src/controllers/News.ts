import { Router, Request, Response, NextFunction } from "express";
import { InvalidArgumentError } from "../errors";
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

  // Get news from a certain association from db
  const news = await prisma.news.findMany({
    where: {
      associationId,
    },
  });

  //return news
  res.json(news);
});

router.get("/:newsId", authorize(), async (req: Request, res: Response, next: NextFunction) => {
  // Get parameters
  const { newsId } = req.params;

  //Get news by id and with comments from db
  const news = await prisma.news.findMany({
    where: {
      id: newsId,
    }, include: { comments: true }
  });

  //return news
  res.json(news);
});

router.post(
  "/:newsId",
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    // Get parameters
    const { newsId } = req.params;

    // Validate parameters
    if (typeof newsId !== "string") {
      return void res.status(400).json({ error: InvalidArgumentError.message });
    }
    // Save data
    const newComment = await prisma.publicComment.create({
      data: req.body
    });
    res.json({ status: "OK" });
  }
);

router.post(
  "/",
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    // Save data
    const newNewsEntry = await prisma.news.create({
      data: req.body
    });
    res.json({ status: "OK" });
  }
);

export default router;
