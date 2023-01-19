import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, readThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";
import * as spotsActions from "../../store/spots";

function UserSpotDetails ({userspot}) {
    const spots = useSelector(state=>state.spots)
    const dispatch = useDispatch()
    const history = useHistory()
    const [hasSubmitted, setHasSubmitted] = useState(false)

    
    // useEffect(() => {
    //     if (hasSubmitted) {
            // dispatch(spotsActions.thunkCurrentUsersSpots()).then(() => {
            //     setHasSubmitted(false);
            // });
    //     }
    // }, [dispatch, hasSubmitted]);
    
    const deleteSpot = async (e) => {
        e.preventDefault()
        await dispatch(deleteThunk(userspot.id))
        setHasSubmitted(true)
        history.push('/listings')
    }
    return (
        <div key={userspot.id} className="userspot-card">
            <img src={userspot.previewImage} alt="preview" className="userspot-image"/>
            <div className="userspot-info">
                <div className="userspot-address">{userspot.address},</div>
                <div className="userspot-city-state">{userspot.city}, {userspot.state}</div>
                <button 
                className="userspot-delete-button"
                onClick={deleteSpot}>
                    Delete Listing
                </button>
            </div>
        </div>
    )
}

export default UserSpotDetails;