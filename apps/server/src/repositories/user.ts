import { Providers } from "../consts";
import { IUser, UserModel as User } from "../models/user";

type TProvider = (typeof Providers)[keyof typeof Providers];

export interface IUserRepository {
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
  getUserById(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
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
  }) {
    const user = new User({
      email,
      name,
      provider,
      displayPicture,
    });

    await user.save();

    return user;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);

    if (!user) return null;

    return user;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({
      email,
    });

    if (!user) return null;

    return user;
  }
}
