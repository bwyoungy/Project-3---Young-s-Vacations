import { OkPacket } from "mysql";
import CredentialsModel from "../models/credentials-model";
import { AuthenticationErrorModel, ResourceExistsErrorModel, ValidationErrorModel } from "../models/error-model";
import RoleModel from "../models/role-model";
import UserModel from "../models/user-model";
import dal from "../utils/dal";
import cyber from "../utils/cyber";

// Function to register a new user
async function register(user:UserModel):Promise<string> {
    // New user is as regular user
    user.role = RoleModel.User;

    // Validate the user passed to function
    const errors = user.validate();
    // If there were errors in validation, throw an error (and quit function)
    if (errors) throw new ValidationErrorModel(errors);

    // Check if username was used already
    const usernameExists = await checkUsernameExists(user.username);
    if(usernameExists) throw new ResourceExistsErrorModel(`${user.username} has already been used`);

    // Check if email was used already
    const emailExists = await checkEmailExists(user.email);
    if(emailExists) throw new ResourceExistsErrorModel(`${user.email} already has a registered user`);

    // Hash user password
    user.password = cyber.hash(user.password);

    // Create SQL query to add user
    const sqlQuery = `
        INSERT INTO users(username, email, firstName, lastName, password, role)
        VALUES(?, ?, ?, ?, ?, ?);`;
    
    // Execute SQL query and save the info recieved from it
    const info:OkPacket = await dal.execute(sqlQuery, [user.username, user.email, user.firstName, user.lastName, user.password, user.role]);
    
    // Generate and send token
    return cyber.getNewToken(user);
}

// Function to login user
async function login(creds:CredentialsModel):Promise<string> {
    // Validate the credentials passed to function
    const errors = creds.validate();
    // If there were errors in validation, throw an error (and quit function)
    if (errors) throw new ValidationErrorModel(errors);

    // Hash password
    creds.password = cyber.hash(creds.password);
    
    // Create SQL query to get user matching the credentials
    const sqlQuery = `
    SELECT *
    FROM users
    WHERE username = ? AND password = ?;
    `;

    // Execute SQL query and save in variable
    const user = await dal.execute(sqlQuery, [creds.username, creds.password]);

    // If user not found throw an error that password doesn't match username
    if (!user[0]) throw new AuthenticationErrorModel(`Password is wrong for username ${creds.username}`);

    // Generate and send token
    return cyber.getNewToken(user[0]);
}

// Function to check if a username exists in users database
async function checkUsernameExists(username: string):Promise<boolean> {
    const sqlQuery = "SELECT COUNT(*) AS userCount FROM users WHERE username = ?;"

    // Execute SQL query and save in variable
    const result = await dal.execute(sqlQuery, [username]);
    // Extract user count
    const userCount = result[0].userCount;

    return (userCount > 0)
}

// Function to check if an email exists in users database
async function checkEmailExists(email: string):Promise<boolean> {
    const sqlQuery = "SELECT COUNT(*) AS emailCount FROM users WHERE email = ?;"

    // Execute SQL query and save in variable
    const result = await dal.execute(sqlQuery, [email]);
    // Extract user count
    const emailCount = result[0].emailCount;

    return (emailCount > 0)
}

export default {
    register,
    login
}