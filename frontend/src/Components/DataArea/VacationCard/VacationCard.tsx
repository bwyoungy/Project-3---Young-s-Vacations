import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const navigate = useNavigate();

    async function deleteVacation(vacationID:number) {
        try {
            await vacationService.deleteVacation(vacationID);
            notify.successMsg("Vacation successfully deleted!");
        } catch (err:any) {
            notify.errorMsg(err);
        }
        navigate("/vacations");
        window.location.reload();
    }

    return (
        <div className="VacationCard Card">
			<h4>{props.vacation.destination}</h4>
            <p>{new Date(props.vacation.startDate).toLocaleDateString()} → {new Date(props.vacation.endDate).toLocaleDateString()}</p>
            <p>${props.vacation.price}</p>
            <NavLink to={"/vacations/details/" + props.vacation.vacationID}>More details</NavLink>
            <br />
            {/* Button to link to editing of vacation - FOR ADMIN ONLY */}
            <button onClick={() => navigate("/vacations/edit/" + props.vacation.vacationID)}>✎ Edit</button>
            {/* Button to delete vacation - FOR ADMIN ONLY */}
            <button onClick={() => deleteVacation(props.vacation.vacationID)}>✗ Delete</button>
        </div>
    );
}

export default VacationCard;
