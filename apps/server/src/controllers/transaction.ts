import { Request, Response } from "express";
import { ITransactionService } from "../services/transaction";

interface ITransactionController {
  createTransaction(req: Request, res: Response): Promise<Response>;
}

export class TransactionController implements ITransactionController {
  #service: ITransactionService;

  constructor(service: ITransactionService) {
    this.#service = service;
  }

  async createTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { buyer, seller, asset, price } = req.body;

      if (!buyer || !seller || !asset || !price) {
        return res
          .status(400)
          .json({ message: "Buyer, seller, asset and price are required" });
      }

      const txn = await this.#service.createTransaction({
        buyer,
        seller,
        asset,
        price,
      });

      return res.status(201).json(txn);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
