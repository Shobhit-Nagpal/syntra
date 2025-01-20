import { Request, Response } from "express";
import { IAssetService } from "../services/asset";

interface IAssetController {
  createAsset(req: Request, res: Response): Promise<Response>;
  getAssetById(req: Request, res: Response): Promise<Response>;
}

export class AssetController implements IAssetController {
  #service: IAssetService;

  constructor(service: IAssetService) {
    this.#service = service;
  }

  async createAsset(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, price, image, banner, owner } = req.body;

      if (!name || !price || !owner) {
        return res
          .status(400)
          .json({ message: "Name, price and owner are required" });
      }

      const asset = await this.#service.createAsset({
        name,
        description,
        price,
        image,
        banner,
        owner,
      });

      return res.status(201).json(asset);
    } catch (err) {
      console.error("Error creating asset in controller: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAssetById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing id field" });
      }

      const asset = await this.#service.getAssetById(id);

      return res.status(200).json(asset);
    } catch (err) {
      console.error("Error in getting asset by id controller: ", err);
      return res.status(500).json({ message: "Internal server error " });
    }
  }
}
