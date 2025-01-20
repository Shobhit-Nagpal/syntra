import { Request, Response, Router } from "express";
import { TransactionRepository } from "../../../repositories/transaction";
import { TransactionService } from "../../../services/transaction";
import { TransactionController } from "../../../controllers/transaction";

const txnRepository = new TransactionRepository();
const txnService = new TransactionService(txnRepository);
const txnController = new TransactionController(txnService);

const txnRouter = Router();

//GET routes

//POST routes
txnRouter.post("/", async (req: Request, res: Response) => {
  await txnController.createTransaction(req, res);
});

export { txnRouter };
