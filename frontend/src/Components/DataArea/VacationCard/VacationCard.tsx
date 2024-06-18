import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/Config";
import GetRole from "../../../Utils/AuthCheck";
import RoleModel from "../../../Models/RoleModel";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const navigate = useNavigate();

    async function deleteVacation(vacationID:number) {
        try {
            await vacationService.deleteVacation(vacationID);
            notify.successMsg("Vacation successfully deleted!");
        } catch (error:any) {
            notify.errorMsg(error);
        }
        window.location.reload();
    }

    const role = GetRole();

    return (
        <div className="VacationCard Card">
			<h4>{props.vacation.destination}</h4>
            <p>{new Date(props.vacation.startDate).toLocaleDateString()} → {new Date(props.vacation.endDate).toLocaleDateString()}</p>
            <p>${props.vacation.price}</p>
            <NavLink to={"/vacations/details/" + props.vacation.vacationID}>
                <div className="card-picframe">
                    <img src={appConfig.vacationsUrl + "images/" + props.vacation.imageName} alt={"Picture of " + props.vacation.destination} title={"Picture of " + props.vacation.destination}/>
                </div>
            </NavLink>
            <br />
            {/* Buttons to edit and delete vacations - FOR ADMIN ONLY */}
            {role === RoleModel.Admin && (
            <>
                <button onClick={() => navigate("/vacations/edit/" + props.vacation.vacationID)}>✎ Edit</button>
                <button onClick={() => deleteVacation(props.vacation.vacationID)}>✗ Delete</button>
            </>
            )}
        </div>
    );
}

export default VacationCard;
