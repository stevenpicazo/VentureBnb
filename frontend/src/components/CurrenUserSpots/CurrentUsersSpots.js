import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import './CurrentUserSpots.css'

function Profile() {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots.CurrentUsersSpots);
  const history = useHistory()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // const spots = Object.values(spotsObj)
  // const { spotId } = useParams() 
const [loaded, setLoaded] = useState('')
    useEffect(() => {
      dispatch(spotsActions.thunkCurrentUsersSpots()).then(() => setLoaded(true))
    }, [dispatch, hasSubmitted]);

  if (!spotsObj) return null
  if (!loaded) return null

  const deleteSpot = async (e, spotId) => {
    e.preventDefault()
    await dispatch(spotsActions.deleteThunk(spotId))
    setHasSubmitted(!hasSubmitted)
    // await history.push('/listings') 
  }

  return (
    <div>
        <h1 className="userspots-h1">My Listings</h1>
        {Object.values(spotsObj).map((userspot) => (
          <div key={userspot.id}>
            {/* <UserSpotDetails key={userspot.id} userspot={userspot}/> */}
              <div className="userspot-card">
              <img src={userspot.previewImage} alt="preview" className="userspot-image"/>
              <div className="userspot-info">
                  <div className="userspot-address">{userspot.address},</div>
                  <div className="userspot-city-state">{userspot.city}, {userspot.state}</div>
                  <button 
                  className="userspot-delete-button"
                  onClick={(e) => deleteSpot(e, userspot.id)}>
                      Delete Listing
                  </button>
                  <button onClick={(e) => {
                    e.preventDefault();
                    history.push(`/edit/listing/${userspot.id}`);
                  }}>Edit</button> 
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Profile;



