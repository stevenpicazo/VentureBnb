import React, { useEffect } from "react";
import { thunkGetSpotById } from "../../store/spots"; 
import './SpotDetails.css'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function SpotDetails () {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])
    // console.log('ALL MY SPOTS ', allSpots)

    useEffect(() => {
        dispatch(thunkGetSpotById(spotId))
    }, [dispatch, spotId])

    return (
        <div className="spot-details-container">
            {spot ? (
                <div>
                <h1>PRINT</h1>
     

                <h1>{spot.name}</h1>
                <div>{spot.description}</div>
                <div>{spot.location}</div>
                </div>
                
            
            ) : (
            <div>Loading...</div>
            )}
        </div>
        )
    }

export default SpotDetails;