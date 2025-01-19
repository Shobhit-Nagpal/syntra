import { Document, model, ObjectId, Schema } from "mongoose";
import { TxnStatus } from "../consts";

type TTxnStatus = (typeof TxnStatus)[keyof typeof TxnStatus];

export interface ITransaction extends Document {
  buyer: ObjectId;
  seller: ObjectId;
  asset: ObjectId;
  status: TTxnStatus;
  createdAt: Date;
}

const TransactionSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    asset: {
      type: Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    status: {
      type: String,
      enum: [TxnStatus.FAILURE, TxnStatus.SUCCESS, TxnStatus.PENDING],
      required: true,
      default: TxnStatus.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

export const TransactionModel = model<ITransaction>(
  "Transaction",
  TransactionSchema,
);
