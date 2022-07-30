import express from "express";
import cors from "cors";

import ColonyController from "./controllers/Colony";
import MapController from "./controllers/Map";
import ChatController from "./controllers/Chat";
import NewsController from "./controllers/News";
import EventsController from "./controllers/Events";
import AssociationController from "./controllers/Association";
import UserController from "./controllers/User";

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

// Start listening
app.listen("3000", () => {
  console.log("Server started on port 3000");
});
