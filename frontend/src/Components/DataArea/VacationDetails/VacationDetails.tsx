import { useParams } from "react-router-dom";
import "./VacationDetails.css";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";

function VacationDetails(): JSX.Element {

    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>(new VacationModel());

    useEffect(()=>{
        vacationService.getVacationById(+(params.vacationID))
        .then(vacation => setVacation(vacation))
        .catch(err => notify.errorMsg(err));
    },[]);

    return (
        <div className="VacationDetails">
			<h2>Vacation Details</h2>
            <h4>{vacation.destination}</h4>
            <p>{new Date(vacation.startDate).toLocaleDateString()} → {new Date(vacation.endDate).toLocaleDateString()}</p>
            <p>{vacation.description}</p>
            <p>${vacation.price}</p>
        </div>
    );
}

export default VacationDetails;
