import React, { useEffect, useState } from "react";
import { thunkGetSpotById } from "../../store/spots"; 
import './SpotDetails.css'
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { reviewBySpotIdThunk } from "../../store/reviews";
import * as reviewsActions from "../../store/reviews";

function SpotDetails () {
    const history = useHistory()
    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => state.spots[spotId])
    console.log('spotDetails -->', spot)

    
    const reviewsObj = useSelector((state) => state.reviews.Reviews)
    
    useEffect(() => {
        dispatch(thunkGetSpotById(spotId))
        .then(() => {
            setIsLoaded(true)
            dispatch(reviewBySpotIdThunk(spotId))
        }).catch(async (res) => {
            const spotData = await res.json()
            if (spotData && spotData.validationErrors) setValidationErrors(spotData.validationErrors);
        })
    }, [dispatch, spotId])

    if (!isLoaded) {
        return <div>loading...</div>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        dispatch(reviewsActions.createThunk(
            {review, stars}, 
            spot.id
            ))
            .catch(async (res) => {
                const reviewData = await res.json()
                if (reviewData && reviewData.validationErrors) setValidationErrors(reviewData.validationErrors);
            })
    }

    const deleteReview  = async (e, reviewId) => {
        e.preventDefault()
        await dispatch(reviewsActions.deleteThunk(reviewId))
        // setHasSubmitted(!hasSubmitted)
        // await history.push('/reviewId')
    }
    
    function currentUser() {
        // if (sessionUser.id === review.userId)
    }
    
    return (
        <div className="spot-details-container">
            
                <div>     
                <h1>{spot.name}</h1>
                
                <div className="spot-card"> 
                {spot.SpotImages.map(image => (
                    <img src={image.url} className="spot-image"/>
                ))}
                        <div className="spot-info"> 
                            <div>{spot.address}</div>
                            <div>{spot.description}</div>
                        </div>
                </div>
              <div className="reviews-list">
                <h2>Reviews</h2>
                {reviewsObj && Object.values(reviewsObj).map(review => (
                    
                    <div className={"reviewInfo"} key={review.id}>
                    
                        {console.log('reviewwwww -->', review)}
                        {review.User.firstName} {review.User.lastName} {review.stars}
                        {sessionUser.id === review.userId && ( 
                        <button 
                            className="delete-review-button"
                            onClick={(e) => deleteReview(e, review.id)}>
                            Delete
                        </button> )}
                    </div>
                ))}

<           form onSubmit={handleSubmit}>
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