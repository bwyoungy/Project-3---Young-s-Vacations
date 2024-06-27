import { NextFunction, Request, Response } from "express";
import { RouteNotFoundErrorModel } from "../models/error-model";

function routeNotFound(request:Request, response: Response, next:NextFunction) {
    // Create and throw a new RouteNotFound Error
    const err = new RouteNotFoundErrorModel(request.originalUrl);
    next(err);
}

export default routeNotFound;