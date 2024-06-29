import { OkPacket } from "mysql";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../models/error-model";
import ReviewModel from "../models/review-model";
import dal from "../utils/dal";

// Function to get reviews by vacation
async function getReviewsByVacation(vacationID:number):Promise<ReviewModel[]> {
    // Create SQL query
    const sqlQuery = `
    SELECT *
    FROM reviews
    WHERE vacationID = ?;`;

    // Execute SQL query and save it in variable to be returned
    const reviews = await dal.execute(sqlQuery, [vacationID]);
    return reviews;
}

// Function to add a new review
async function addReview(review:ReviewModel):Promise<ReviewModel> {
    // Validate the review passed to function
    const errors = review.validate();

    // If there were errors in validation, throw an error (and quit function)
    if (errors) throw new ValidationErrorModel(errors);

    // Create SQL query - add the information from the review passed to the function into the reviews table
    const sqlQuery = `
    INSERT INTO reviews(username, vacationID, rating, content)
    VALUES(?, ?, ?, ?);`;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [review.username, review.vacationID, review.rating, review.content]);

    // Update the parameter review's ID as the auto incremented ID recieved from the info
    review.reviewID = info.insertId;

    // Return updated parameter review
    return review;
    
}

// Function to delete a review by id
async function deleteReview(id:number):Promise<void> {
    // Create SQL query - delete review from table based on id passed
    const sqlQuery = `
    DELETE FROM reviews
    WHERE reviewID = ?;`;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [id]);

    // Check if review was deleted by checking affectedRows of info, if it wasn't throw an error
    if (info.affectedRows <= 0) throw new ResourceNotFoundErrorModel(`Review #${id}`);
}

export default {
    getReviewsByVacation,
    addReview,
    deleteReview
}