import { OkPacket } from "mysql";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../models/error-model";
import VacationModel from "../models/vacation-model";
import dal from "../utils/dal";

// Function to get all vacations
async function getAllVacations():Promise<VacationModel[]> {
    // Create SQL query - selects all columns from vacations table, with dates formatted
    const sqlQuery = `
        SELECT vacationID, destination, description, DATE_FORMAT(startDate, "%Y-%m-%d") as "startDate", DATE_FORMAT(endDate, "%Y-%m-%d") as "endDate", price, imageName
        FROM vacations`;

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
    WHERE vacationID = ${id};
    `;

    // Execute SQL query and save in variable to be returned
    const vacation = await dal.execute(sqlQuery);

    // If vacation not found throw an error that it doesn't exist (and quit function)
    if (!vacation) throw new ResourceNotFoundErrorModel(id);

    return vacation;
}

// Function to add a new vacation
async function addVacation(vacation:VacationModel):Promise<VacationModel> {
    // Validate the vacation passed to function
    const error = vacation.validate();

    // If there were errors in validation, throw an error (and quit function)
    if (error) throw new ValidationErrorModel(error);

    // Create SQL query - add the information from the vacation passed to the function into the vacations table
    const sqlQuery = `
    INSERT INTO vacations(destination, description, startDate, endDate, price, imageName)
    VALUES("${vacation.destination}", "${vacation.description}", "${vacation.startDate}", "${vacation.endDate}", ${vacation.price}, "${vacation.imageName}");`;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery);

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

    // Create SQL query - update the vacation based on information from the vacation passed to the function
    const sqlQuery = `
    UPDATE vacations SET
        destination = "${vacation.destination}",
        description = "${vacation.description}",
        startDate = "${vacation.startDate}",
        endDate = "${vacation.endDate}",
        price = ${vacation.price},
        imageName = "${vacation.imageName}"
    WHERE vacationID = ${vacation.vacationID};
    `;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery);

    // Check if ID exists by checking affectedRows of info, if it doesn't throw an error (and quit function)
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationID);

    // Return updated vacation
    return vacation;
}

async function deleteVacation(id:number):Promise<void> {
    // Create SQL query - delete vacation from table based on id passed
    const sqlQuery = `
    DELETE FROM vacations
    WHERE vacationID = ${id};
    `;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery);

    // Check if ID exists by checking affectedRows of info, if it doesn't throw an error
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id);
}

export default {
    getAllVacations,
    getVacationById,
    addVacation,
    updateVacation,
    deleteVacation
}