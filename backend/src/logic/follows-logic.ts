import { OkPacket } from "mysql";
import FollowModel from "../models/follow-model";
import dal from "../utils/dal";
import { ResourceExistsErrorModel, ResourceNotFoundErrorModel, ValidationErrorModel } from "../models/error-model";

// Function to get follows by username
async function getFollowsByUser(username:string):Promise<FollowModel[]> {
    // Create SQL query
    const sqlQuery = `
    SELECT *
    FROM follows
    WHERE username = ?;`;

    // Execute SQL query and save in variable to be returned
    const follows = await dal.execute(sqlQuery, [username]);
    return follows;
}

// Function to get follows by vacation
async function getFollowsByVacation(vacationID:number):Promise<FollowModel[]> {
    // Create SQL query
    const sqlQuery = `
    SELECT *
    FROM follows
    WHERE vacationID = ?;`;

    // Execute SQL query and save in variable to be returned
    const follows = await dal.execute(sqlQuery, [vacationID]);
    return follows;
}


// Function to add a new follow
async function addFollow(follow:FollowModel):Promise<FollowModel> {
    // Validate the follow passed to function
    const errors = follow.validate();

    // If there were errors in validation, throw an error (and quit function)
    if (errors) throw new ValidationErrorModel(errors);
    
    // Check if follow exists already
    const followExists = await checkFollowExists(follow.username, follow.vacationID);
    if(followExists) throw new ResourceExistsErrorModel(`Follow of vacation ${follow.vacationID} by user ${follow.username} is already in database`);

    // Create SQL query
    const sqlQuery = `
    INSERT INTO follows(username, vacationID)
    VALUES(?, ?);`;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [follow.username, follow.vacationID]);

    return follow;
}

// Function to check if a follow exists in follows database
async function checkFollowExists(username:string, vacationID:number):Promise<boolean> {
    // Create SQL query to count follows with the parameters (0 or 1)
    const sqlQuery = `
    SELECT COUNT(*) AS followCount
    FROM follows
    WHERE username = ? AND vacationID = ?;`

    // Execute SQL query and save in variable
    const result = await dal.execute(sqlQuery, [username, vacationID]);
    // Extract user count
    const followCount = result[0].followCount;

    return (followCount > 0)
}

// Function to delete a follow
async function unfollow(username:string, vacationID:number):Promise<void> {
    // Create SQL query to delete follow
    const sqlQuery = `
    DELETE FROM follows
    WHERE username = ? AND vacationID = ?;`;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [username, vacationID]);

    // Check if ID exists by checking affectedRows of info, if it doesn't throw an error
    if (info.affectedRows <= 0) throw new ResourceNotFoundErrorModel(`Follow for user ${username} and vacation ${vacationID}`);
}

export default {
    getFollowsByUser,
    getFollowsByVacation,
    addFollow,
    unfollow
}