class ReviewModel {
    public reviewID:number;
    public username:string;
    public vacationID:number;
    public rating:number;
    public content:string;

    public static usernameValidation = {
        required: {value: true, message: "Please write a username"},
        minLength: {value: 1, message: "Username must be at least one character"},
        maxLength: {value: 50, message: "Username can't be more than 50 characters"}
    }

    public static vacationIDValidation = {
        required: {value: true, message: "Please write a vacation ID"}
    }

    public static ratingValidation = {
        required: {value: true, message: "Please select a rating"},
        min: {value: 1, message: "Rating must be at least 1"},
        max: {value: 5, message: "Rating can't be higher than 5"}
    }

    public static contentValidation = {
        required: {value: true, message: "Please write a review"},
        minLength: {value: 1, message: "Review must be at least one character"},
        maxLength: {value: 1000, message: "Review can't be over 1000 characters"}
    }
}

export default ReviewModel;