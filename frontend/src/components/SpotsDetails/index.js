import React, { useEffect, useState } from "react";
import { thunkGetSpotById } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { reviewBySpotIdThunk } from "../../store/reviews";
import { createBooking } from "../../store/bookings";
import * as reviewsActions from "../../store/reviews";
import './SpotDetails.css'

function SpotDetails() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validationErrors, setValidationErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
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
            .then(() => {
                setStars('')
                setReview('')
            })
            .catch(async (res) => {
                const data = await res.json()
                if (data.errors) {
                    setValidationErrors(data.errors);
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
        <div className="body">
            <div className="spot-details-container">
                <h2 className="spot-title">{spot.name}</h2>
                <div className="reviews-location">
                    {!spot.numReviews ? 'No Reviews' : `★ ${rating} · ${spot.numReviews} reviews`} · {spot.city}, {spot.state}, {spot.country}
                </div>
                <div className="images-wrapper">
                    <div className="image-details-grid">
                        {spot.SpotImages.map((image, i) => {

                            return (
                                !image.preview ? <img src={image.url} alt="image" /> :
                                    <img
                                        className="image-grid-col-2 image-grid-row-2"
                                        src={image.url}
                                        key={`image - ${image.id}`}
                                        alt="image"
                                    />
                            );
                        })}
                    </div>
                </div>

                <div className="description-bookings">

                    <div className="spot-description-container">
                        <div className="info">

                            <div className="listing-info-container">
                                <div className="hosting-info">
                                    Entire home hosted by {spot.Owner.firstName}
                                </div>
                                <div className="hosting-border"></div>
                                <div className="listing-info">
                                    6 guests · 4 bedrooms · 7 beds · 2 baths
                                </div>
                            </div>

                            {/* <i className="fa-regular fa-calendar"></i> */}
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
                            <div className="air-cover-container">
                                <div className="air-cover-title">
                                    <h2 className="cover-air"></h2>
                                </div>
                                <div className="air-cover-desc">
                                    Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                                </div>
                            </div>
                            <div className="spot-description">
                                {spot.description}
                            </div>

                            <div className="offers-container">
                                <div className="offer-column1">
                                    <div className="offer-item">
                                        <div className="offer-description">
                                            <i className="fa-solid fa-utensils"></i>
                                            Fully equipped kitchen
                                        </div>
                                    </div>
                                    <div className="offer-item">
                                        <div className="offer-symbol"></div>
                                        <div className="offer-description">
                                            <i className="fa-solid fa-tv"></i>
                                            TV with standard cable
                                        </div>
                                    </div>
                                    <div className="offer-item">
                                        <div className="offer-symbol"></div>
                                        <div className="offer-description">
                                            <i className="fa-solid fa-car-side"></i>
                                            Free on site parking
                                        </div>
                                    </div>
                                    <div className="offer-item">
                                        <div className="offer-symbol"></div>
                                        <div className="offer-description">
                                            <i className="fa-solid fa-wind"></i>
                                            Air conditioning
                                        </div>
                                    </div>

                                </div>
                                <div className="offer-column2">

                                    <div className="offer-item">
                                        <div className="offer-symbol"></div>
                                        <div className="offer-description">
                                            <i class="fa-solid fa-shower"></i>
                                            Shower
                                        </div>
                                    </div>

                                    <div className="offer-item">
                                        <div className="offer-symbol"></div>
                                        <div className="offer-description">
                                            <i class="fa-solid fa-suitcase-medical"></i>
                                            Medical-suitcase
                                        </div>
                                    </div>
                                    <div className="offer-item">
                                        <div className="offer-symbol"></div>
                                        <div className="offer-description">
                                            <i class="fa-solid fa-soap"></i>
                                            Shampoo
                                        </div>
                                    </div>
                                    <div className="offer-item">
                                        <div className="offer-symbol"></div>
                                        <div className="offer-description">
                                            <i className="fa-solid fa-wifi"></i>
                                            Wifi available
                                        </div>
                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>

                    <section className="bookings-column">
                        {/* <div className="bookings-container"> */}
                        <div className="bookings-container">
                            <div className="bookings">

                                {/* </div> */}
                            </div>
                        </div>

                    </section>

                </div>

                <main className="reviews-wrapper">
                    <div className="num-reviews">
                        {!spot.numReviews ? 'No Reviews' : `★ ${rating} · ${spot.numReviews} reviews`}

                    </div>
                    <>
                        <div className="user-reviews-container">
                            {reviewsObj && Object.values(reviewsObj).map(review => (
                                <div className="reviews-wrap">
                                    {console.log(review)}
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
                </main>


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
                            <ul className="ul-errors">
                                {validationErrors.map(error => (
                                    <div
                                        className="errors"
                                        key={error}>{error}
                                    </div>
                                ))}
                            </ul>
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

        </div >
    )
}

export default SpotDetails;