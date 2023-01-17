import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import UserSpotDetails from "./UserSpotDetails";
import './CurrentUserSpots.css'

export default function Profile() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.CurrentUsersSpots);

  useEffect(() => {
    dispatch(spotsActions.thunkCurrentUsersSpots())
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div>
        <h1 className="userspots-h1">My Listings</h1>
        {Object.values(spots).map((userspot) => (
            // <div key={`userspot-${userspot.id}`} userspot={userspot} className="userspot-image"> 
           <UserSpotDetails key={userspot.id} userspot={userspot}/>

        ))}
    </div>
  );
}
