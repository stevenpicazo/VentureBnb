import React, { useEffect, useState } from "react";
import { thunkGetSpotById } from "../../store/spots"; 
import './SpotDetails.css'
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { reviewBySpotIdThunk } from "../../store/reviews";
import * as reviewsActions from "../../store/reviews";

function SpotDetails () {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => state.spots.SpotDetails)
    const reviewsObj = useSelector((state) => state.reviews.Reviews)

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    
    useEffect(() => {
        dispatch(thunkGetSpotById(spotId)).then(() => {
            dispatch(reviewBySpotIdThunk(spotId))

        }).catch(async (res) => {
            const spotData = await res.json()
            if (spotData && spotData.validationErrors) setValidationErrors(spotData.validationErrors);
        })
    }, [dispatch, spotId])


    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        dispatch(reviewsActions.createThunk(
            {review, stars}, 
            spot.id
            )).then(() => {
                history.push(`/`);
            }).catch(async (res) => {
                const reviewData = await res.json()
                if (reviewData && reviewData.validationErrors) setValidationErrors(reviewData.validationErrors);
            })
    }

    const deleteReview = (review) => {
        // dispatch(reviewsActions.dele)
    }
    
    return (
        <div className="spot-details-container">
            {spot ? (
                <div>     
                <h1>{spot.name}</h1>
                
                <div className="spot-card"> 
                    <img src={spot.SpotImages[0].url} className="spot-image"/>
                        <div className="spot-info"> 
                            <div>{spot.address}</div>
                            <div>{spot.description}</div>
                        </div>
                </div>
                <div className="reviews-list">
              </div>
              <div className="reviews-list">
                {reviewsObj && Object.values(reviewsObj).map((review) => {
                    return (
                    <div className={"review"} key={`review-${review.id}`}>
                        <div>
                        {review.User.firstName} {" "} {review.User.lastName} {review.stars}
                        </div>
                    </div>
                    );
                })}

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
                                
            
            ) : (
            <div>Loading...</div>
            )}
        </div>
        )
    }

export default SpotDetails;