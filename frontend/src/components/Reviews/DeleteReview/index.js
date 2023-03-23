import { useDispatch, useSelector } from "react-redux";
import * as reviewsActions from "../../../store/reviews";

const DeleteReview = ({review, hasSubmitted, setHasSubmitted}) => {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    
    const deleteReview = async (e, reviewId) => {
        e.preventDefault()
        await dispatch(reviewsActions.deleteThunk(reviewId))
        setHasSubmitted(!hasSubmitted)
    }

    return (
        <>
            {sessionUser.id === review.userId && (
                <button
                    className="delete-review-button"
                    onClick={(e) => deleteReview(e, review.id)}>
                    Delete review
                </button>
            )}
        </>
    )
}

export default DeleteReview;