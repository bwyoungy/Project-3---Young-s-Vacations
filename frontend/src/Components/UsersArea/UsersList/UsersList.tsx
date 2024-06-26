import { NavLink } from "react-router-dom";
import RoleModel from "../../../Models/RoleModel";
import GetRole from "../../../Utils/AuthCheck";
import "./UsersList.css";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import userService from "../../../Services/UsersService";
import notify from "../../../Services/NotifyService";

function UsersList(): JSX.Element {
    const[users, setUsers] = useState<UserModel[]>([]);

    useEffect(()=>{
        userService.getAllUsers()
        .then(users => setUsers(users))
        .catch(err => notify.errorMsg(err));
    },[users])

    const role = GetRole();

    async function deleteUser(username:string) {
        // Display confirmation dialog
        const isConfirmed = window.confirm(`Are you sure you want to delete the user ${username}?`);
        // Don't delete if admin clicks "cancel"
        if (!isConfirmed) return;

        try {
            await userService.deleteUser(username);
            notify.successMsg("User successfully deleted!");
        } catch (error:any) {
            notify.errorMsg(error);
        }

        const updatedUsers = await userService.getAllUsers();
        setUsers(updatedUsers);
    }

    async function promoteUser(username:string) {
        // Display confirmation dialog
        const isConfirmed = window.confirm(`Are you sure you want to promote ${username}? Please note all of their follows will be deleted.`);
        // Don't delete if admin clicks "cancel"
        if (!isConfirmed) return;

        try {
            await userService.promoteUser(username);
            notify.successMsg(`${username} was promoted to admin`)
        } catch (error:any) {
            notify.errorMsg(error);
        }

        const updatedUsers = await userService.getAllUsers();
        setUsers(updatedUsers);
    }

    async function demoteUser(username:string) {
        // Display confirmation dialog
        const isConfirmed = window.confirm(`Are you sure you want to demote ${username}?`);
        // Don't delete if admin clicks "cancel"
        if (!isConfirmed) return;

        try {
            await userService.demoteUser(username);
            notify.successMsg(`${username} was demoted from admin role`)
        } catch (error:any) {
            notify.errorMsg(error);
        }

        const updatedUsers = await userService.getAllUsers();
        setUsers(updatedUsers);
    }

    return (
        <div className="UsersList">
			{/* Display for logged out guest */}
            {!role && (
            <>
                <h2>Only admins can manage users. You can <NavLink to="/login">login here</NavLink>.</h2>
            </>
            )}
            
            {/* Display for regular user */}
            {role === RoleModel.User && (
            <>
                <h2>Only admins can manage users. You can <NavLink to="/vacations">view vacations here</NavLink>.</h2>
            </>
            )}

            {/* Display for admin */}
            {role === RoleModel.Admin && (
            <>
                <h1>Users management</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u =>
                        <tr key={u.username}>
                            <td>{u.username} <button onClick={() => deleteUser(u.username)}>✗ Delete</button></td>
                            <td>{u.email}</td>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.role} {u.role === RoleModel.User ? <button onClick={() => promoteUser(u.username)}>🡅 Promote</button> : <button onClick={() => demoteUser(u.username)}>🡇 Demote</button>}</td>
                        </tr>)}
                    </tbody>
                </table>
            </>
            )}/
        </div>
    );
}

export default UsersList;
