import { useHistory } from "react-router-dom";
import DeleteBooking from "../DeleteBooking";

const UpcomingTrips = ({ booking, formatDate }) => {
    const history = useHistory()
    return (
        <div className="trips-card card-gap-1" key={booking.id}>
            <div className="trip-info-container">
                <div className="trips-info">
                    <span className="trips-city">{booking?.Spot.city}</span>
                    <span className="trips-name">{booking?.Spot.name}</span>
                    <div className="trip-date-address">
                        <div className="trip-dates">
                            <span className="trips-start-date">{formatDate(booking.startDate)} -</span>
                            <span className="trips-end-date">{formatDate(booking.endDate)}</span>
                        </div>
                        <div className="trips-address-container">
                            <span className="trips-address">{booking.Spot.address}, {booking.Spot.city}</span>
                            <span className="trips-country">{booking.Spot.country}</span>
                        </div>
                    </div>
                </div>
                <img
                    onClick={() => history.push(`/spots/${booking.Spot?.id}`)}
                    className="trips-img"
                    src={booking.Spot.previewImage} alt="listing" />
            </div>
            <DeleteBooking booking={booking} />
        </div>
    )
}

export default UpcomingTrips;