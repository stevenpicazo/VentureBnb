import { NavLink } from "react-router-dom"

function SpotsList ({spot}) {
    return (
        <NavLink 
            className="nav-link"
            to={`/spots/${spot.id}`}
            activeClassName="active"
        >
            <div className="spot-card">
                <img src={spot.previewImage} className="spot-image"/>
                <div className="spot-info">
                    <div className="spot-city-state">{spot.city}, {spot.state}</div>
                    <div className="spot-name">{spot.name}</div>
                    <div className="spot-price">${spot.price}</div>
                    <div className="night">night</div>
                </div>
            </div>
        </NavLink>
    )
}

export default SpotsList
