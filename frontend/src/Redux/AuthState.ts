import { jwtDecode } from "jwt-decode";
import UserModel from "../Models/UserModel";
import { createStore } from "redux";

// Global state
export class AuthState {
    public user: UserModel = null;
    public token: string = null;

    public constructor() {
        // Get token from session storage
        this.token = sessionStorage.getItem("token");
        
        // Check if token exists
        if (this.token) {
            // Decode token and extract user
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

    // Select action type
    switch (action.type) {
        case AuthActionType.Register: // Payload is token
        case AuthActionType.Login: // Payload is token
            // Update token in state
            dupState.token = action.payload;
            // Extract user from token and update in state
            const container: {user:UserModel} = jwtDecode(dupState.token);
            dupState.user = container.user;
            // Set token in session storage
            sessionStorage.setItem("token", dupState.token);
            break;
        
        case AuthActionType.Logout: // No payload
            // Remove token and user from state
            dupState.token = null;
            dupState.user = null;
            // Remove token from session storage
            sessionStorage.removeItem("token");
            break;
    }

    return dupState;
}

// Store
export const authStore = createStore(authReducer);