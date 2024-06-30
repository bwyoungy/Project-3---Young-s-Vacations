import express, { NextFunction, Request, Response } from "express";
import vacationsLogic from "../logic/vacations-logic";
import VacationModel from "../models/vacation-model";
import path from "path";
import verifyAdmin from "../middleware/verify-admin";

// Create express router
const router = express.Router();

// Route to get all vacations
router.get("/vacations", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Get all vacations
        const vacations = await vacationsLogic.getAllVacations();
        // Return vacations
        response.json(vacations);
    } catch (error:any) {
        next(error);
    }
});

// Route to get popular vacations
router.get("/vacations/popular/:limit", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Get popular vacations
        const vacations = await vacationsLogic.getPopularVacations(+request.params.limit);
        // Return vacations
        response.json(vacations);
    } catch (error:any) {
        next(error);
    }
});

// Route to get a vacation based on its id
router.get("/vacations/:id", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Get a vacation based on id supplied in parameter
        const vacation = await vacationsLogic.getVacationById(+request.params.id);
        
        // Return the vacation requested by id
        response.json(vacation);
    } catch (error:any) {
        next(error);
    }
});

// Route to add a new vacation; uses middleware to verify an admin sent the request
router.post("/vacations", verifyAdmin, async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Set uploaded file in body of request
        request.body.image = request.files?.image;
        
        // Create VacationModel based on request
        const vacation = new VacationModel(request.body);
        // Add vacation and store the vacation added
        const addedVacation = await vacationsLogic.addVacation(vacation);
        // Return added vacation and 201 (created) status
        response.status(201).json(addedVacation);
    } catch (error:any) {
        next(error);
    }
});

// Route to update a vacation; uses middleware to verify an admin sent the request
router.put("/vacations/:id", verifyAdmin, async(request:Request,response:Response,next:NextFunction)=>{
    try {
        // Set uploaded file in body of request
        request.body.image = request.files?.image;

        // Set id of vacation based on parameter
        request.body.vacationID = +request.params.id;
        
        // Create VacationModel based on request
        const vacation = new VacationModel(request.body);

        // Update vacation and save it
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        // Return updated vacation
        response.json(updatedVacation);
    } catch (error:any) {
        next(error);
    }
});

// Route to delete a vacation; uses middleware to verify an admin sent the request
router.delete("/vacations/:id", verifyAdmin, async(request:Request,response:Response,next:NextFunction)=>{
    try {
        // Delete vacation based on id from parameter
        await vacationsLogic.deleteVacation(+request.params.id);
        // Return 204 (no content) status (was successful but there is no payload (void))
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

// Route to get an image based on it's name
router.get("/vacations/images/:imageName", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        // Get path for image saved in server
        const serverPath = path.join(__dirname, "..", "..", "..", "frontend", "public", request.params.imageName);
        // Send the image saved in the path through the response
        response.sendFile(serverPath);
    } catch (error:any) {
        next(error);
    }
});

export default router;