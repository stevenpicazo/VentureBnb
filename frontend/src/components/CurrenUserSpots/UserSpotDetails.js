import React from "react";

function UserSpotDetails ({userspot}) {
    return (
        
        <div>
            <div key={userspot.id} className="spot-card">
                <img src={userspot.previewImage} alt="preview" className="spot-image"/>
                <div className="spot-info">
                    <div className="spot-city-state">{userspot.city}, {userspot.state}</div>
                    <div className="spot-name">{userspot.name}</div>
                    <div className="spot-price">${userspot.price}</div>
                    <div className="night">night</div>
                </div>
            </div>
            
        </div>
    )
}

export default UserSpotDetails;