import express, { NextFunction, Request, Response } from "express";
import FollowModel from "../models/follow-model";
import followsLogic from "../logic/follows-logic";

// Create express router
const router = express.Router();

// Route to get follows by username
router.get("/follows/:username", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        const follows = await followsLogic.getFollowsByUser(request.params.username);
        response.json(follows);
    } catch (error:any) {
        next(error);
    }
});

// Route to add a new follow
router.post("/follows", async(request:Request, response:Response, next:NextFunction)=>{
    try {
        const follow = new FollowModel(request.body);
        const addedFollow = await followsLogic.addFollow(follow);
        
        response.status(201).json(addedFollow);
    } catch (error:any) {
        next(error);
    }
});

// Route to delete a follow
router.delete("/follows/:id/:username", async(request:Request,response:Response,next:NextFunction)=>{
    try {
        await followsLogic.unfollow(request.params.username, +request.params.id);
        response.sendStatus(204);
    } catch (error:any) {
        next(error);
    }
});

export default router;