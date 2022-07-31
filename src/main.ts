import express, { Request, Response } from "express";
import cors from "cors";

import ColonyController from "./controllers/Colony";
import MapController from "./controllers/Map";
import ChatController from "./controllers/Chat";
import NewsController from "./controllers/News";
import EventsController from "./controllers/Events";
import AssociationController from "./controllers/Association";
import UserController from "./controllers/User";

import { encodeSession } from "./jwt";

// Create express app
const app = express();

// Register middleware
app.use(express.json());
app.use(cors());

// Register controllers
app.use("/colony", ColonyController);
app.use("/map", MapController);
app.use("/chat", ChatController);
app.use("/news", NewsController);
app.use("/event", EventsController);
app.use("/association", AssociationController);
app.use("/user", UserController);

//get jwt session
app.get("/debuglogin", (req: Request, res: Response) => {
  // This route is unprotected, anybody can call it
  // TODO: Validate username/password
  let secret = process.env.SECRET;

  if (
    typeof secret !== "string"
  ) {
    res.status(400).json();
    return;
  }

  const session = encodeSession(secret, {
    id: "cl681nati000409mi1oyxbfzt",
    username: "User 1",
    dateCreated: Date.now()
  });

  res.status(201).json(session);
});

// Start listening
app.listen("3000", () => {
  console.log("Server started on port 3000");
});
