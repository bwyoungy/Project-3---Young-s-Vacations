import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard Card">
			<h4>{props.vacation.destination}</h4>
            <p>{new Date(props.vacation.startDate).toLocaleDateString()} → {new Date(props.vacation.endDate).toLocaleDateString()}</p>
            <p>{props.vacation.description}</p>
            <p>${props.vacation.price}</p>
        </div>
    );
}

export default VacationCard;
