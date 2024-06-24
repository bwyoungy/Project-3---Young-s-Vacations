import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import VacationsList from "../../DataArea/VacationsList/VacationsList";
import AddVacation from "../../DataArea/AddVacation/AddVacation";
import VacationDetails from "../../DataArea/VacationDetails/VacationDetails";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Report from "../../DataArea/Report/Report";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                {/* Register */}
                <Route path="/register" element={<Register/>}/>

                {/* Login */}
                <Route path="/login" element={<Login/>}/>

                {/* Logout */}
                <Route path="/logout" element={<Logout/>}/>
                
                {/* Home */}
                <Route path="/home" element={<Home/>}/>

                {/* Vacations */}
                <Route path="/vacations" element={<VacationsList/>}/>

                {/* Vacation Details */}
                <Route path="/vacations/details/:vacationID" element={<VacationDetails/>}/>

                {/* Add Vacation */}
                <Route path="/vacations/add" element={<AddVacation/>}/>

                {/* Edit Vacation */}
                <Route path="/vacations/edit/:vacationID" element={<EditVacation/>}/>

                {/* Report */}
                <Route path="/report" element={<Report/>}/>

                {/* Set default page */}
                <Route path="/" element={<Navigate to="/home"/>}/>

                {/* Set error page */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
