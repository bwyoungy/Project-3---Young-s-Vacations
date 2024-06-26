import { OkPacket } from "mysql";
import UserModel from "../models/user-model";
import dal from "../utils/dal";
import { ForbiddenErrorModel, ResourceNotFoundErrorModel } from "../models/error-model";
import RoleModel from "../models/role-model";

// Function to get all users
async function getAllUsers():Promise<UserModel[]> {
    // Create SQL query - selects all columns from users table, except password which we don't want to send to frontend
    const sqlQuery = `
    SELECT username, email, firstName, lastName, role
    FROM users;`;

    // Execute SQL query and save in variable to be returned
    const users = await dal.execute(sqlQuery);

    return users;
}

// Function to delete a user by username
async function deleteUser(username:string):Promise<void> {
    // Create SQL query to check role of user to be deleted
    const sqlRoleQuery = `
    SELECT role
    FROM users
    WHERE username = ?;`;
    
    // Execute SQL query and save in variable
    const roleResult = await dal.execute(sqlRoleQuery, [username]);
    // Extract role
    const role = roleResult[0].role;

    // Check admin count if an admin is being deleted
    if (role === RoleModel.Admin) {
        // Create SQL query to check how many admins are left
        const sqlAdminsQuery = `
        SELECT COUNT(*) AS adminCount
        FROM users
        WHERE role = "admin";`;

        // Execute SQL query and save in variable
        const adminResult = await dal.execute(sqlAdminsQuery);
        // Extract admin count
        const adminCount = adminResult[0].adminCount;

        // If there is one admin left, forbid to delete since we don't want to get to situation of no admins
        if (adminCount <= 1) throw new ForbiddenErrorModel(`Can't delete admin ${username} since there has to remain at least one admin`);
    }
    
    // Create SQL query - delete user from table based on username passed
    const sqlQuery = `
    DELETE FROM users
    WHERE username = ?;`;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [username]);

    // Check if username exists by checking affectedRows of info, if it doesn't throw an error
    if (info.affectedRows <= 0) throw new ResourceNotFoundErrorModel(username);
}

// Function to promote user to admin role
async function promoteUser(username:string):Promise<void> {
    // Create SQL query - update user's role to admin for username
    const sqlQuery = `
    UPDATE users SET
        role = "admin"
    WHERE username = ?;`;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [username]);

    // Check if username exists by checking affectedRows of info, if it doesn't throw an error
    if (info.affectedRows <= 0) throw new ResourceNotFoundErrorModel(username);

    // Create SQL query to delete user's follows since admin doesn't have follows
    const sqlDeletionQuery = `
    DELETE FROM follows
    WHERE username = ?;`;

    // Execute SQL query
    await dal.execute(sqlDeletionQuery, [username]);
}

// Function to demote admin to user role
async function demoteUser(username:string):Promise<void> {
    // Create SQL query to check how many admins are left
    const sqlAdminsQuery = `
    SELECT COUNT(*) AS adminCount
    FROM users
    WHERE role = "admin";`;

    // Execute SQL query and save in variable
    const result = await dal.execute(sqlAdminsQuery);
    // Extract admin count
    const adminCount = result[0].adminCount;

    // If there is one admin left, forbid to demote since we don't want to get to situation of no admins
    if (adminCount <= 1) throw new ForbiddenErrorModel(`Can't demote admin ${username} since there has to remain at least one admin`);

    // Create SQL query - update user's role to admin for username
    const sqlQuery = `
    UPDATE users SET
        role = "user"
    WHERE username = ?;`;

    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [username]);

    // Check if username exists by checking affectedRows of info, if it doesn't throw an error
    if (info.affectedRows <= 0) throw new ResourceNotFoundErrorModel(username);
}

export default {
    getAllUsers,
    deleteUser,
    promoteUser,
    demoteUser
}