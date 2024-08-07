import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/Config";
import GetRole from "../../../Utils/AuthCheck";
import RoleModel from "../../../Models/RoleModel";
import followService from "../../../Services/FollowsService";
import { authStore } from "../../../Redux/AuthState";
import FollowModel from "../../../Models/FollowModel";
import reviewService from "../../../Services/ReviewsService";
import { useEffect, useState } from "react";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const navigate = useNavigate();
    const [reviewAvg, setReviewAvg] = useState(null);

    useEffect(()=>{
        reviewService.getReviewAvgByVacation(props.vacation.vacationID)
        .then(reviewAvg => setReviewAvg(reviewAvg))
        .catch(err => notify.errorMsg(err));
    }, []);

    async function deleteVacation(vacationID:number) {
        // Display confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this vacation?");
        // Don't delete if user clicks "cancel"
        if (!isConfirmed) return;

        try {
            await vacationService.deleteVacation(vacationID);
            notify.successMsg("Vacation successfully deleted!");
        } catch (error:any) {
            notify.errorMsg(error);
        }
        window.location.reload();
    }

    async function addFolow(follow:FollowModel) {
        try {
            await followService.addFollow(follow);
            notify.successMsg("Vacation successfully followed!");
        } catch (error:any) {
            notify.errorMsg(error);
        }
        window.location.reload();
    }

    async function unfollow(follow:FollowModel) {
        try {
            await followService.unfollow(follow);
            notify.successMsg("Vacation successfully unfollowed!");
        } catch (error:any) {
            notify.errorMsg(error);
        }
        window.location.reload();
    }

    const role = GetRole();
    const currUser = authStore.getState().user;

    function checkFollows(vacation:VacationModel) : boolean {
        return vacation.follows.some(f => f.username === currUser.username);
    }

    return (
        <div className="VacationCard Card">
            <div className="heart">&#9829;<span className="heart-number">{props.vacation.follows.length}</span></div>
			<div className="star">&#9733;<span className="star-number">{reviewAvg ? reviewAvg : "N/A"}</span></div>
			<h4>{props.vacation.destination}</h4>
            <p>{new Date(props.vacation.startDate).toLocaleDateString()} → {new Date(props.vacation.endDate).toLocaleDateString()}</p>
            <p>${props.vacation.price}</p>
            <NavLink to={"/vacations/details/" + props.vacation.vacationID}>
                <div className="card-picframe">
                    <img src={appConfig.vacationsUrl + "images/" + props.vacation.imageName} alt={"Picture of " + props.vacation.destination} title={"Picture of " + props.vacation.destination}/>
                </div>
            </NavLink>
            <br />
            {/* Buttons to follow/unfollow vacation - FOR USER ONLY */}
            {role === RoleModel.User && (
            <>
                {/* Check if user follows vacation */}
                {checkFollows(props.vacation) ?
                // Display if user follows vacation
                <>
                <button onClick={() => unfollow(props.vacation.follows.find(f => f.username === currUser.username))}>Unfollow</button>
                </>
                :
                // Display if user doesn't follow vacation
                <>
                <button onClick={() => addFolow(new FollowModel(currUser.username, props.vacation.vacationID))}>Follow</button>
                </>
                }
            </>
            )}
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