import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteBooking, userBookings } from "../../../store/bookings"
import "./DeleteBooking.css"

const DeleteBooking = ({ booking }) => {
    const dispatch = useDispatch()
    const [islodaded, setIsLoaded] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(userBookings(user.id))
        .then(() => setIsLoaded(true))
    }, [dispatch, user, hasSubmitted])

    const handleSubmit = async () => {
        dispatch(deleteBooking(booking.id))
        dispatch((userBookings()))
        setHasSubmitted(!hasSubmitted)
    }


    return (
        <div className="cancel-trip-btn-container">
            <button onClick={(e) => handleSubmit(e, booking.id)} className="cancel-trip-btn">Cancel Reservation</button>
        </div>
    )
}

export default DeleteBooking;