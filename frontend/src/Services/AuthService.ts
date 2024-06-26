import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/Config";
import { AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {
    // Function to register new user
    public async register(user:UserModel):Promise<void> {
        // Register user in database using API call to backend
        const response = await axios.post<string>(appConfig.registerUrl, user);
        // Send token recieved from backend to redux store
        authStore.dispatch({type:AuthActionType.Register, payload:response.data});
    }

    // Function to login user
    public async login(creds:CredentialsModel):Promise<void> {
        // Login user using API call to backend
        const response = await axios.post<string>(appConfig.loginUrl, creds);
        // Send token recieved from backend to redux store
        authStore.dispatch({type:AuthActionType.Login, payload:response.data});
    }

    // Function to logout user
    public logout():void {
        // Request logout to redux store
        authStore.dispatch({type:AuthActionType.Logout});
    }
}

const authService = new AuthService(); // Singleton

export default authService;