import { Document, model, Schema } from "mongoose";
import { Providers } from "../consts";

type TProvider = (typeof Providers)[keyof typeof Providers];

export interface IUser extends Document {
  name: string;
  email: string;
  provider: TProvider;
  displayPicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: [Providers.GITHUB, Providers.GOOGLE],
      required: true,
    },
    displayPicture: String,
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUser>("User", UserSchema);
