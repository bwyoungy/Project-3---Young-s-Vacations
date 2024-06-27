import express, { NextFunction, Request, Response } from "express";
import usersLogic from "../logic/users-logic";
import verifyAdmin from "../middleware/verify-admin";

// Create express router
const router = express.Router();

// Route to get all users; uses middleware to verify an admin sent the request
router.get("/users", verifyAdmin, async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Get all users
        const users = await usersLogic.getAllUsers();
        // Return all the users
        response.json(users);
    } catch (error:any) {
        next(error);
    }
});

// Route to delete a user; uses middleware to verify an admin sent the request
router.delete("/users/:username", verifyAdmin, async(request:Request,response:Response,next:NextFunction)=>{
    try {
        // Delete user using username supplied in parameter
        await usersLogic.deleteUser(request.params.username);
        // Return 204 (no content) status (was successful but there is no payload (void))
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

// Route to promote user; uses middleware to verify an admin sent the request
router.patch("/users/promote/:username", verifyAdmin, async(request:Request,response:Response,next:NextFunction)=>{
    try {
        // Promote user to admin using username supplied in parameter
        await usersLogic.promoteUser(request.params.username);
        // Return 204 (no content) status (was successful but there is no payload (void))
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

// Route to demote admin; uses middleware to verify an admin sent the request
router.patch("/users/demote/:username", verifyAdmin, async(request:Request,response:Response,next:NextFunction)=>{
    try {
        // Demote user to regular user using username supplied in parameter
        await usersLogic.demoteUser(request.params.username);
        // Return 204 (no content) status (was successful but there is no payload (void))
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

export default router;