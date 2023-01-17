import React from "react";
import { useState, useEffect } from "react";


function UserSpotDetails ({userspot}) {


    return (
        <div key={userspot.id} className="userspot-card">
            <img src={userspot.previewImage} alt="preview" className="userspot-image"/>
            <div className="userspot-info">
                <div className="userspot-address">{userspot.address},</div>
                <div className="userspot-city-state">{userspot.city}, {userspot.state}</div>
                <button className="userspot-delete-button">Delete Listing</button>
                {/* <div className="userspot-name">{userspot.name}</div>
                <div className="userspot-price">${userspot.price}</div> */}
                {/* <span className="userspot-night-span">night</span> */}
            </div>
        </div>
    )
}

export default UserSpotDetails;