import { NavLink } from "react-router-dom"

function SpotsList({ spot }) {

    const rating = spot.avgRating === 0 ? 'New' : parseFloat(spot.avgRating).toFixed(2);

    const truncateName = (name) => {
        const shortName = name?.slice(0, 20)
        return shortName + "..."
    }

    return (
        <NavLink
            className="nav-link"
            to={`/spots/${spot.id}`}
            activeClassName="active"
        >
            <div className="spot-card">
                <img src={spot.previewImage} className="spot-image" />
                <div className="home-page-spot-info">
                    <div className="spot-location-rating">
                        <div className="spot-city-state"> {spot.city}, {spot.state} </div>
                        <div className="home-rating-container">
                            <span className="home-star">★</span>
                            <div className="avg-rating"> {rating}</div>

                        </div>
                    </div>

                    <div className="spot-city-price">
                        <div className="spot-name"> {truncateName(spot.name)} </div>
                        <div className="spot-price">${spot.price}</div>
                        <div className="night">night</div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default SpotsList
