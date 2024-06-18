import { useForm } from "react-hook-form";
import "./Login.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import { useNavigate } from "react-router-dom";
import notify from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import GetRole from "../../../Utils/AuthCheck";
import { NavLink } from "react-router-dom";

function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(creds:CredentialsModel) {
        try {
            await authService.login(creds);
            notify.successMsg(`Welcome back to Young's Vacations, ${creds.username}!`);
            navigate("/home");
        } catch (error:any) {
            notify.errorMsg(error);
        }
    }

    return (
        <div className="Login">
            {/* Check if user is logged in */}
            {GetRole() ? 
            // Display for logged in
            <>
                <h2>You are already logged in. You can view <NavLink to="/vacations">vacations here</NavLink>.</h2>
            </>
            :
            // Display for logged out (guest)
            <>
                <form onSubmit={handleSubmit(send)}>
                    <h2>Log in</h2>
                    <label>Username: </label>
                    <input type="text" {...register("username")}/>

                    <label>Password: </label>
                    <input type="password" {...register("password")}/>

                    <button>Login</button>

                    <p>If you don't have an account, you can <NavLink to="/register">register here</NavLink>.</p>
                </form>
            </>
            }
        </div>
    );
}

export default Login;
