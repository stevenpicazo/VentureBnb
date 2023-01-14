//! Imports
import { csrfFetch } from "./csrf"

// const CREATE_SPOTS = 'spots/CREATE'
const READ_SPOTS = 'spots/READ'
// const UPDATE_SPOTS = 'spots/UPDATE'
// const DELETE_SPOTS = 'spots/DELETE'

//! Actions
export const actionReadSpots = (spots) => {
    return {
        type: READ_SPOTS,
        spots
    }
}

//! Thunks
export const readThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')
    if (res.ok) {
        const spots = await res.json()
        // console.log('SPOTS IN DA THUNK:', spots);

        dispatch((actionReadSpots(spots)))
        // return spots
    }
}

//! Reducer
const initialState = {}

export const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case READ_SPOTS:
            // console.log('THIS IS MY STATE ---> ', action.spots)
            let newState = Object.assign({}, state)
            for (let spot of action.spots.Spots) {
                newState[spot.id] = spot
            }
            // console.log('THIS IS MY NEW STATE ---> ', newState)
            return newState
    default: 
        return state
    }
}

export default spotReducer;