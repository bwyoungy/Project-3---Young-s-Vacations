import { NavLink, useNavigate, useParams } from "react-router-dom";
import GetRole from "../../../Utils/AuthCheck";
import "./AddReview.css";
import { useForm } from "react-hook-form";
import ReviewModel from "../../../Models/ReviewModel";
import notify from "../../../Services/NotifyService";
import reviewService from "../../../Services/ReviewsService";
import { authStore } from "../../../Redux/AuthState";

function AddReview(): JSX.Element {

    const params = useParams();
    const {register, handleSubmit, formState} = useForm<ReviewModel>();
    const navigate = useNavigate();

    async function send(review:ReviewModel) {
        try {
            review.vacationID = +params.vacationID;
            review.username = authStore.getState().user.username;
            await reviewService.addReview(review);
            notify.successMsg("Review added successfully!");
            // Navigate back to vacation user reviewed
            navigate("/vacations/details/" + review.vacationID);
        } catch (error:any) {
            notify.errorMsg(error);
        }
    }

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
                    <input type="number" min={1} max={5} {...register("rating", ReviewModel.ratingValidation)}/>
                    <p className="error">{formState.errors.rating?.message}</p>

                    <label>Review: </label>
                    <input type="text" {...register("content", ReviewModel.contentValidation)}/>
                    <p className="error">{formState.errors.content?.message}</p>

                    <button>Add Review</button>
                </form>
            </>
            }
        </div>
    );
}

export default AddReview;
