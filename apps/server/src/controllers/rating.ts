import { Request, Response } from "express";
import { IRatingService } from "../services/rating";

interface IRatingController {
  createRating(req: Request, res: Response): Promise<Response>;
}

export class RatingController implements IRatingController {
  #service: IRatingService;

  constructor(service: IRatingService) {
    this.#service = service;
  }

  async createRating(req: Request, res: Response): Promise<Response> {
    try {
      const { value, asset, reviewer, feedback } = req.body;

      if (!value || !asset || !reviewer) {
        return res
          .status(400)
          .json({ message: "Value, asset and reviewer are required" });
      }

      const rating = await this.#service.createRating({
        value,
        asset,
        reviewer,
        feedback,
      });

      return res.status(201).json(rating);

    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
