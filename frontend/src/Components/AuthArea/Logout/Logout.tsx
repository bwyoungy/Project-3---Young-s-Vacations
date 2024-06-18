import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useEffect } from "react";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(()=>{
        authService.logout();
        notify.successMsg("Thanks for choosing to travel with Young's Vacations :)");
        navigate("/home");
    },[]);

    return null;
}

export default Logout;
