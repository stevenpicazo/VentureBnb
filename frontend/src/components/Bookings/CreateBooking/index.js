
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateBooking.css'
import * as bookingsActions from "../../../store/bookings"
import { useHistory } from "react-router-dom";

const CreateBooking = ({ spotId, hasSubmitted, setHasSubmitted, spot }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [validationErrors, setValidationErrors] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const sessionUser = useSelector(state => state.session.user)

    const rating = parseFloat(spot.avgStarRating).toFixed(2)

    const handleBookings = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        return dispatch(
            bookingsActions.createBooking(
                { startDate, endDate },
                spotId))
            .then(() => {
                setHasSubmitted(!hasSubmitted)
                history.push(`/trips`)
            })
            .then(() => {
                setStartDate('')
                setEndDate('')
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValidationErrors(data.errors)
            })
    }

    return (
        <section className="bookings-column">
            <div className="bookings-container">
                <div className="bookings">
                    <form className="booking-form" onSubmit={handleBookings}>
                        <ul className="ul-errors">
                            {Object.values(validationErrors).map(error => (
                                <div
                                    className="errors"
                                    key={error}>{error}
                                </div>
                            ))}
                        </ul>

                        <div className="booking-info-container">
                            <div className="booking-price">${spot.price}</div>
                            {!spot.numReviews ? (
                                'No Reviews'
                            ) : (
                                <div>
                                    <span className="bold">★ {rating}</span>
                                    <span className="bullet-point">·</span>
                                    <span className="booking-reviews">{spot.numReviews} reviews</span>
                                </div>
                            )}
                        </div>
                        <div className="booking-dates-container">
                            <div className="booking-label-container">
                                <label className="booking-date-label">
                                    <div className="booking-label-text">CHECK-IN</div>
                                    <input className="booking-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </label>
                            </div>
                            <div className="booking-border"></div>
                            <div className="booking-label-container">
                                <label className="booking-date-label">
                                    <div className="booking-label-text">CHECK-OUT</div>
                                    <input className="booking-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </label>

                            </div>
                        </div>
                        <div className="booking-btn-container">
                            {sessionUser.id !== spot.OwnerId ? (
                                <button type="submit" className="booking-submit-btn">
                                    Reserve
                                </button>
                            ) : (
                                <div>
                                    <button
                                        type="submit"
                                        className="booking-submit-btn disabled"
                                        disabled
                                    >
                                        Reserve
                                    </button>
                                    <div className="booking-errors">You are the current owner of this listing</div>
                                </div>
                            )}
                        </div>

                        <div className="booking-fees-container">
                            <div className="cleaning-fee-container">
                                <span className="cleaning-fee"> Cleaning fee:</span>
                                <span className="cleaning-fee-price">$17</span>
                            </div>
                            <div className="service-fee-container">
                                <span className="service-fee"> Service fee:</span>
                                <span className="service-fee-price">$107</span>
                            </div>
                        </div>
                        <div className="booking-total">
                            <span className="booking-total-text"> Total before taxes</span>
                            <span className="booking-total-price">${spot.price}</span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateBooking;