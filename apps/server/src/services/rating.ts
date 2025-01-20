import { isValidRating } from "../lib/utils";
import { IRating } from "../models/rating";
import { IRatingRepository } from "../repositories/rating";

interface IRatingService {
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

export class RatingService implements IRatingService {
  #repository: IRatingRepository;

  constructor(repository: IRatingRepository) {
    this.#repository = repository;
  }

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
    try {
      if (!isValidRating(value)) {
        throw new Error("Rating is not valid");
      }

      const rating = await this.#repository.createRating({
        value,
        asset,
        reviewer,
        feedback,
      });

      return rating;
    } catch (err) {
      console.error("Error creating rating: ", err);
      throw err;
    }
  }
}
