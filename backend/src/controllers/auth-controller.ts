import express, { NextFunction, Request, Response } from "express";
import UserModel from "../models/user-model";
import authLogic from "../logic/auth-logic";
import CredentialsModel from "../models/credentials-model";

// Create express router
const router = express.Router();

// Route to register user
router.post("/auth/register", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    } catch (error:any) {
        next(error);
    }
});

// Route to login user
router.post("/auth/login", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        const creds = new CredentialsModel(request.body);
        const token = await authLogic.login(creds);
        response.json(token);
    } catch (error:any) {
        next(error);
    }
});

export default router;