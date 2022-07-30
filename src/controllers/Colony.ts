import { Router, Request, Response, NextFunction } from "express";

import { InvalidArgumentError } from "../errors";
import authorize from "../middleware/auth";
import prisma from "../prisma";

const router = Router();

router.get(
  "/:beekeeperId",
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    // Get parameters
    const { beekeeperId } = req.params;

    // Validate parameters
    if (typeof beekeeperId !== "string") {
      return void res.status(400).json({ error: InvalidArgumentError.message });
    }

    // Get data
    const colonies = await prisma.colony.findFirst({
      where: {
        beekeeperId,
      },
    });

    // Return colonies or empty array
    res.json(colonies ?? []);
  }
);

export default router;
