import { Router, Request, Response, NextFunction } from "express";

import { InvalidArgumentError } from "../errors";
import authorize from "../middleware/auth";
import prisma from "../prisma";

const router = Router();

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
        cons

        // Get data
        const chatMsg = await prisma.chatMsg.findMany({
            where: {
                id: userId,
            }
        });

        // Return chatMsgs or empty array
        res.json(chatMsg ?? []);
    }
);

router.get(
    "/:newsId",
    authorize(),
    async (req: Request, res: Response, next: NextFunction) => {
        // Get parameters
        const { newsId } = req.params;

        // Validate parameters
        if (typeof newsId !== "string") {
            return void res.status(400).json({ error: InvalidArgumentError.message });
        }

        // Get data
        const news = await prisma.news.findMany({
            where: {
                id: newsId,
            }, include: { comments: true }
        });

        // Return colonies or empty array
        res.json(news ?? []);
    }
);

router.post(
    "/",
    authorize(),
    async (req: Request, res: Response, next: NextFunction) => {
        // Get data
        const news = await prisma.news.findMany({});

        // Return colonies or empty array
        res.json(news ?? []);
    }
);

export default router;
