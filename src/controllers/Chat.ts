import { Router, Request, Response, NextFunction } from "express";

import { InvalidArgumentError } from "../errors";
import { getIdFromRequest } from "../jwt";
import authorize from "../middleware/auth";
import prisma from "../prisma";

const router = Router();

router.get(
    "/",
    authorize(),
    async (req: Request, res: Response, next: NextFunction) => {

        //Query params
        const { from: fromUserId, since: sinceTimestamp } = req.query;

        if (typeof fromUserId !== "string" ||
            typeof sinceTimestamp !== "string") {
            return void res.status(400).json({ error: InvalidArgumentError.message });
        }

        const userId = getIdFromRequest(req);

        if (typeof userId !== "string") {
            return void res.status(400).json({ error: InvalidArgumentError.message });
        }
        // Get data
        const chatMsg = await prisma.chatMessage.findMany({
            where: {
                authorId: userId,
                receiverId: fromUserId,
                createdAt: {
                    lte: new Date(parseInt(sinceTimestamp)),
                },
            }
        });

        // Return chatMsgs or empty array
        res.json(chatMsg ?? []);
    }
);


router.get(
    "/:userID",
    authorize(),
    async (req: Request, res: Response, next: NextFunction) => {
        // Get parameters
        const { userId } = req.params;

        // Validate parameters
        if (typeof userId !== "string") {
            return void res.status(400).json({ error: InvalidArgumentError.message });
        }

        //Query params
        const { from: fromUserId, since: sinceTimestamp } = req.query;

        if (typeof fromUserId !== "string" ||
            typeof sinceTimestamp !== "string") {
            return void res.status(400).json({ error: InvalidArgumentError.message });
        }

        // Get data
        const chatMsg = await prisma.chatMessage.findMany({
            where: {
                authorId: userId,
                receiverId: fromUserId,
                createdAt: {
                    lte: new Date(parseInt(sinceTimestamp)),
                },
            }
        });

        // Return chatMsgs or empty array
        res.json(chatMsg ?? []);
    }
);

router.post(
    "/:userId",
    authorize(),
    async (req: Request, res: Response, next: NextFunction) => {
        // Get parameters
        const { userId } = req.params;

        // Validate parameters
        if (typeof userId !== "string") {
            return void res.status(400).json({ error: InvalidArgumentError.message });
        }

        //Query params
        const { from: fromUserId } = req.query;

        if (typeof fromUserId !== "string") {
            return void res.status(400).json({ error: InvalidArgumentError.message });
        }
        // Save data
        const chatMsg = await prisma.chatMessage.create({
            data: req.body
        });
        res.json({ status: "OK" });
    }
);

export default router;
