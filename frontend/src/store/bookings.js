import { csrfFetch } from "./csrf"

const normalizeData = (data) => {
    const normalizedData = {}
    for (let el of data) {
        normalizedData[el.id] = el
    }
    return normalizedData
}

const LOAD_BOOKING = 'bookings/READ'
const LOAD_BOOKINGBYID = 'booking/LOAD'
const USER_BOOKING = 'bookings/USER'
const CREATE_BOOKING = 'bookings/CREATE'
const DELETE_BOOKING = 'bookings/DELETE'
// const UPDATE_BOOKING = 'bookings/UPDATE'

//! ACTIONS
export const actionLoadBooking = (payload) => {
    return {
        type: LOAD_BOOKING,
        payload
    }
}

export const actionLoadBookingById = (payload) => {
    return {
        type: LOAD_BOOKINGBYID,
        payload
    }
}

export const actionUserBookings = (payload) => {
    return {
        type: USER_BOOKING,
        payload
    }
}

export const actionCreateBooking = (payload) => {
    return {
        type: CREATE_BOOKING,
        payload
    }
}

export const actionDeleteBooking = (payload) => {
    return {
        type: DELETE_BOOKING,
        payload
    }
}

// export const actionEditBooking = (payload) => {
//     return {
//         type: UPDATE_BOOKING,
//         payload
//     }
// }


//! THUNKS
export const loadBookings = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (res.ok) {
        const bookings = await res.json()
        dispatch(actionLoadBookingById(bookings.Bookings))
        return bookings
    }
}

export const userBookings = () => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`)
    if (res.ok) {
        const bookings = await res.json()
        dispatch(actionUserBookings(bookings.Bookings))
        return bookings
    }
}

export const createBooking = (booking, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(booking)
    })
    if (res.ok) {
        const booking = await res.json()
        dispatch(actionCreateBooking(booking))
        return booking
    }
}

export const deleteBooking = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        const booking = await res.json()
        dispatch(actionDeleteBooking(booking))
    }
}


//! REDUCER
const initialState = {}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKING: {
            let newState = Object.assign({}, state)
            const bookings = normalizeData(action.payload)
            newState = bookings
            return newState
        }
        case LOAD_BOOKINGBYID: {
            return { ...state, ...action.payload }
        }
        case USER_BOOKING: {
            let newState = Object.assign({}, state)
            const bookings = normalizeData(action.payload)
            newState = bookings
            return newState
        }
        case CREATE_BOOKING: {
            const newState = Object.assign({}, state)
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_BOOKING: {
            const newState = Object.assign({}, state)
            delete newState[action.payload];
            // delete newState[action.payload];
            return newState
        }
        default:
            return state
    }
}

export default bookingsReducer