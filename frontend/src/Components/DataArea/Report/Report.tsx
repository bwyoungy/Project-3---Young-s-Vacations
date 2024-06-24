import { NavLink } from "react-router-dom";
import GetRole from "../../../Utils/AuthCheck";
import "./Report.css";
import RoleModel from "../../../Models/RoleModel";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart, LinearScale } from "chart.js";

function Report(): JSX.Element {
    const[vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(()=>{
        vacationService.getAllVacations()
        .then(vacations => setVacations(vacations))
        .catch(err => notify.errorMsg(err));
    },[vacations])

    const role = GetRole();
    
    // Define data for chart
    Chart.register(LinearScale);
    Chart.register(CategoryScale);
    Chart.register(BarElement)
    const destinations = vacations.map(v => v.destination);
    const followers = vacations.map(v => v.follows.length);
    const data = {
        labels: destinations,
        datasets: [
            {
                label: "Amount of followers",
                data: followers,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {beginAtZero: true, ticks: {precision: 0}, title: {display: true, text: "Amount of followers"}},
            x: {title: {display: true, text: "Destinations"}}
        },
        plugins: {legend: {display: false}}
    };

    return (
        <div className="Report">
            {/* Display for logged out guest */}
            {!role && (
            <>
                <h2>Only admins can view the vacations report. You can <NavLink to="/login">login here</NavLink>.</h2>
            </>
            )}

            {/* Display for regular user */}
            {role === RoleModel.User && (
            <>
                <h2>Only admins can view the vacations report. You can <NavLink to="/vacations">view vacations here</NavLink>.</h2>
            </>
            )}

            {/* Display for admin */}
            {role === RoleModel.Admin && (
            <>
                <div className="chart-container" style={{ height: '400px', width: '80%', margin: 'auto' }}>
                    <Bar data={data} options={options}/>
                </div>
            </>
            )}
        </div>
    );
}

export default Report;
