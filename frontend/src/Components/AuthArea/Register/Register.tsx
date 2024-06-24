import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { NavLink, useNavigate } from "react-router-dom";
import notify from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import GetRole from "../../../Utils/AuthCheck";

function Register(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user:UserModel) {
        try {
            await authService.register(user);
            notify.successMsg(`${user.username} registered successfully!`);
            navigate("/home");
        } catch (error:any) {
            notify.errorMsg(error);
        }
    }

    return (
        <div className="Register">
            {/* Check if user is logged in */}
            {GetRole() ? 
            // Display for logged in
            <>
                <h2>You are logged in!</h2>
                <h3>To register a new user you have to first <NavLink to="/logout">log out</NavLink> or you can view <NavLink to="/vacations">vacations here</NavLink>.</h3>
            </>
            :
            // Display for logged out (guest)
            <>
                <form onSubmit={handleSubmit(send)}>
                    <h2>Register new user</h2>

                    <label>First Name:</label>
                    <input type="text" {...register("firstName", UserModel.firstNameValidation)}/>
                    <p className="error">{formState.errors.firstName?.message}</p>

                    <label>Last Name:</label>
                    <input type="text" {...register("lastName", UserModel.lastNameValidation)}/>
                    <p className="error">{formState.errors.lastName?.message}</p>

                    <label>Email:</label>
                    <input type="email" {...register("email", UserModel.emailValidation)}/>
                    <p className="error">{formState.errors.email?.message}</p>

                    <label>Username:</label>
                    <input type="text" {...register("username", UserModel.usernameValidation)}/>
                    <p className="error">{formState.errors.username?.message}</p>

                    <label>Password:</label>
                    <input type="password" {...register("password", UserModel.passwordValidation)}/>
                    <p className="error">{formState.errors.password?.message}</p>

                    <button>Register</button>

                    <p>If you're already a user, you can <NavLink to="/login">login here</NavLink></p>
                </form>
            </>
            }
        </div>
    );
}

export default Register;
