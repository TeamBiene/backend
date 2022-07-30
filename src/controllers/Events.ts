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

  // Get event from a certain association from db
  const event = await prisma.event.findMany({
    where: {
      associationId,
    },
  });

  //return event
  res.json(event);
});

router.get("/:eventId", authorize(), async (req: Request, res: Response, next: NextFunction) => {
  // Get parameters
  const { eventId } = req.params;

  //Get event by id and with comments from db
  const event = await prisma.event.findMany({
    where: {
      id: eventId,
    }, include: { comments: true }
  });

  //return event
  res.json(event);
});

router.post(
  "/:eventId",
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    // Get parameters
    const { eventId } = req.params;

    // Validate parameters
    if (typeof eventId !== "string") {
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
    const newNewsEntry = await prisma.event.create({
      data: req.body
    });
    res.json({ status: "OK" });
  }
);

export default router;
