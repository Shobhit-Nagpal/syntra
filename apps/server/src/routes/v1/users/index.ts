import { Request, Response, Router } from "express";

import { UserController } from "../../../controllers/user";
import { UserRepository } from "../../../repositories/user";
import { UserService } from "../../../services/user";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const usersRouter = Router();

// GET routes
usersRouter.get("/:id", async (req: Request, res: Response) => {
  await userController.getUserById(req, res);
});

usersRouter.get("/emails/:email", async (req: Request, res: Response) => {
  await userController.getUserByEmail(req, res);
});

// POST routes
usersRouter.post("/", async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

export { usersRouter };
