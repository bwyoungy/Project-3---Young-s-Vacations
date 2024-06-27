import { NextFunction, Request, Response } from "express";
import cyber from "../utils/cyber";
import { AuthenticationErrorModel } from "../models/error-model";

async function verifyLoggedIn(request:Request, response:Response,next:NextFunction) {
    try {
        // Use cyber util to check token is valid
        const isTokenValid = await cyber.verifyToken(request);
        // If not throw error
        if(!isTokenValid) throw new AuthenticationErrorModel("The token isn't valid!");
        next();
    } catch (error:any) {
        next(error);
    }
}

export default verifyLoggedIn;