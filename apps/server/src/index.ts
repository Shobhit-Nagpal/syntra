import express from "express";
import Config from "./config";
import { connectToDb } from "./lib/db";
import cors from "cors";
import { v1Router } from "./routes/v1";

async function startServer() {
  const app = express();

  // CORS middleware
  app.options("*", cors());

  app.use(
    cors({
      origin: Config.allowedHosts,
      allowedHeaders: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    }),
  );

  // To parse JSON payloads
  app.use(express.json());

  await connectToDb();

  app.use("/api", v1Router)

  app.listen(Config.port, () => {
    console.log(`Server is listening on port: ${Config.port}`);
  });
}

startServer();
