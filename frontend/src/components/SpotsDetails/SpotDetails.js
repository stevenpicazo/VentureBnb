import React, { useEffect, useState } from "react";
import { thunkGetSpotById } from "../../store/spots";
import './SpotDetails.css'
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
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


    const sessionUser = useSelector(state => state.session.user);
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])
    // const spot = Object.values(spotObj)
    console.log('spot', spot)
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

    const reviewRefresh = async (e) => {
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


    return (
        <div className="spot-details-container">

            <div>
                <h2 className="spot-title">{spot.name}</h2>
                <div className="reviews-location">
                    {!spot.numReviews ? 'No Reviews' : `★${spot.avgStarRating} · ${spot.numReviews} reviews`} · {spot.city}, {spot.state}, {spot.country}
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
                        <i class="fa-regular fa-calendar"></i>Self check-in

                    </div>
                    <span className="check-in-info">Check in yourself through key pad.</span>
                    <div className="super-host">
                        <i class="fa-regular fa-circle-user"></i>
                        {spot.Owner.firstName} is a Superhost
                    </div>
                    <span className="super-host-info">
                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                    </span>

                    <div className="work-space">
                        <i class="fa-regular fa-pen-to-square"></i>Designated work space
                    </div>
                </div>

                <div className="avgReviews-numReviews">
                    <div>⭑{spot.avgStarRating} · {spot.numReviews} reviews</div>
                </div>
                <div className="reviews-list">
                    {/* <h2>Reviews</h2> */}
                    {reviewsObj && Object.values(reviewsObj).map(review => (
                        sessionUser && (
                            <div className={"reviewInfo"} key={`review-${review.id}`}>
                                {/* {console.log('review -->', review)} */}
                                <div>{review.User.firstName} ★{review.stars} </div>
                                {sessionUser.id === review.userId && (
                                    <button
                                        className="delete-review-button"
                                        onClick={(e) => deleteReview(e, review.id)}>
                                        Delete
                                    </button>
                                )}
                            </div>
                        )))}
                    <div>
                        {sessionUser && !booleanFlag && sessionUser.id !== spot.ownerId &&
                            <button onClick={() => setIsFormOpen(!isFormOpen)}>Create Review</button>}
                        {isFormOpen && sessionUser?.id !== spot.ownerId && booleanFlag === false ? (
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
                                        id='reviews'
                                        type='text'
                                        onChange={e => setReview(e.target.value)}
                                        value={review}
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
                            </form>) : (
                            (null))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotDetails;