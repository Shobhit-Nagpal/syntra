import { AssetModel as Asset, IAsset } from "../models/asset";

export interface IAssetRepository {
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
  getAssetById(id: string): Promise<IAsset | null>;
}

export class AssetRepository implements IAssetRepository {
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
    const asset = new Asset({
      name,
      description,
      price,
      image,
      banner,
      owner,
    });

    await asset.save();

    return asset;
  }

  async getAssetById(id: string): Promise<IAsset | null> {
    const asset = await Asset.findById(id);

    if (!asset) return null;

    return asset;
  }
}
