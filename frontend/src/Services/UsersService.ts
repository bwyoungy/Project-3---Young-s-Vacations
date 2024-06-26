import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/Config";

class UserService {
    public async getAllUsers():Promise<UserModel[]> {
        
            const response = await axios.get<UserModel[]>(appConfig.usersUrl);
            
        return response.data;
    }

    public async deleteUser(username:string): Promise<void> {
        await axios.delete<void>(appConfig.usersUrl + username);
    }

    public async promoteUser(username:string): Promise<void> {
        await axios.patch<void>(appConfig.usersUrl + "promote/" + username);
        
    }

    public async demoteUser(username:string): Promise<void> {
        await axios.patch<void>(appConfig.usersUrl + "demote/" + username);
        
    }
}

const userService = new UserService();

export default userService;