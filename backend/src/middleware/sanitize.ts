import { NextFunction, Request, Response } from "express";
import striptags from "striptags";

function sanitize(request:Request, response:Response, next:NextFunction) {
    // Iterate over props from request
    for (const prop in request.body) {
        // For every prop which is a string, striptags from it
        if (typeof request.body[prop] === "string") {
            request.body[prop] = striptags(request.body[prop]);
        }
    }
    next();
}

export default sanitize;