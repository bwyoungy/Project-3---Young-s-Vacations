import { Request } from "express";
import UserModel from "../models/user-model";
import jwt from "jsonwebtoken";
import RoleModel from "../models/role-model";
import crypto from "crypto"

// Secret key for REST API
const secretKey = "InsideOut";

// Function to get a new token
function getNewToken(user:UserModel):string {
    // Delete password so as not to return to frontend
    delete user.password;    

    // Container for user object
    const container = {user};

    // Set experation  time
    const options = {expiresIn: "3h"};
    
    // Generate token
    const token = jwt.sign(container, secretKey, options);
    
    return token;
}

function verifyToken(request:Request):Promise<boolean> {
    return new Promise<boolean>((resolve, reject)=>{
        try {
            // Token format:
            // Authorization header: "Bearer the-token"

            const header = request.header("authorization");
            
            if(!header) {
                resolve(false);
                return;
            }

            // Extract token
            const token = header.substring(7);
            if(!token) {
                resolve(false);
                return;
            }

            jwt.verify(token, secretKey, err=>{
                // Check if token is illegal
                if (err) {
                    resolve(false);
                    return;
                }

                // By this point token must be legal
                resolve(true);
            });
        } catch (error:any) {
            reject(error);
        }
    });
}

const salt = "DeadSeaVacation";

function hash(plainText:string):string {
    if(!plainText) return null;

    // Hash with salt
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;
}

async function verifyIsAdmin(request:Request):Promise<boolean> {
    // Check if user is logged in
    const isLoggedIn = await verifyToken(request);

    // If isn't logged in can't be logged in admin
    if (!isLoggedIn) return false;

    // Extract token
    const token = request.header("authorization").substring(7);

    // Extract user from token
    const container:any = jwt.decode(token);
    const user = container.user;

    // Return if user is admin or not
    return user.role === RoleModel.Admin;
}

export default { 
    getNewToken,
    verifyToken,
    hash,
    verifyIsAdmin
};