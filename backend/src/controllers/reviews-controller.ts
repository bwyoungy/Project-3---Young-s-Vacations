import express, { NextFunction, Request, Response } from "express";
import reviewsLogic from "../logic/reviews-logic";
import ReviewModel from "../models/review-model";
import verifyAdmin from "../middleware/verify-admin";

// Create express router
const router = express.Router();

// Route to get reviews by vacation
router.get("/reviews/:vacationID", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Get array of reviews by the vacationID supplied in parameters
        const reviews = await reviewsLogic.getReviewsByVacation(+request.params.vacationID);
        // Return the array of reviews
        response.json(reviews);
    } catch (error:any) {
        next(error);
    }
});

// Route to add a new review
router.post("/reviews", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Create ReviewModel based on the request
        const review = new ReviewModel(request.body);
        // Add review and save addedReview
        const addedReview = await reviewsLogic.addReview(review);
        // Return added review and 201 (created) status
        response.status(201).json(addedReview);
    } catch (error:any) {
        next(error);
    }
});

// Route to delete a review; uses middleware to verify an admin sent the request
router.delete("/reviews/:id", verifyAdmin, async(request:Request,response:Response,next:NextFunction)=>{
    try {
        // Delete review based on id from parameter
        await reviewsLogic.deleteReview(+request.params.id);
        // Return 204 (no content) status (was successful but there is no payload (void))
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

export default router;