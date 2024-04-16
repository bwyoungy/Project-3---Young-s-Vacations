import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import VacationsList from "../../DataArea/VacationsList/VacationsList";
import AddVacation from "../../DataArea/AddVacation/AddVacation";
import VacationDetails from "../../DataArea/VacationDetails/VacationDetails";
import EditVacation from "../../DataArea/EditVacation/EditVacation";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
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

                {/* Set default page */}
                <Route path="/" element={<Navigate to="/home"/>}/>

                {/* Set error page */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
