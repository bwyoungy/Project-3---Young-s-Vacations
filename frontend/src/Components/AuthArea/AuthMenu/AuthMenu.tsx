import { useEffect, useState } from "react";
import "./AuthMenu.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";

function AuthMenu(): JSX.Element {

    const[user, setUser] = useState<UserModel>();

    useEffect(() => {
        // Update user state with current user from authStore
        setUser(authStore.getState().user);
    
        // Subscribe to authStore updates
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
    
        // Clean up subscription
        return () => unsubscribe();
    }, []);

    return (
        <div className="AuthMenu">
			{/* Check if user is logged in */}
            
            {!user ?
            // Display for logged out (guest)
            <>
                <span>Hello Guest | </span>
                <NavLink to="/login">Login</NavLink>
                <span> | </span>
                <NavLink to="/register">Register</NavLink>
            </>
            :
            // Display for logged in user
            <>
                <span>Hello {user.firstName} {user.lastName} | </span>
                <NavLink to="/logout">Logout</NavLink>
            </>
            }
        </div>
    );
}

export default AuthMenu;
