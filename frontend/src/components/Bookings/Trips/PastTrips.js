
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { userBookings } from "../../../store/bookings";
import OpenModalButton from "../../OpenModalButton";
import DeleteBooking from "../DeleteBooking";
import './Trips.css'

function PastTrips({booking}) {
    const [loaded, setLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()
    const bookings = useSelector((state) => state.bookings)

    useEffect(() => {
        dispatch(userBookings()).then(() => setLoaded(true))
    }, [dispatch, hasSubmitted])


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    if (!Object.values(bookings).length) {
        return (
            <div className="no-trips-container">
                <span className="no-trips-title">Trips</span>
                <div className="no-trips-subtitle">No trips have been booked...yet!</div>
                <div className="no-trips-desc">Time to dust off your bags and start planning your next adventure!</div>
            </div>
        )
    }

    const pastTrips = [];

    Object.values(bookings).forEach((booking) => {
        if (booking.Spot) {
            const endDate = new Date(booking.endDate);
            const today = new Date();

            if (endDate < today) {
                pastTrips.push(booking);
            }
        }
    }
    )

    return (
        <div className="trips-container">

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
            </div>
        </div>
    )

}

export default PastTrips;