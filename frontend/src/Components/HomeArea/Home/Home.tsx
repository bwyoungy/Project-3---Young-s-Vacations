import { useEffect, useState } from "react";
import "./Home.css";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";
import VacationCard from "../../DataArea/VacationCard/VacationCard";

function Home(): JSX.Element {

    const[vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacationService.getPopularVacations(3)
        .then(vacations => setVacations(vacations))
        .catch(err => notify.errorMsg(err));
    },[])

    return (
        <div className="Home">
			<h1>Welcome to Young's Vacations!</h1>
            <h2>The travelling sensation gripping the nation!</h2>
            <p>Use this lovely website to check out all the great up and coming vacations!</p>
            <p>For each vacation you can see it's destination, description, image, price, dates, and followers</p>
            <p>Follow your favourite vacations!</p>
            
            <h3>Our popular vacations:</h3>
            {/* For each vacation show the vacation in a VacationCard component */}
            {vacations.map(v => <VacationCard key={v.vacationID} vacation={v}/>)}
        </div>
    );
}

export default Home;
