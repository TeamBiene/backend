import { Router, Request, Response, NextFunction } from "express";

import { InvalidArgumentError } from "../errors";
import authorize from "../middleware/auth";
import prisma from "../prisma";

const router = Router();

router.get(
  "/",
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    // Get parameters
    const {
      startLatitude: startLatitudeRaw,
      startLongitude: startLongitudeRaw,
      stopLatitude: stopLatitudeRaw,
      stopLongitude: stopLongitudeRaw,
    } = req.query;

    // Validate parameters
    if (
      typeof startLatitudeRaw !== "string" ||
      typeof startLongitudeRaw !== "string" ||
      typeof stopLatitudeRaw !== "string" ||
      typeof stopLongitudeRaw !== "string"
    ) {
      return void res.status(400).json({ error: InvalidArgumentError.message });
    }

    // Parse parameters
    try {
      const startLatitude = parseFloat(startLatitudeRaw);
      const startLongitude = parseFloat(startLongitudeRaw);
      const stopLatitude = parseFloat(stopLatitudeRaw);
      const stopLongitude = parseFloat(stopLongitudeRaw);
    } catch (e) {
      return void res.status(400).json({ error: InvalidArgumentError.message });
    }

    // Get data
    const colonies = await prisma.colony.findMany({});

    // Return colonies or empty array
    res.json(colonies ?? []);
  }
);

export default router;
