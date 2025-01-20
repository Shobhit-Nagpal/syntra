import { IRating, RatingModel as Rating } from "../models/rating";

export interface IRatingRepository {
  createRating({
    value,
    asset,
    reviewer,
    feedback,
  }: {
    value: number;
    asset: string;
    reviewer: string;
    feedback: string | undefined;
  }): Promise<IRating>;
}

export class RatingRepository implements IRatingRepository {
  async createRating({
    value,
    asset,
    reviewer,
    feedback,
  }: {
    value: number;
    asset: string;
    reviewer: string;
    feedback: string | undefined;
  }): Promise<IRating> {
    const rating = new Rating({
      value,
      asset,
      reviewer,
      feedback,
    });

    return rating;
  }
}
