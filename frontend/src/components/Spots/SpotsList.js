import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import './Spots.css'

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
                <Swiper
                    slidesPerView={1}
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="spot-image"
                >
                    {spot?.images?.map((img) => (
                        <SwiperSlide>
                            <img src={img.url} />
                        </SwiperSlide>
                    ))}
                </Swiper>
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
