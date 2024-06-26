import express, { NextFunction, Request, Response } from "express";
import usersLogic from "../logic/users-logic";

// Create express router
const router = express.Router();

// Route to get all users
router.get("/users", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        const users = await usersLogic.getAllUsers();
        response.json(users);
    } catch (error:any) {
        next(error);
    }
});

// Route to delete a user
router.delete("/users/:username", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        await usersLogic.deleteUser(request.params.username);
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

// Route to promote user
router.patch("/users/promote/:username", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        await usersLogic.promoteUser(request.params.username);
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

// Route to demote admin
router.patch("/users/demote/:username", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        await usersLogic.demoteUser(request.params.username);
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

export default router;