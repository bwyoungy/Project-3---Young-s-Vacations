import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/Config";

class UserService {
    // Function to get all users
    public async getAllUsers():Promise<UserModel[]> {
        // Get all users from backend using API call
        const response = await axios.get<UserModel[]>(appConfig.usersUrl);
        return response.data;
    }

    // Function to delete user
    public async deleteUser(username:string): Promise<void> {
        // Delete user using API call
        await axios.delete<void>(appConfig.usersUrl + username);
    }

    // Function to promote user to admin
    public async promoteUser(username:string): Promise<void> {
        // Promote user using API call
        await axios.patch<void>(appConfig.usersUrl + "promote/" + username);
        
    }

    // Function to demote user to regular role
    public async demoteUser(username:string): Promise<void> {
        // Demote user using API call
        await axios.patch<void>(appConfig.usersUrl + "demote/" + username);
        
    }
}

const userService = new UserService(); // Singleton

export default userService;