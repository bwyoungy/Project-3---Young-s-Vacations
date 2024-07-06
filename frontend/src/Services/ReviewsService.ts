import axios from "axios";
import ReviewModel from "../Models/ReviewModel";
import appConfig from "../Utils/Config";

class ReviewService {
    // Function to get reviews by vacation ID
    public async getReviewsByVacation(vacationID:number):Promise<ReviewModel[]> {
        // Get reviews by vacation from backend using API call
        const response = await axios.get<ReviewModel[]>(appConfig.reviewsUrl + vacationID);
        return response.data;
    }

    // Function to get average review score by vacation ID
    public async getReviewAvgByVacation(vacationID:number):Promise<number>{
        // Get reviews by vacation
        const reviews = await this.getReviewsByVacation(vacationID);

        let reviewTotal = reviews.reduce((total, review) => total+review.rating, 0);

        return reviewTotal / reviews.length;
    }

    // Function to add new review
    public async addReview(review:ReviewModel):Promise<void> {
        // Add new review using API call
        const response = await axios.post<ReviewModel>(appConfig.reviewsUrl, review)
    }

    // Function to delete review
    public async deleteReview(id:number): Promise<void> {
        // Delete review using API call
        await axios.delete<void>(appConfig.reviewsUrl + id);
    }
}

const reviewService = new ReviewService(); // Singleton

export default reviewService;