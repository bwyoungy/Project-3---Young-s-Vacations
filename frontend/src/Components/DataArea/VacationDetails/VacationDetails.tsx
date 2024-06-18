import { useNavigate, useParams } from "react-router-dom";
import "./VacationDetails.css";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";
import appConfig from "../../../Utils/Config";
import GetRole from "../../../Utils/AuthCheck";
import RoleModel from "../../../Models/RoleModel";

function VacationDetails(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>(new VacationModel());

    useEffect(()=>{
        vacationService.getVacationById(+(params.vacationID))
        .then(vacation => setVacation(vacation))
        .catch(err => notify.errorMsg(err));
    },[]);

    async function deleteVacation(vacationID:number) {
        try {
            await vacationService.deleteVacation(vacationID);
            notify.successMsg("Vacation successfully deleted!");
            
        } catch (error:any) {
            notify.errorMsg(error);
        }
        navigate("/vacations");
    }

    const role = GetRole();

    return (
        <div className="VacationDetails">
			<h2>Vacation Details</h2>

            {/* Check if user is logged in */}
            {!role ?
            // Display for logged out (guest)
            <>
                <h3>Only registered users can view details of vacations. You can <NavLink to="/register">register here</NavLink> or if you're already a member <NavLink to="/login">login here</NavLink>.</h3>
            </>
            :
            // Display for logged in user
            <>
            <h4>{vacation.destination}</h4>
            <p>{new Date(vacation.startDate).toLocaleDateString()} → {new Date(vacation.endDate).toLocaleDateString()}</p>
            <div className="det-picframe">
                <img src={appConfig.vacationsUrl + "images/" + vacation.imageName} alt={"Picture of " + vacation.destination} title={"Picture of " + vacation.destination}/>
            </div>
            <p>{vacation.description}</p>
            <p>${vacation.price}</p>

            {/* Buttons to edit and delete vacations - FOR ADMIN ONLY */}
            {role === RoleModel.Admin && (
            <>
                <button onClick={() => navigate("/vacations/edit/" + vacation.vacationID)}>✎ Edit</button>
                <button onClick={() => deleteVacation(vacation.vacationID)}>✗ Delete</button>
            </>
            )}
            <br />
            <NavLink to="/vacations">Return to vacations</NavLink>
            </>
            }
        </div>
    );
}

export default VacationDetails;
