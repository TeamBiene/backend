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
      stopLatitude: stopLatitudeRaw,
      startLongitude: startLongitudeRaw,
      stopLongitude: stopLongitudeRaw,
    } = req.query;

    // Validate parameters
    if (
      typeof startLatitudeRaw !== "string" ||
      typeof stopLatitudeRaw !== "string" ||
      typeof startLongitudeRaw !== "string" ||
      typeof stopLongitudeRaw !== "string"
    ) {
      return void res.status(400).json({ error: InvalidArgumentError.message });
    }

    let startLatitude: number | null;
    let stopLatitude: number | null;
    let startLongitude: number | null;
    let stopLongitude: number | null;

    // Parse parameters
    try {
      startLatitude = parseFloat(startLatitudeRaw);
      stopLatitude = parseFloat(stopLatitudeRaw);
      startLongitude = parseFloat(startLongitudeRaw);
      stopLongitude = parseFloat(stopLongitudeRaw);
    } catch (e) {
      return void res.status(400).json({ error: InvalidArgumentError.message });
    }

    // Get data
    const colonies = await prisma.colony.findMany({
      where: {
        latitude: {
          lte: stopLatitude,
          gte: startLatitude,
        },
        longitude: {
          lte: stopLongitude,
          gte: startLongitude,
        },
      },
    });

    // Return colonies or empty array
    res.json(colonies);
  }
);

export default router;
