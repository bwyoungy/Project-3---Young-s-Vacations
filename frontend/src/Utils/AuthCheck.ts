import { useEffect, useState } from "react";
import { authStore } from "../Redux/AuthState";

// Function to get the role of the current user
function GetRole(): string {
    const[role, setRole] = useState<string>("");

    useEffect(()=>{
        const updateRole = () => {
            // Update user as current user from authStore
            const user = authStore.getState().user;
            // If user exists set role
            if (user) setRole(user.role);
            // Otherwise set as empty role
            else setRole("");
        };

        updateRole();
        // Subscribe to authStore updates
        const unsubscribe = authStore.subscribe(updateRole);
    
        // Clean up subscription
        return () => unsubscribe();
    },[]);

    return role;
}

export default GetRole;