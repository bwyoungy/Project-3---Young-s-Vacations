import { jwtDecode } from "jwt-decode";
import UserModel from "../Models/UserModel";
import { createStore } from "redux";

// Global state
export class AuthState {
    public user: UserModel = null;
    public token: string = null;

    public constructor() {
        this.token = sessionStorage.getItem("token");
        
        if (this.token) {
            const container: {user: UserModel} = jwtDecode(this.token);
            this.user = container.user;
        }
    }
}

// Action type
export const AuthActionType = {
    Register: "Register",
    Login: "Login",
    Logout: "Logout"
}

// Action
// Payload is optional since logout doesn't require payload
export interface AuthAction {
    type: string,
    payload?: any
}

// Reducer
export function authReducer(currentState = new AuthState(), action:AuthAction) : AuthState {
    const dupState = {...currentState}; // Copy state by reference

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            dupState.token = action.payload;
            const container: {user:UserModel} = jwtDecode(dupState.token);
            dupState.user = container.user;
            sessionStorage.setItem("token", dupState.token);
            break;
        
        case AuthActionType.Logout:
            dupState.token = null;
            dupState.user = null;
            sessionStorage.removeItem("token");
            break;
    }

    return dupState;
}

// Store
export const authStore = createStore(authReducer);