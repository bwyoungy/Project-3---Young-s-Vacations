import { ChangeEvent, useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { NavLink } from "react-router-dom";
import GetRole from "../../../Utils/AuthCheck";
import { authStore } from "../../../Redux/AuthState";
import RoleModel from "../../../Models/RoleModel";

function VacationsList(): JSX.Element {
    
    const[vacations, setVacations] = useState<VacationModel[]>([]);
    const[filter, setFilter] = useState<string>("all");

    useEffect(()=>{
        vacationService.getAllVacations()
        .then(vacations => setVacations(vacations))
        .catch(err => notify.errorMsg(err));
    },[])

    const role = GetRole();
    const currUser = authStore.getState().user;

    const handleSelectChange = async (event:ChangeEvent<HTMLSelectElement>) => {
        // Store current filter selected
        const currFilter = event.target.value;

        try {
            // Fetch all vacations from backend
            const allVacations = await vacationService.getAllVacations();
            
            // Sort vacations by start date
            allVacations.sort((a, b) => 
                (new Date(a.startDate).getDate() + (new Date(a.startDate).getMonth()+1)*100 + new Date(a.startDate).getFullYear()*10000) 
            - (new Date(b.startDate).getDate() + (new Date(b.startDate).getMonth()+1)*100 + new Date(b.startDate).getFullYear()*10000))
        
            // Select filter case based on user's choice
            switch (currFilter) {
                case "follows":
                    setVacations(allVacations.filter(v => v.follows.some(f => f.username === currUser.username)));
                    break;
                case "future":
                    setVacations(allVacations.filter(v => new Date(v.startDate) > new Date()));
                    break;
                case "ongoing":
                    setVacations(allVacations.filter(v => new Date(v.startDate) < new Date() && new Date(v.endDate) > new Date()));
                    break;
                case "all":
                default:
                    setVacations(allVacations);
                    break;
            }
            setFilter(currFilter);
        } catch (err) {
            notify.errorMsg(err);
        }
    }

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
            {/* Filter option */}
            <label>Filter vacations:</label>
            <select value={filter} onChange={handleSelectChange}>
                <option value="all" selected>Show all</option>
                {/* Filtering by follows relevant only for user, since admin can't follow vacations */}
                {role === RoleModel.User && (
                <option value="follows">{currUser.username}'s follows</option>
                )}
                <option value="future">Future vacations</option>
                <option value="ongoing">Ongoing vacations</option>
            </select>
            <br />
            {/* For each vacation show the vacation in a VacationCard component */}
            {vacations.map(v => <VacationCard key={v.vacationID} vacation={v}/>)}
            </>
            }
        </div>
    );
}

export default VacationsList;
