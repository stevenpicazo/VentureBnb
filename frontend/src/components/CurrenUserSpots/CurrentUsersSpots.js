import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CurrentUserSpots.css'

function Profile() {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots);
  const history = useHistory()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // const spots = Object.values(spotsObj)
  // const { spotId } = useParams() 
  const [loaded, setLoaded] = useState('')
  useEffect(() => {
    dispatch(spotsActions.thunkCurrentUsersSpots()).then(() => setLoaded(true))
  }, [dispatch, hasSubmitted]);

  if (!Object.values(spotsObj).length) return (
    <div className="no-trips-container">
      <span className="no-trips-title">My Listings</span>
      <div className="no-trips-subtitle">No listings...yet!</div>
      <div className="no-trips-desc">Time to dust off your bags and start planning your next home to list!</div>
    </div>
  )

  if (!loaded) return null

  const deleteSpot = async (e, spotId) => {
    e.preventDefault()
    await dispatch(spotsActions.deleteThunk(spotId))
    setHasSubmitted(!hasSubmitted)
  }

  return (
    <div className="trips-container">
      <div className="trips-titles-container">
        <div className="trips-subtitle">My Listings</div>
      </div>
      {Object.values(spotsObj).map((userspot) => (
        <div className="listings-card" key={userspot.id}>
          <div className="trip-info-container">
            <div className="trips-info">
              <span className="trips-city">{userspot?.city}</span>
              <span className="trips-name">{userspot?.name}</span>
              <div className="trip-date-address">
                <div className="trips-address-container">
                  <span className="trips-address">{userspot.address}, {userspot.city}</span>
                  <span className="trips-country">{userspot.country}</span>
                </div>
              </div>
              <div className="listings-btns ">
                <button
                  className="edit-listing-btn"
                  onClick={(e) => {
                    e.preventDefault()
                    history.push(`/edit/listing/${userspot.id}`)
                  }}>
                  <i class="fa-regular fa-pen-to-square edit-icon"></i>
                  Update
                </button>
                <button
                  className=" delete-listing-btn"
                  onClick={(e) => deleteSpot(e, userspot.id)}>
                  <i class="fa-regular fa-trash-can edit-icon"></i>
                  Remove
                </button>
              </div>
            </div>
            <img
              onClick={() => history.push(`/spots/${userspot?.id}`)}
              className="listings-img"
              src={userspot.previewImage} alt="listing" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;



