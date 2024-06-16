import { useNavigate, useParams } from "react-router-dom";
import "./VacationDetails.css";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";
import appConfig from "../../../Utils/Config";

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
            
        } catch (err:any) {
            notify.errorMsg(err);
        }
        navigate("/vacations");
    }

    return (
        <div className="VacationDetails">
			<h2>Vacation Details</h2>
            <h4>{vacation.destination}</h4>
            <p>{new Date(vacation.startDate).toLocaleDateString()} → {new Date(vacation.endDate).toLocaleDateString()}</p>
            <div className="det-picframe">
                <img src={appConfig.vacationsUrl + "images/" + vacation.imageName} alt={"Picture of " + vacation.destination}/>
            </div>
            <p>{vacation.description}</p>
            <p>${vacation.price}</p>

            {/* Button to link to editing of vacation - FOR ADMIN ONLY */}
            <button onClick={() => navigate("/vacations/edit/" + vacation.vacationID)}>✎ Edit</button>
            {/* Button to delete vacation - FOR ADMIN ONLY */}
            <button onClick={() => deleteVacation(vacation.vacationID)}>✗ Delete</button>
            <br />
            <NavLink to="/vacations">Return to vacations</NavLink>
        </div>
    );
}

export default VacationDetails;
