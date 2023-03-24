import * as reviewsActions from "../../../store/reviews";

const AllReviews = ({ review }) => {

    return (
        <div className="reviews-wrap">
            <div className="user-ratings">
                <i className="fa-regular fa-circle-user"></i>
                {review.User.firstName}
            </div>
            <div className="user-reviews">
                {review.review}
            </div>
        </div>
    )
}

export default AllReviews;