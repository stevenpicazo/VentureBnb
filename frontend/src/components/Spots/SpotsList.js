import { NavLink } from "react-router-dom"

function SpotsList({ spot }) {


    const rating = parseFloat(spot.avgRating).toFixed(2)

    return (
        <NavLink
            className="nav-link"
            to={`/spots/${spot.id}`}
            activeClassName="active"
        >
            <div className="spot-card">
                <img src={spot.previewImage} className="spot-image" />
                <div className="spot-info">
                    <div className="spot-location-rating">
                        <div className="spot-city-state"> {spot.city}, {spot.state} </div>
                        <div className="avg-rating">★ {rating}</div>
                    </div>



                    <div>
                        <div className="spot-price">${spot.price}</div>
                        <div className="night">night</div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default SpotsList
