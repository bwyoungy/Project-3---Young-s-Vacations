import { NextFunction, Request, Response } from "express";
import cyber from "../utils/cyber";
import { AuthenticationErrorModel } from "../models/error-model";

async function verifyAdmin(request:Request, response:Response, next:NextFunction) {
    try {
        // Use cyber util to check if admin sent request
        const isAdmin = await cyber.verifyIsAdmin(request);
        // If not throw an error
        if(!isAdmin) throw new AuthenticationErrorModel("Not an admin!");
        next();
    } catch (error:any) {
        next(error);
    }
}

export default verifyAdmin;