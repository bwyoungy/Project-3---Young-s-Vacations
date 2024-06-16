import { OkPacket } from "mysql";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../models/error-model";
import VacationModel from "../models/vacation-model";
import dal from "../utils/dal";
import { v4 as uuid } from "uuid"; // import v4 function and rename to uuid
import { promises } from "fs";

// Function to get all vacations
async function getAllVacations():Promise<VacationModel[]> {
    // Create SQL query - selects all columns from vacations table, with dates formatted
    const sqlQuery = `
        SELECT vacationID, destination, description, DATE_FORMAT(startDate, "%Y-%m-%d") as "startDate", DATE_FORMAT(endDate, "%Y-%m-%d") as "endDate", price, imageName
        FROM vacations;`;

    // Execute SQL query and save in variable to be returned
    const vacations = await dal.execute(sqlQuery);
    return vacations;
}

// Function to get a vacation based on its id
async function getVacationById(id:number):Promise<VacationModel> {
    // Create SQL query - selects all columns from vacations table for specific id, with dates formatted
    const sqlQuery = `
    SELECT vacationID, destination, description, DATE_FORMAT(startDate, "%Y-%m-%d") as "startDate", DATE_FORMAT(endDate, "%Y-%m-%d") as "endDate", price, imageName
    FROM vacations
    WHERE vacationID = ?;
    `;

    // Execute SQL query and save in variable to be returned
    const vacation = await dal.execute(sqlQuery, [id]);

    // If vacation not found throw an error that it doesn't exist (and quit function)
    if (!vacation) throw new ResourceNotFoundErrorModel(id);

    return vacation;
}

// Function to add a new vacation
async function addVacation(vacation:VacationModel):Promise<VacationModel> {
    // Validate the vacation passed to function
    const errors = vacation.validate();

    // If there were errors in validation, throw an error (and quit function)
    if (errors) throw new ValidationErrorModel(errors);

    // Check if image was provided
    if (vacation.image) {
        // Extract file extension from image (for example ".jpg")
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        // Set image name as universal unique identifier (uuid)
        vacation.imageName = uuid() + extension;
        // Move image to server and name with uuid
        await vacation.image.mv("../frontend/public/" + vacation.imageName);
    }
    else throw new ValidationErrorModel("No image provided!");

    // Create SQL query - add the information from the vacation passed to the function into the vacations table
    const sqlQuery = `
    INSERT INTO vacations(destination, description, startDate, endDate, price, imageName)
    VALUES("?", "?", "?", "?", ?, "?");`;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName]);

    // Update the parameter vacation's ID as the auto incremented ID recieved from the info
    vacation.vacationID = info.insertId;

    // Return updated parameter meeting
    return vacation;
}

async function updateVacation(vacation:VacationModel):Promise<VacationModel> {
    // Validate the vacation passed to function
    const error = vacation.validate();

    // If there were errors in validation, throw an error (and quit function)
    if (error) throw new ValidationErrorModel(error);

    // Create SQL query to get image name for vacation to update
    const imgSqlQuery = `
    SELECT imageName
    FROM vacations
    WHERE vacationID = ?;
    `;

    // Execute image SQL query and save the info
    const imgInfo = await dal.execute(imgSqlQuery, [vacation.vacationID]);
    
    // Save the image path
    const imgPath = imgInfo?.[0]?.imageName;

    // Get existing image path
    const prevImgPath = "../frontend/public/" + imgPath;

    // Create boolean flag to check if img path exists with default as true
    let doesImgExist = true;
    // Check that existing path exists
    try {
        await promises.access(prevImgPath);
    } catch (error) {
        // If existing path doesn't exist, set boolean flag as false
        doesImgExist = false;
    }
    
    // Check if image was provided
    if (vacation.image) {        
        // Delete existing path if exists (so can be overwritten)
        if (doesImgExist) await promises.unlink(prevImgPath);

        // Extract file extension from image (for example ".jpg")
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        // Set image name as universal unique identifier (uuid)
        vacation.imageName = uuid() + extension;
        // Move image to server and name with uuid
        await vacation.image.mv("../frontend/public/" + vacation.imageName);
    }
    // If no image and no imageName provided, throw an error
    else if (!vacation.imageName) throw new ValidationErrorModel("No image provided!");

    // Create SQL query - update the vacation based on information from the vacation passed to the function
    const sqlQuery = `
    UPDATE vacations SET
        destination = "?",
        description = "?",
        startDate = "?",
        endDate = "?",
        price = ?,
        imageName = "?"
    WHERE vacationID = ?;
    `;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationID]);

    // Check if ID exists by checking affectedRows of info, if it doesn't throw an error (and quit function)
    if (info.affectedRows <= 0) throw new ResourceNotFoundErrorModel(vacation.vacationID);

    // Return updated vacation
    return vacation;
}

async function deleteVacation(id:number):Promise<void> {
    // Create SQL query - selects all columns from vacations table for specific id, with dates formatted
    const imgSqlQuery = `
    SELECT imageName
    FROM vacations
    WHERE vacationID = ?;
    `;

    // Execute SQL query and save the info
    const imgInfo = await dal.execute(imgSqlQuery, [id]);

    // If there isn't data for id being checked to delete, throw error 
    if(!imgInfo[0]) throw new ResourceNotFoundErrorModel(id);
    
    // Create SQL query - delete vacation from table based on id passed
    const sqlQuery = `
    DELETE FROM vacations
    WHERE vacationID = ?;
    `;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [id]);

    // Check if ID exists by checking affectedRows of info, if it doesn't throw an error
    // Commenting out as unneccesary in this instance as was checked earlier
    // if (info.affectedRows <= 0) throw new ResourceNotFoundErrorModel(id);

    // Get image path of deleted vacation
    const imgPath = "../frontend/public/" + imgInfo?.[0]?.imageName;
    // Delete image path
    await promises.unlink(imgPath);
}

export default {
    getAllVacations,
    getVacationById,
    addVacation,
    updateVacation,
    deleteVacation
}