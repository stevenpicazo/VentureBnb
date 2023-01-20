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
    const [validationErrors, setValidationErrors] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    // const [hasLoaded, setHasLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => state.spots[spotId])
    const reviewsObj = useSelector((state) => state.reviews)
    // console.log('reviewsObj -->', reviewsObj)

    useEffect(() => {
        dispatch(thunkGetSpotById(spotId))
            .then(() => {
                setIsLoaded(true)
                dispatch(reviewBySpotIdThunk(spotId))
            }).catch(async (res) => {
                const spotData = await res.json()
                if (spotData && spotData.validationErrors) setValidationErrors(spotData.validationErrors);
            })
    }, [dispatch, hasSubmitted, spotId])

    if (!isLoaded) {
        return <div>loading...</div>
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
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.validationErrors) {
                    setValidationErrors(data.validationErrors);
                }
            })
    }

    return (
        <div className="spot-details-container">

            <div>
                <h1>{spot.name}</h1>

                <div className="spot-card">
                    {spot.SpotImages.map(image => (
                        <img src={image.url} className="spot-image" key={`image-${image.id}`} />
                    ))}
                    <div className="spot-info">
                        <div>{spot.address}</div>
                        <div>{spot.description}</div>
                    </div>
                </div>
                <div className="reviews-list">
                    <h2>Reviews</h2>
                    {reviewsObj && Object.values(reviewsObj).map(review => (
                        sessionUser && (
                            <div className={"reviewInfo"} key={`review-${review.id}`}>
                                {/* {console.log('review -->', review)} */}
                                <span>{review.User.firstName} ★{review.stars} </span>
                                <span>{review.review} </span>
                                {sessionUser.id === review.userId && (
                                    <button
                                        className="delete-review-button"
                                        onClick={(e) => deleteReview(e, review.id)}>
                                        Delete
                                    </button>
                                )}
                            </div>
                        )))}

                    <           form onSubmit={handleSubmit}>
                        <ul className="errors">
                            {isSubmitted && validationErrors.length && (
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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SpotDetails;



// import React, { useEffect, useState } from "react";
// import { thunkGetSpotById } from "../../store/spots";
// import './SpotDetails.css'
// import { useSelector, useDispatch } from "react-redux";
// import { NavLink, useHistory, useParams } from "react-router-dom";
// import { reviewBySpotIdThunk } from "../../store/reviews";
// import * as reviewsActions from "../../store/reviews";

// function SpotDetails() {
//     const history = useHistory()
//     const dispatch = useDispatch()

//     const [review, setReview] = useState('')
//     const [stars, setStars] = useState('')
//     const [validationErrors, setValidationErrors] = useState([])
//     const [isLoaded, setIsLoaded] = useState(false)
//     // const [hasLoaded, setHasLoaded] = useState(false)
//     const [hasSubmitted, setHasSubmitted] = useState(false)
//     const [isSubmitted, setIsSubmitted] = useState(false)

//     const { spotId } = useParams()
//     const sessionUser = useSelector(state => state.session.user);
//     const spot = useSelector((state) => state.spots[spotId])
//     const reviewsObj = useSelector((state) => state.reviews.Reviews)

//     useEffect(() => {
//         dispatch(thunkGetSpotById(spotId))
//             .then(() => {
//                 setIsLoaded(true)
//                 dispatch(reviewBySpotIdThunk(spotId))
//             }).catch(async (res) => {
//                 const spotData = await res.json()
//                 if (spotData && spotData.validationErrors) setValidationErrors(spotData.validationErrors);
//             })
//     }, [dispatch, hasSubmitted, spotId])

//     if (!isLoaded) {
//         return <div>loading...</div>
//     }


//     const deleteReview = async (e, reviewId) => {
//         e.preventDefault()
//         await dispatch(reviewsActions.deleteThunk(reviewId))
//         setHasSubmitted(!hasSubmitted)
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setValidationErrors([]);
//         return dispatch(
//             reviewsActions.createThunk(
//                 { review, stars },
//                 spot.id))
//             .catch(async (res) => {
//                 const reviewData = await res.json()
//                 if (reviewData && reviewData.validationErrors) {
//                     setValidationErrors(reviewData.validationErrors);
//                 }
//             })
//     }

//     return (
//         <div className="spot-details-container">

//             <div>
//                 <h1>{spot.name}</h1>

//                 <div className="spot-card">
//                     {spot.SpotImages.map(image => (
//                         <img src={image.url} className="spot-image" key={`image-${image.id}`} />
//                     ))}
//                     <div className="spot-info">
//                         <div>{spot.address}</div>
//                         <div>{spot.description}</div>
//                     </div>
//                 </div>
//                 <div className="reviews-list">
//                     <h2>Reviews</h2>
//                     {reviewsObj && Object.values(reviewsObj).map(review => (
//                         sessionUser && (
//                             <div className={"reviewInfo"} key={`review-${review.id}`}>
//                                 {/* {console.log('review -->',review)} */}
//                                 <span>{review.User.firstName} ★{review.stars} </span>
//                                 <span>{review.review} </span>
//                                 {sessionUser.id === review.userId && (
//                                     <button
//                                         className="delete-review-button"
//                                         onClick={(e) => deleteReview(e, review.id)}>
//                                         Delete
//                                     </button>
//                                 )}
//                             </div>
//                         )))}

//                     <           form onSubmit={handleSubmit}>
//                         <ul className="errors">
//                             {isSubmitted && validationErrors.length && (
//                                 <ul className="errors">
//                                     {validationErrors.map(error => (
//                                         <li key={error}>{error}</li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </ul>
//                         <div>
//                             <label htmlFor='reviews'>Review:</label>
//                             <input
//                                 id='reviews'
//                                 type='text'
//                                 onChange={e => setReview(e.target.value)}
//                                 value={review}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor='stars'>Stars:</label>
//                             <input
//                                 id='stars'
//                                 type='number'
//                                 min={1}
//                                 max={5}
//                                 onChange={e => setStars(e.target.value)}
//                                 value={stars}
//                                 required
//                             />
//                         </div>
//                         <button >Submit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default SpotDetails;



{/* <button onClick={(e) => {
        e.preventDefault()
        history.push(`/review/${spotId}`)
    }}>Edit
    </button>       */}


