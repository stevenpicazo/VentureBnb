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
const DELETE_REVIEW = 'reviews/DELETE'
// const UPDATE = 'spots/UPDATE'
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
export const actionDeleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}

//! THUNKS
// export const reviewBySpotIdThunk = (spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
//     if (res.ok) {
//         const review = await res.json()
//         // console.log('reviews in the thunk -->', review)
//         dispatch((actionLoadReview(review)))
//     }
// }

export const reviewBySpotIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        const review = await res.json()
        // console.log('reviews in the thunk -->', review)
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
        console.log('create review thunk -->', review)
        dispatch(actionCreateReview(review))
        dispatch(reviewBySpotIdThunk(spotId));
        return review
    }
}


// export const reviewBySpotIdThunk = (spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
//     if (res.ok) {
//         const review = await res.json()
//         // console.log('reviews in the thunk -->', review)
//         dispatch((actionLoadReview(review.Reviews)))
//     }
// }

export const deleteThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        const review = await res.json()
        // console.log('review in the thunk -->', review)
        dispatch(actionDeleteReview(review))
        return review
    }
}

//! REDUCER
const initialState = {}

export const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        // case LOAD_REVIEW: {
        //     let newState = Object.assign({}, state)
        //     const reviews = normalizeData(action.reviews.Reviews) 
        //     newState.Reviews = reviews
        //     return newState
        // }
        case LOAD_REVIEW: {
        let newState = Object.assign({}, state)
        const reviews = normalizeData(action.reviews) 
        newState = reviews
        return newState
    }
        case CREATE_REVIEW: {
            let newState = Object.assign({}, state)
            newState[action.review.id] = action.spot
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

// case LOAD_REVIEW: {
//     let newState = Object.assign({}, state)
//     const reviews = normalizeData(action.reviews) 
//     newState = reviews
//     return newState
// }
// export const reviewBySpotIdThunk = (spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
//     if (res.ok) {
//         const review = await res.json()
//         // console.log('reviews in the thunk -->', review)
//         dispatch((actionLoadReview(review.Reviews)))
//     }
// }
