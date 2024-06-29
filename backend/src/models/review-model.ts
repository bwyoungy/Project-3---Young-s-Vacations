import Joi from "joi";

class ReviewModel {
    public reviewID:number;
    public username:string;
    public vacationID:number;
    public rating:number;
    public content:string;

    public constructor(review:ReviewModel) {
        this.reviewID = review.reviewID;
        this.username = review.username;
        this.vacationID = review.vacationID;
        this.rating = review.rating;
        this.content = review.content;
    }

    private static validationScheme = Joi.object({
        reviewID: Joi.number().optional().positive().integer(),
        username: Joi.string().required().min(3).max(50),
        vacationID: Joi.number().required().positive().integer(),
        rating: Joi.number().required().positive().integer().min(1).max(5),
        content: Joi.string().required().min(1).max(1000)
    });

    public validate():string {
        const result = ReviewModel.validationScheme.validate(this);
        return result.error?.message;
    }
}

export default ReviewModel;