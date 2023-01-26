import { csrfFetch } from "./csrf"

const normalizeData = (data) => {
    const normalizedData = {}
    for (let el of data) {
        normalizedData[el.id] = el
    }
    return normalizedData
}

//! ACTIONS


//! THUNKS


//! REDUCER
const initialState = {}

export const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state
    }
}
