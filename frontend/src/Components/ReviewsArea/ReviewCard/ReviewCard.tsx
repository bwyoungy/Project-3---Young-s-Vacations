import ReviewModel from "../../../Models/ReviewModel";
import RoleModel from "../../../Models/RoleModel";
import GetRole from "../../../Utils/AuthCheck";
import "./ReviewCard.css";

interface ReviewCardProps {
    review: ReviewModel;
    onDelete: () => void;
}

// Function to render star icons based on rating
const renderStars = (rating: number): JSX.Element[] => {
    const stars = [];
    const totalStars = 5;
    
    // Add to star array the rating number of filled stars (★)
    for (let i=0;i < rating;i++)
        stars.push(<span key={i} className="review-star">&#9733;</span>); 
    // Add to star array the remaining unfilled stars (☆) to complete to 5 total stars
    for (let i=rating;i<totalStars;i++)
        stars.push(<span key={i} className="review-star">&#9734;</span>);

    return stars;
};

function ReviewCard(props: ReviewCardProps): JSX.Element {
    const {rating, username, content} = props.review;

    async function handleDelete() {
        props.onDelete();
    }

    return (
        <div className="ReviewCard">
            <div className="review-header">
                <span className="review-rating">{renderStars(rating)}</span> 
            </div>
            <p className="review-content">{content}</p>
            <div className="review-user">-- {username}</div>
            {/* Button to delete review - FOR ADMIN ONLY */}
            {GetRole() === RoleModel.Admin && (
            <>
                <div className="delete-review">
                    <button onClick={handleDelete}>✗ Delete</button>
                </div>
            </>
            )}
        </div>
    );
}

export default ReviewCard;
