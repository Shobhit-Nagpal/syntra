import { ITransaction } from "../models/transaction";
import { ITransactionRepository } from "../repositories/transaction";

export interface ITransactionService {
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

export class TransactionService implements ITransactionService {
  #repository: ITransactionRepository;

  constructor(repository: ITransactionRepository) {
    this.#repository = repository;
  }

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
    try {
      const txn = await this.#repository.createTransaction({
        buyer,
        seller,
        asset,
        price,
      });

      return txn;
    } catch (err) {
      console.error("Error creating transaction: ", err);
      throw err;
    }
  }
}
