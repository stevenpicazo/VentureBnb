import { csrfFetch } from "./csrf"

const normalizeData = (data) => {
    const normalizedData = {}
    for (let spotData of data) {
        normalizedData[spotData.id] = spotData
    }
    return normalizedData
}

const LOAD_REVIEW = 'reviews/READ'
const CREATE_REVIEW = 'reviews/CREATE'
const EDIT_REVIEW = 'reviews/EDIT'
const DELETE_REVIEW = 'reviews/DELETE'

//! ACTIONS
export const actionLoadReview = (reviews) => {
    return {
        type: LOAD_REVIEW,
        reviews
    }
}

export const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const actionEditReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

export const actionDeleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}

//! THUNKS
export const reviewBySpotIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        const review = await res.json()
        dispatch((actionLoadReview(review.Reviews)))
    }
}

export const createThunk = (review, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const review = await res.json()
        // dispatch(actionCreateReview(review))
        dispatch(reviewBySpotIdThunk(spotId));
        return review
    } 
}

export const editReviewThunk = (review, reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const newReview = await res.json()
        return newReview
    } 
}

export const deleteThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        const review = await res.json()
        dispatch(actionDeleteReview(review))
        return review
    }
}

//! REDUCER
const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEW: {
            let newState = Object.assign({}, state)
            const reviews = normalizeData(action.reviews)
            newState = reviews
            return newState
        }
        case CREATE_REVIEW: {
            let newState = Object.assign({}, state)
            return newState
        }
        case EDIT_REVIEW: {
            let newState = Object.assign({}, state)
            return newState
        }
        case DELETE_REVIEW: {
            let newState = Object.assign({}, state)
            delete newState[action.review.id]
            return newState
        }
        default:
            return state
    }
}

export default reviewsReducer