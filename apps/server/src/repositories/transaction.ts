import mongoose from "mongoose";
import { ITransaction, TransactionModel as Txn } from "../models/transaction";
import { TxnStatus } from "../consts";

export interface ITransactionRepository {
  createTransaction({
    buyer,
    seller,
    asset,
    price,
  }: {
    buyer: string;
    seller: string;
    asset: string;
    price: number;
  }): Promise<ITransaction>;
}

export class TransactionRepository implements ITransactionRepository {
  async createTransaction({
    buyer,
    seller,
    asset,
    price,
  }: {
    buyer: string;
    seller: string;
    asset: string;
    price: number;
  }): Promise<ITransaction> {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const txn = new Txn({
        buyer,
        seller,
        asset,
        price,
        status: TxnStatus.PENDING,
      });
      await txn.save({ session });

      txn.status = TxnStatus.SUCCESS;
      await txn.save({ session });

      await session.commitTransaction();

      return txn;
    } catch (err) {
      await session.abortTransaction();

      const failureSession = await mongoose.startSession();

      try {
        const txn = await Txn.findOne({
          buyer,
          seller,
          asset,
          status: TxnStatus.PENDING,
        }).session(failureSession);

        if (txn) {
          txn.status = TxnStatus.FAILURE;
          await txn.save({ session });
          await failureSession.commitTransaction();
        }
      } catch (updatedErr) {
        await failureSession.abortTransaction();
        console.log(`Error updating txn status: `, updatedErr);
      } finally {
        failureSession.endSession();
      }

      throw err;
    } finally {
      session.endSession();
    }
  }
}
