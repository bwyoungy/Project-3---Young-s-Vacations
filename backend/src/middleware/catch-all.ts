import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

function catchAll(error:any, request:Request, response:Response, next:NextFunction) {
    
    // Log error to console and to logger file
    console.log(error);
    logger(error.message);

    response.status(error.status || 500).send(error.message);
}

export default catchAll