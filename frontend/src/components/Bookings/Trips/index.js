import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { userBookings } from "../../../store/bookings";
import OpenModalButton from "../../OpenModalButton";
import DeleteBooking from "../DeleteBooking";
import './Trips.css'

function Trips() {
    const [loaded, setLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()
    const bookings = useSelector((state) => state.bookings)
    const spot = useSelector((state) => state.spots)

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
                <div className="no-trips-subtitle">No trips booked...yet!</div>
                <div className="no-trips-desc">Time to dust off your bags and start planning your next adventure!</div>
            </div>
        )
    }

    const upcomingTrips = [];
    const currentTrips = [];

    Object.values(bookings).forEach((booking) => {
        if (booking.Spot) {
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const today = new Date();

            if (startDate > today) {
                upcomingTrips.push(booking);
            } else if (endDate >= today) {
                currentTrips.push(booking);
            }
        }
    });


    return (
        <>
            <div className="trips-container">
                {upcomingTrips.length > 0 ? (
                    <div className="trips-titles-container">
                        <div className="trips-subtitle">Upcoming Trips</div>
                    </div>
                ) : null
                }
                {upcomingTrips.reverse().map((booking) => (
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
                ))}
                {currentTrips.length > 0 ? (
                    <div className="trips-titles-container">
                        <div className="trips-subtitle">Current Trips</div>
                    </div>
                ) : null
                }
                {currentTrips.reverse().map((booking) => (
                    <div className="trips-card" card-gap-2 key={booking.id}>
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
                            <img className="trips-img" src={booking.Spot.previewImage} alt="listing" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Trips;