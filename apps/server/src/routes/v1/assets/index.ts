import { Request, Response, Router } from "express";
import { AssetRepository } from "../../../repositories/asset";
import { AssetService } from "../../../services/asset";
import { AssetController } from "../../../controllers/asset";

const assetRepository = new AssetRepository();
const assetService = new AssetService(assetRepository);
const assetController = new AssetController(assetService);

const assetsRouter = Router();

//GET routes
assetsRouter.get("/:id", async (req: Request, res: Response) => {
  await assetController.getAssetById(req, res);
});

//POST routes
assetsRouter.post("/", async (req: Request, res: Response) => {
  await assetController.createAsset(req, res);
});

export { assetsRouter };
