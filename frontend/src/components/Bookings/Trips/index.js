import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userBookings } from "../../../store/bookings";
import PastTrips from "./PastTrips";
import './Trips.css'
import UpcomingTrips from "./UpcomingTrips";

function Trips() {
    const [loaded, setLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()
    const bookings = useSelector((state) => state.bookings)
    const [activeTab, setActiveTab] = useState('upcoming')

    useEffect(() => {
        dispatch(userBookings()).then(() => setLoaded(true))
        window.scrollTo(0, 0); 
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

    let pastTrips = [];
    let upcomingTrips = [];
    // let currentTrips = [];

    Object.values(bookings).forEach((booking) => {
        if (booking.Spot) {
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const today = new Date();

            if (startDate > today) {
                upcomingTrips.push(booking);
            } else if (endDate < today) {
                pastTrips.push(booking);
            }
        }
    });

    const handleTabClick = (tab, url) => {
        setActiveTab(tab)
        history.push(url)
    }

    return (
        <>
            <header className="trips-header">
                <div className="trips-header-title">Trips</div>
                <div className="trips-tabs">
                    <span onClick={() => handleTabClick('upcoming', '/trips')} className={activeTab === 'upcoming' ? 'active-tab' : null}>Upcoming</span>
                    <span onClick={() => handleTabClick('past', '/trips/past')} className={activeTab === 'past' ? 'active-tab' : null}>Past</span>
                </div>
            </header>
            <div className="trips-container">
                {activeTab === 'upcoming' ? (
                    <div className="trips-titles-container">
                        <div className="trips-subtitle">Upcoming Trips</div>
                    </div>
                ) : null}
                {activeTab === 'upcoming' && upcomingTrips.reverse().map((booking) => (
                    <UpcomingTrips booking={booking} formatDate={formatDate} />
                ))}

                {activeTab === 'past' ? (
                    <div className="trips-titles-container">
                        <div className="trips-subtitle">Past Trips</div>
                    </div>
                ) : null}
                {activeTab === 'past' && pastTrips.reverse().map((booking) => (
                    <PastTrips booking={booking} formatDate={formatDate} />
                ))}
            </div>
        </>
    );
}

export default Trips;
