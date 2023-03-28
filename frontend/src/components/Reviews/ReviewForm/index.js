
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import * as reviewsActions from "../../../store/reviews";


const ReviewForm = ({ spot, spotId, hasSubmitted, setHasSubmitted }) => {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        return dispatch(
            reviewsActions.createThunk(
                { review, stars },
                spotId))
            .then(() => {
                closeModal()
                setHasSubmitted(!hasSubmitted)
            })
            .then(() => {
                setStars('')
                setReview('')
                closeModal()
            })
            .catch(async (res) => {
                const data = await res.json()
                if (data.errors) {
                    setValidationErrors(data.errors);
                }
            })
    }

    return (
        <div className="review-modal-container">
            <div className="review-title">Tell us about your stay!</div>
                <form className="reviews-form" onSubmit={handleSubmit}>
                    <ul className="ul-errors">
                        {validationErrors.map(error => (
                            <div
                                className="errors"
                                key={error}>{error}
                            </div>
                        ))}
                    </ul>
                    <div className="reviews-info-container">
                        <textarea
                            className='reviews'
                            type='text'
                            onChange={e => setReview(e.target.value)}
                            value={review}
                            placeholder='Share your thoughts about your stay!'
                            required
                        />
                        <input
                            className='stars'
                            type='number'
                            min={1}
                            max={5}
                            onChange={e => setStars(e.target.value)}
                            value={stars}
                            placeholder='Rate your stay!'
                            required
                        />
                    </div>
                    <div className="review-button-container">
                        <button className='submit-review-button'>Submit</button>
                    </div>
                </form>
        </div>
    )
}

export default ReviewForm;