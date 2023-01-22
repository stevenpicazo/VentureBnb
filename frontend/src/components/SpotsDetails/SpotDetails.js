import React, { useEffect, useState } from "react";
import { thunkGetSpotById } from "../../store/spots";
import './SpotDetails.css'
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { reviewBySpotIdThunk } from "../../store/reviews";
import * as reviewsActions from "../../store/reviews";

function SpotDetails() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validationErrors, setValidationErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { spotId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => state.spots[spotId])

    const reviewsObj = useSelector((state) => state.reviews)
    const reviewArr = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(thunkGetSpotById(spotId))
            .then(() => {
                setIsLoaded(true)
                dispatch(reviewBySpotIdThunk(spotId))
            }).catch(async (res) => {
                const spotData = await res.json()
                if (spotData && spotData.validationErrors) setValidationErrors(spotData.validationErrors);
            })
    }, [dispatch, hasSubmitted])

    const reviewRefresh = async () => {
        await dispatch[reviewsActions.actionLoadReview(spotId)]
    }

    if (!isLoaded) {
        return null
    }

    const deleteReview = async (e, reviewId) => {
        e.preventDefault()
        await dispatch(reviewsActions.deleteThunk(reviewId))
        setHasSubmitted(!hasSubmitted)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        return dispatch(
            reviewsActions.createThunk(
                { review, stars },
                spotId))
            .then(() => {
                setHasSubmitted(!hasSubmitted)
            })
            .catch(async (res) => {
                const data = await res.json()
                if (data.validationErrors) {
                    setValidationErrors(data.validationErrors);
                }
            })
    }

    let booleanFlag = false
    if (reviewArr.length && sessionUser) {
        for (let review of reviewArr) {
            if (review.userId === sessionUser.id) booleanFlag = true
        }
    }

    if (handleSubmit) reviewRefresh()

    const rating = parseFloat(spot.avgStarRating).toFixed(2)

    return (
        <div className="spot-details-container">

            <div>
                <h2 className="spot-title">{spot.name}</h2>
                <div className="reviews-location">
                    {!spot.numReviews ? 'No Reviews' : `★ ${rating} · ${spot.numReviews} reviews`} · {spot.city}, {spot.state}, {spot.country}
                </div>

                {spot.SpotImages.map(image => (
                    <img src={image.url} className="spot-details-img" key={`image-${image.id}`} />
                ))}

                <div className="listing-info-container">
                    <div className="hosting-info">
                        Entire home hosted by {spot.Owner.firstName}
                    </div>
                    <div className="listing-info">
                        6 guests · 4 bedrooms · 7 beds · 2 baths
                    </div>
                </div>
                {/* <i class="fa-regular fa-calendar"></i> */}
                <div className="hosting-info-container">
                    <div className="check-in">
                        <i className="fa-regular fa-calendar"></i>Self check-in

                    </div>
                    <span className="check-in-info">Check in yourself through key pad.</span>
                    <div className="super-host">
                        <i className="fa-regular fa-circle-user"></i>
                        {spot.Owner.firstName} is a Superhost
                    </div>
                    <span className="super-host-info">
                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                    </span>

                    <div className="work-space">
                        <i className="fa-regular fa-pen-to-square"></i>Designated work space
                    </div>
                </div>

                <div className="num-reviews">
                    {!spot.numReviews ? 'No Reviews' : `★ ${rating} · ${spot.numReviews} reviews`}

                </div>
                <div className="reviews-list">
                    <>
                    <div className="user-reviews-container">
                        {reviewsObj && Object.values(reviewsObj).map(review => (
                            <div>
                                <div className="user-ratings">
                                    <i className="fa-regular fa-circle-user"></i>
                                    {review.User.firstName}
                                </div>
                                <div className="user-reviews">
                                    {review.review}
                                </div>
                            </div>

                        ))}
                        </div>
                        {reviewsObj && Object.values(reviewsObj).map(review => (
                            sessionUser && (
                                <div review={review} className={"reviewInfo"} key={`review-${review.id}`}>
                                    {sessionUser.id === review.userId && (
                                        <button
                                            className="delete-review-button"
                                            onClick={(e) => deleteReview(e, review.id)}>
                                            Delete review
                                        </button>
                                    )}
                                </div>
                            )))}
                    </>
                    <div>

                        <div>
                            {sessionUser && !booleanFlag && sessionUser.id !== spot.ownerId ?
                                <>
                                    <button
                                        className="create-review-button"
                                        onClick={() => { setIsFormOpen(!isFormOpen) }}>
                                        Create Review
                                    </button>

                                </>
                                : null

                            }
                        </div>

                        {isFormOpen && sessionUser?.id !== spot.ownerId && booleanFlag === false ? (
                            <>

                                <form className="reviews-form" onSubmit={handleSubmit}>
                                    {isSubmitted && (
                                        <ul className="errors">
                                            {validationErrors.map(error => (
                                                <>
                                                    <li key={error}>{error}</li>
                                                </>

                                            ))}
                                        </ul>
                                    )}
                                    <div>
                                        <label htmlFor='reviews'>Review:</label>
                                        <input
                                            className='reviews'
                                            type='text'
                                            onChange={e => setReview(e.target.value)}
                                            value={review}
                                            placeholder='Share your thoughts about your stay!'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='stars'>Stars:</label>
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
                                    <button className='submit-review-button'>Submit</button>
                                </form>
                            </>
                        ) : (
                            (null))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SpotDetails;