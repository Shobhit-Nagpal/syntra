import { Request, Response, Router } from "express";
import { RatingRepository } from "../../../repositories/rating";
import { RatingService } from "../../../services/rating";
import { RatingController } from "../../../controllers/rating";

const ratingRepository = new RatingRepository();
const ratingService = new RatingService(ratingRepository);
const ratingController = new RatingController(ratingService);

const ratingsRouter = Router();

//GET routes

//POST routes
ratingsRouter.post("/", async (req: Request, res: Response) => {
  await ratingController.createRating(req, res);
});

export { ratingsRouter };
