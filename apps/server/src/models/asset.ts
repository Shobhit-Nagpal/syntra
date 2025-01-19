import { model, ObjectId, Schema } from "mongoose";

export interface IAsset extends Document {
  name: string;
  description?: string;
  price: number;
  image?: string;
  banner?: string;
  owner: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    image: String,
    banner: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AssetModel = model<IAsset>("Asset", AssetSchema);
