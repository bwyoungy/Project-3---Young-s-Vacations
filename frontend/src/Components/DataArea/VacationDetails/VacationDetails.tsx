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
import ReviewModel from "../../../Models/ReviewModel";
import reviewService from "../../../Services/ReviewsService";
import ReviewCard from "../../ReviewsArea/ReviewCard/ReviewCard";

function VacationDetails(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>(new VacationModel());
    const [reviews, setReviews] = useState<ReviewModel[]>([]);

    useEffect(()=>{
        fetchData();
    },[params.vacationID]);

    // Helper function to fetch data so we can await async and call it from useEffect
    async function fetchData() {
        try {
            const fetchedVacation = await vacationService.getVacationById(+params.vacationID);
            setVacation(fetchedVacation);
            const fetchedReviews = await reviewService.getReviewsByVacation(+params.vacationID);
            // Sort by rating to display better reviews on top
            fetchedReviews.sort((a, b) => b.rating - a.rating);
            setReviews(fetchedReviews);
        } catch (err) {
            notify.errorMsg(err);
        }
    }

    // Function to delete vacation
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
        navigate("/vacations");
    }

    // Function to delete review
    async function deleteReview(id:number) {
    // Display confirmation dialog
    const isConfirmed = window.confirm(`Are you sure you want to delete the review?`);
    // Don't delete if admin clicks "cancel"
    if (!isConfirmed) return;

    try {
        // Delete review from database
        await reviewService.deleteReview(id);
        notify.successMsg("Review successfully deleted!");
        // Delete review from state
        const updatedReviews = reviews.filter(r => r.reviewID !== id);
        setReviews(updatedReviews);
    } catch (error:any) {
        notify.errorMsg(error);
    }
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
            <h3>{vacation.destination}</h3>
            <p>Followers ({vacation.follows.length}): {vacation.follows.length > 0 ? vacation.follows.map(f => f.username).join(", ") : "None"}</p>
            <p>{new Date(vacation.startDate).toLocaleDateString()} → {new Date(vacation.endDate).toLocaleDateString()}</p>
            <div className="det-picframe">
                <img src={appConfig.vacationsUrl + "images/" + vacation.imageName} alt={"Picture of " + vacation.destination} title={"Picture of " + vacation.destination}/>
            </div>
            <p>{vacation.description}</p>
            <p>${vacation.price}</p>

            <h4>Reviews</h4>
            {/* For each review show the review in a ReviewCard component */}
            {reviews.map(r => <ReviewCard key={r.reviewID} review={r} onDelete={() => deleteReview(r.reviewID)}/>)}
            {/* Option to add a review open to users & admins */}
            <p>Have you been at this destination? Please help us and your friends by <NavLink to={`/review/${vacation.vacationID}`}>adding a review</NavLink></p>

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
