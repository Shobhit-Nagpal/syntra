import { Providers } from "../consts";
import { IUser } from "../models/user";
import { IUserRepository } from "../repositories/user";

type TProvider = (typeof Providers)[keyof typeof Providers];

interface IUserService {
  createUser({
    email,
    name,
    provider,
    displayPicture,
  }: {
    email: string;
    name: string;
    provider: TProvider;
    displayPicture: string | undefined;
  }): Promise<IUser>;
  getUserById(id: string): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser>;
}

export class UserService implements IUserService {
  #repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.#repository = repository;
  }

  async createUser({
    email,
    name,
    provider,
    displayPicture,
  }: {
    email: string;
    name: string;
    provider: TProvider;
    displayPicture: string | undefined;
  }): Promise<IUser> {
    try {
      const userExists = await this.#repository.getUserByEmail(email);

      if (userExists) {
        throw new Error("User already exists");
      }

      const user = await this.#repository.createUser({
        email,
        name,
        provider,
        displayPicture,
      });

      return user;
    } catch (err) {
      console.error("Error creating user: ", err);
      throw err;
    }
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const user = await this.#repository.getUserById(id);

      if (!user) {
        throw new Error("User not found with id");
      }

      return user;
    } catch (err) {
      console.error("Error getting user by id: ", err);
      throw err;
    }
  }

  async getUserByEmail(email: string): Promise<IUser> {
    try {
      const user = await this.#repository.getUserByEmail(email);

      if (!user) {
        throw new Error("User not found with email");
      }

      return user;
    } catch (err) {
      console.error("Error getting user by email: ", err);
      throw err;
    }
  }
}
