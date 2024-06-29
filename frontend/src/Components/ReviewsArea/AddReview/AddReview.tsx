import { NavLink, useNavigate, useParams } from "react-router-dom";
import GetRole from "../../../Utils/AuthCheck";
import "./AddReview.css";
import { useForm } from "react-hook-form";
import ReviewModel from "../../../Models/ReviewModel";
import notify from "../../../Services/NotifyService";
import reviewService from "../../../Services/ReviewsService";
import { authStore } from "../../../Redux/AuthState";
import { useState } from "react";
import {FaStar} from "react-icons/fa"

function AddReview(): JSX.Element {

    const params = useParams();
    const {register, handleSubmit, formState} = useForm<ReviewModel>();
    const navigate = useNavigate();
    const [rating, setRating] = useState<number>(null);
    const [hoverRating, setHoverRating] = useState<number>(null);

    async function send(review:ReviewModel) {
        try {
            review.vacationID = +params.vacationID;
            review.username = authStore.getState().user.username;
            review.rating = rating ?? 0;
            await reviewService.addReview(review);
            notify.successMsg("Review added successfully!");
            // Navigate back to vacation user reviewed
            navigate("/vacations/details/" + review.vacationID);
        } catch (error:any) {
            notify.errorMsg(error);
        }
    }

    const stars = [1, 2, 3, 4, 5].map(star => {
        let icon = <FaStar size={32} style={{color:"gold"}}/>;
        if (star > (hoverRating ?? rating ?? 0)) icon = <FaStar style={{opacity:0.5, fontSize:"2em",color:"gold"}}/>
        return (<span key={star} onMouseEnter={()=>setHoverRating(star)} onMouseLeave={()=>setHoverRating(null)} onClick={()=>setRating(star)}>{icon}</span>);
    });

    return (
        <div className="AddReview">
			{/* Check if user is logged in */}
            {!GetRole() ?
            // Display for logged out (guest)
            <>
                <h2>Only registered users can add reviews. You can <NavLink to="/login">login here</NavLink>.</h2>
            </>
            :
            // Display for logged in
            <>
                <form onSubmit={handleSubmit(send)}>
                    <h2>Add Review</h2>

                    <label>Rating: </label>
                    <div className="stars-rating">{stars}</div>

                    <label>Review: </label>
                    <input type="text" {...register("content", ReviewModel.contentValidation)}/>
                    <p className="error">{formState.errors.content?.message}</p>

                    <button disabled={!rating}>Add Review</button>
                </form>
            </>
            }
        </div>
    );
}

export default AddReview;
