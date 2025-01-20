import { Router } from "express";
import { usersRouter } from "./users";
import { assetsRouter } from "./assets";
import { txnRouter } from "./transactions";
import { ratingsRouter } from "./ratings";

const v1Router = Router();

// Add auth middleware

v1Router.use("/users", usersRouter);
v1Router.use("/assets", assetsRouter);
v1Router.use("/transactions", txnRouter);
v1Router.use("/ratings", ratingsRouter);

export { v1Router };
