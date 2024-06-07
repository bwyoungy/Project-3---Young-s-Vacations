import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { NavLink } from "react-router-dom";

function VacationsList(): JSX.Element {
    
    const[vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(()=>{
        vacationService.getAllVacations()
        .then(vacations => setVacations(vacations))
        .catch(err => notify.errorMsg(err));
    },[vacations])

    return (
        <div className="VacationsList">
			<h2>Vacations</h2>

            {/* Link and button to add vacation - FOR MANAGER ONLY */}
            <NavLink to="/vacations/add">
                <button>Add Vacation</button>
            </NavLink>
            <br />

            {/* For each vacation show the vacation in a VacationCard component */}
            {vacations.map(v => <VacationCard key={v.vacationID} vacation={v}/>)}
        </div>
    );
}

export default VacationsList;
