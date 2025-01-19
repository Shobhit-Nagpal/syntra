import express from "express";
import Config from "./config";
import { connectToDb } from "./lib/db";

async function startServer() {
  const app = express();

  await connectToDb();

  app.listen(Config.port, () => {
    console.log(`Server is listening on port: ${Config.port}`);
  });
}

startServer();
