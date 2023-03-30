import React, { useEffect, useState } from "react";
import { thunkGetSpotById } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from '../OpenModalButton'
import * as reviewsActions from "../../store/reviews";
import * as bookingsActions from "../../store/bookings"
import './SpotDetails.css'
import AllReviews from "../Reviews/AllReviews";
import DeleteReview from "../Reviews/DeleteReview";
import ReviewForm from "../Reviews/ReviewForm";
import CreateBooking from "../Bookings/CreateBooking";
import EditReview from "../Reviews/EditReview";

function SpotDetails() {
    const dispatch = useDispatch()

    const [validationErrors, setValidationErrors] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selected, setSelected] = useState(new Date());

    const { spotId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => state.spots[spotId])
    console.log('spots', useSelector((state) => state.spots))
    const reviewsObj = useSelector((state) => state.reviews)
    const reviewArr = Object.values(reviewsObj)

    const bookingsObj = useSelector((state) => state.bookings)

    useEffect(() => {
        dispatch(thunkGetSpotById(spotId))
            .then(() => {
                setIsLoaded(true)
                dispatch(reviewsActions.reviewBySpotIdThunk(spotId))
                dispatch(bookingsActions.loadBookings(spotId))
            }).catch(async (res) => {
                const spotData = await res.json()
                if (spotData && spotData.validationErrors) setValidationErrors(spotData.validationErrors);
            })
    }, [dispatch, hasSubmitted, spotId]) 

    if (!isLoaded || !bookingsObj) {
        return (
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
    }

    const rating = parseFloat(spot.avgStarRating).toFixed(2)


    return (
        <div className="body">
            {spot && (
                <div className="spot-details-container">
                    <h2 className="spot-title">{spot.name}</h2>
                    <div className="reviews-location">
                        {!spot.numReviews ? 'No Reviews' : `★ ${rating} · ${spot.numReviews} reviews`} · {spot.city}, {spot.state}, {spot.country}
                    </div>
                    {spot && spot.SpotImages && (
                        <div className="images-wrapper">
                            <div className="image-details-grid">
                                {spot.SpotImages.map((image, idx) => {
                                    return (
                                        !image.preview ? (
                                            <>
                                                <img src={image.url} alt="image" className={`non-preview-img-${idx}`} />
                                            </>
                                        ) : (
                                            <img
                                                className="image-grid-col-2 image-grid-row-2"
                                                src={image?.url}
                                                key={`image - ${image.id}`}
                                                alt="image"
                                            />
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div className="description-bookings">
                        <div className="spot-description-container">
                            <div className="info">

                                <div className="listing-info-container">
                                    <div className="hosting-info">
                                        Entire home hosted by {spot?.Owner?.firstName}
                                    </div>
                                    <div className="hosting-border"></div>
                                    <div className="listing-info">
                                        6 guests · 4 bedrooms · 7 beds · 2 baths
                                    </div>
                                </div>

                                <div className="hosting-info-container">
                                    <div className="check-in">
                                        <i className="fa-regular fa-calendar"></i>Self check-in
                                    </div>
                                    <span className="check-in-info">Check in yourself through key pad.</span>
                                    <div className="super-host">
                                        <i className="fa-regular fa-circle-user"></i>
                                        {spot?.Owner?.firstName} is a Superhost
                                    </div>
                                    <span className="super-host-info">
                                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                                    </span>

                                    <div className="work-space">
                                        <i className="fa-regular fa-pen-to-square info-workspace"></i>Designated work space
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
                                                <i className="fa-solid fa-shower"></i>
                                                Shower
                                            </div>
                                        </div>

                                        <div className="offer-item">
                                            <div className="offer-symbol"></div>
                                            <div className="offer-description">
                                                <i className="fa-solid fa-suitcase-medical"></i>
                                                Medical-suitcase
                                            </div>
                                        </div>
                                        <div className="offer-item">
                                            <div className="offer-symbol"></div>
                                            <div className="offer-description">
                                                <i className="fa-solid fa-soap"></i>
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

                        <CreateBooking spot={spot} spotId={spotId} setHasSubmitted={setHasSubmitted} hasSubmitted={hasSubmitted} isLoaded={isLoaded} setIsLoaded={setIsLoaded} />

                    </div>
                    <main className="reviews-wrapper">
                        <div className="rating-button-container">
                            <div className="num-reviews">
                                {!spot?.numReviews ? 'No Reviews' : `★ ${rating} · ${spot?.numReviews} reviews`}
                            </div>
                            {sessionUser && sessionUser?.id !== spot?.ownerId && (!reviewsObj || !Object.values(reviewsObj).find(review => review.userId === sessionUser?.id)) ?
                                <OpenModalButton
                                    modalComponent={<ReviewForm spot={spot} spotId={spotId} hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} />}
                                    buttonText="Write a review"
                                    className="review-button"
                                />
                                : null
                            }
                            {reviewsObj && Object.values(reviewsObj).map(review => (
                                sessionUser && (
                                    <div className="edit-delete-review">
                                        <div review={review} className={"reviewInfo"} key={`review-${review.id}`}>
                                            <DeleteReview review={review} hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} />
                                        </div>
                                        {sessionUser?.id === review.userId && sessionUser?.id !== spot?.ownerId ?
                                            <OpenModalButton
                                                modalComponent={<EditReview review={review} spotId={spotId} hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} />}
                                                buttonText="Update review"
                                                className="edit-review-button"
                                            />
                                            : null
                                        }
                                    </div>
                                )))}
                        </div>

                        <div className="user-reviews-container">
                            {reviewsObj && Object.values(reviewsObj).map(review => (
                                <AllReviews review={review} />
                            ))}
                        </div>

                    </main>
                </div>
            )}
        </div>
    )

}

export default SpotDetails;