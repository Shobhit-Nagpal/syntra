import { Document, model, ObjectId, Schema } from "mongoose";

export interface IRating extends Document {
  value: number;
  asset: ObjectId;
  reviewer: ObjectId;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

const RatingSchema = new Schema(
  {
    value: {
      type: Number,
      required: true,
      max: 10,
    },
    asset: {
      type: Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feedback: String,
  },
  {
    timestamps: true,
  },
);

export const RatingModel = model<IRating>("Rating", RatingSchema);
