import { Rule, Validator } from "@cesium133/forgjs";
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
    const colonies = await prisma.colony.findMany({
      where: {
        beekeeperId,
      },
    });

    // Return colonies or empty array
    res.json(colonies);
  }
);

const createColonyBodyRule = new Validator({
  name: new Rule({ type: "string" }, "'name' missing"),
  beekeeper: new Rule({ type: "string" }, "'beekeeper' missing"),
  breed: new Rule({ type: "string" }, "'breed' missing"),
  description: new Rule({ type: "string", optional: true }),
  count: new Rule({ type: "int", min: 0 }, "'count' missing or invalid"),
  flightRadius: new Rule(
    { type: "int", min: 0 },
    "'flightRadius' missing or invalid"
  ),
  latitude: new Rule(
    { type: "string-float", min: 0 },
    "'latitude' missing or invalid"
  ),
  longitude: new Rule(
    { type: "string-float", min: 0 },
    "'longitude' missing or invalid"
  ),
});

router.post(
  "/",
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    // Check body
    const errors = createColonyBodyRule.getErrors(req.body);
    if (errors.length !== 0) {
      return void res.status(400).json({ error: errors.join(", ") });
    }

    // Save field
    await prisma.colony.create({
      data: req.body,
    });
    res.json({ status: "OK" });
  }
);

export default router;
