import { IAsset } from "../models/asset";
import { IAssetRepository } from "../repositories/asset";

interface IAssetService {
  createAsset({
    name,
    description,
    price,
    image,
    banner,
    owner,
  }: {
    name: string;
    description: string | undefined;
    price: number;
    image: string | undefined;
    banner: string | undefined;
    owner: string;
  }): Promise<IAsset>;
  getAssetById(id: string): Promise<IAsset>;
}

export class AssetService implements IAssetService {
  #repository: IAssetRepository;

  constructor(repository: IAssetRepository) {
    this.#repository = repository;
  }

  async createAsset({
    name,
    description,
    price,
    image,
    banner,
    owner,
  }: {
    name: string;
    description: string | undefined;
    price: number;
    image: string | undefined;
    banner: string | undefined;
    owner: string;
  }): Promise<IAsset> {
    try {
      // Take in image and banner as files and upload to UploadThing here

      const asset = await this.#repository.createAsset({
        name,
        description,
        price,
        image,
        banner,
        owner,
      });

      return asset;
    } catch (err) {
      console.error("Error creating asset: ", err);
      throw err;
    }
  }

  async getAssetById(id: string): Promise<IAsset> {
    try {
      const asset = await this.#repository.getAssetById(id);

      if (!asset) {
        throw new Error("Asset not found with id");
      }

      return asset;
    } catch (err) {
      throw err;
    }
  }
}
