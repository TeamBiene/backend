import express from "express";
import cors from "cors";

import ColonyController from "./controllers/Colony";
import MapController from "./controllers/Map";
import NewsController from "./controllers/News";

// Create express app
const app = express();

// Register middleware
app.use(express.json());
app.use(cors());

// Register controllers
app.use("/colony", ColonyController);
app.use("/map", MapController);
app.use("/news", NewsController);

// Start listening
app.listen("3000", () => {
  console.log("Server started on port 3000");
});
