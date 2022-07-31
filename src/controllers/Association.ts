import { Router, Request, Response, NextFunction } from "express";

import { InvalidArgumentError } from "../errors";
import authorize from "../middleware/auth";
import prisma from "../prisma";

const router = Router();

router.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        // Get data
        const associations = await prisma.association.findMany({
        });

        // Return associations or empty array
        res.json(associations ?? []);
    }
);

export default router;
