import express, { NextFunction, Request, Response } from "express";
import vacationsLogic from "../logic/vacations-logic";
import VacationModel from "../models/vacation-model";

// Create express router
const router = express.Router();

// Route to get all vacations
router.get("/vacations", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        const vacations = await vacationsLogic.getAllVacations();
        response.json(vacations);
    } catch (error:any) {
        next(error);
    }
});

// Route to get a vacation based on its id
router.get("/vacations/:id", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        const vacation = await vacationsLogic.getVacationById(+request.params.id);
        
        response.json(vacation[0]);
    } catch (error:any) {
        next(error);
    }
});

// Route to add a new vacation
router.post("/vacations", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    } catch (error:any) {
        next(error);
    }
});

// Route to update a vacation
router.put("/vacations/:id", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        request.body.id = +request.params.id;
        
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    } catch (error:any) {
        next(error);
    }
});

// Route to delete a vacation
router.delete("/vacations/:id", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        await vacationsLogic.deleteVacation(+request.params.id);
        response.status(204);
    } catch (error:any) {
        next(error);
    }
});

export default router;