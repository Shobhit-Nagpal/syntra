import { Request, Response } from "express";
import { IUserService } from "../services/user";

interface IUserController {
  createUser(req: Request, res: Response): Promise<Response>;
  getUserById(req: Request, res: Response): Promise<Response>;
  getUserByEmail(req: Request, res: Response): Promise<Response>;
}

export class UserController implements IUserController {
  #service: IUserService;

  constructor(service: IUserService) {
    this.#service = service;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, provider, displayPicture } = req.body;

      if (!email || !name || !provider) {
        return res.status(400).json({
          message: "Email, name and provider are required",
        });
      }

      const user = await this.#service.createUser({
        email,
        name,
        provider,
        displayPicture,
      });

      return res.json(201).json(user);
    } catch (err) {
      console.error("Error in creating user controller: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Missing id field " });
      }

      const user = await this.#service.getUserById(id);

      return res.status(200).json(user);
    } catch (err) {
      console.error("Error in get user by id controller: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Missing email field " });
      }

      const user = await this.#service.getUserByEmail(email);

      return res.status(200).json(user);
    } catch (err) {
      console.error("Error in get user by id controller: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
