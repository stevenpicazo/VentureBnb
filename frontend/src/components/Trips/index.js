import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userBookings } from "../../store/bookings";

function Trips() {

    const [loaded, setLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const dispatch = useDispatch()
    const bookings = useSelector((state) => state.bookings)
    // console.log('bookings -->', bookings)

    useEffect(() => {
        dispatch(userBookings()).then(() => setLoaded(true))
    }, [dispatch, hasSubmitted])

    if (!bookings) return null
    if (!loaded) return null

    return (
        <div className="listings-container">

            <h1>JASDF;LJDSJ</h1>
            <h1>JASDF;LJDSJ</h1>
            <h1>JASDF;LJDSJ</h1>
            <h1>JASDF;LJDSJ</h1>


            TESTING PLS LOAD
            {Object.values(bookings).map((booking) => (
                <div key={booking.id}>
                    {/* {console.log('booking -->', booking)} */}
                    {/* <bookingDetails key={booking.id} booking={booking}/> */}
                    <div className="booking-card">

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Trips;