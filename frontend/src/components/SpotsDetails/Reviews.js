import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewsActions from "../../store/reviews";

function Reviews({review}) {
    // const {review} = props
    const history = useHistory()
    const dispatch = useDispatch()
    const [reviews, setReviews] = useState('')
    const [stars, setStars] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const sessionUser = useSelector(state => state.session.user);

    console.log('reviewForm -->', review)
    // const {reviewId} = useParams()
    // const {spotId} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        return dispatch(
            reviewsActions.createThunk(
                { review, stars },
                review.spotId)).then(() => history.push(`/spots/${review.spotId}`))
            .catch(async (res) => {
                const reviewData = await res.json()
                if (reviewData && reviewData.validationErrors) {
                    setValidationErrors(reviewData.validationErrors);
                }
            })
    }

    return (
        <div className='form-container'>

            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    {hasSubmitted && validationErrors.length && (
                        <ul className="errors">
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </ul>
                <div>
                    <label htmlFor='reviews'>Review:</label>
                    <input
                        id='reviews'
                        type='text'
                        onChange={e => setReviews(e.target.value)}
                        value={reviews}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='stars'>Stars:</label>
                    <input
                        id='stars'
                        type='number'
                        min={1}
                        max={5}
                        onChange={e => setStars(e.target.value)}
                        value={stars}
                        required
                    />
                </div>
                <button >Submit</button>
            </form>
        </div>
    );
}

export default Reviews;