import express, { NextFunction, Request, Response } from "express";
import FollowModel from "../models/follow-model";
import followsLogic from "../logic/follows-logic";

// Create express router
const router = express.Router();

// Route to get follows by username
router.get("/follows/:username", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Get array of follows by the username supplied in parameters
        const follows = await followsLogic.getFollowsByUser(request.params.username);
        // Return the array of follows
        response.json(follows);
    } catch (error:any) {
        next(error);
    }
});

// Route to add a new follow
router.post("/follows", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        // Create FollowModel based on the request
        const follow = new FollowModel(request.body);
        // Add follow and save addedFollow
        const addedFollow = await followsLogic.addFollow(follow);
        // Return added follow and 201 (created) status
        response.status(201).json(addedFollow);
    } catch (error:any) {
        next(error);
    }
});

// Route to delete a follow
router.delete("/follows/:id/:username", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        // Send reqeust to delete a follow by the username and vacation id supplied in parameters
        await followsLogic.unfollow(request.params.username, +request.params.id);
        // Return 204 (no content) status (was successful but there is no payload (void))
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

export default router;