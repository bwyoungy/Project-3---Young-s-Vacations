import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { NavLink } from "react-router-dom";
import GetRole from "../../../Utils/AuthCheck";

function VacationsList(): JSX.Element {
    
    const[vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(()=>{
        vacationService.getAllVacations()
        .then(vacations => setVacations(vacations))
        .catch(err => notify.errorMsg(err));
    },[vacations])

    const role = GetRole();

    return (
        <div className="VacationsList">
			<h2>Vacations</h2>

            {/* Check if user is logged in */}
            {!role ?
            // Display for logged out (guest)
            <>
                <h3>Only registered users can view vacations. You can <NavLink to="/register">register here</NavLink> or if you're already a member <NavLink to="/login">login here</NavLink>.</h3>
            </>
            :
            // Display for logged in user
            <>
            {/* For each vacation show the vacation in a VacationCard component */}
            {vacations.map(v => <VacationCard key={v.vacationID} vacation={v}/>)}
            </>
            }
        </div>
    );
}

export default VacationsList;
