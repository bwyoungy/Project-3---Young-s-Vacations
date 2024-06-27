import express, { NextFunction, Request, Response } from "express";
import UserModel from "../models/user-model";
import authLogic from "../logic/auth-logic";
import CredentialsModel from "../models/credentials-model";

// Create express router
const router = express.Router();

// Route to register user
router.post("/auth/register", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Create UserModel based on the request
        const user = new UserModel(request.body);
        // Register user to database and get new token
        const token = await authLogic.register(user);
        // Return the token and 201 (created) status
        response.status(201).json(token);
    } catch (error:any) {
        next(error);
    }
});

// Route to login user
router.post("/auth/login", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Create CredentialsModel based on the request
        const creds = new CredentialsModel(request.body);
        // Login logic to check user's credentials with the database and get new token
        const token = await authLogic.login(creds);
        // Return the token
        response.json(token);
    } catch (error:any) {
        next(error);
    }
});

export default router;