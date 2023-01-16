//! Imports
import { csrfFetch } from "./csrf"
// import { useHistory } from "react-router-dom"

const LOAD_SPOTBYID = 'spots/LOAD_SPOT_DETAILS'
const READ_SPOTS = 'spots/READ'
const CREATE_SPOT = 'create/SPOT'
// const UPDATE_SPOTS = 'spots/UPDATE'
// const DELETE_SPOTS = 'spots/DELETE'

//! Actions
export const actionReadSpots = (spots) => {
    console.log('Spot in da action --->', spots);
    return {
        type: READ_SPOTS,
        spots
    }
}

export const actionGetSpotById = (spotById) => {
    return {
        type: LOAD_SPOTBYID,
        spotById
    }
}

export const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}


//! Thunks
export const readThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')
    if (res.ok) {
        const spots = await res.json()
        dispatch((actionReadSpots(spots)))
    }
}

export const thunkGetSpotById = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if (res.ok) {
        const spotById = await res.json()
        dispatch((actionGetSpotById(spotById)))
    }
}

export const creatThunk = (spots) => async (dispatch) => {
    return csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spots)
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
    })
    .then(spot => {
        console.log('spot in da thunk -->', spot)
        dispatch(actionCreateSpot(spot))
        return spot
    })
}

//! Reducer
const initialState = {}

export const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case READ_SPOTS: {
            let newState = Object.assign({}, state)
            for (let spot of action.spots.Spots) {
                newState[spot.id] = spot
            }
            return newState
        }
        case LOAD_SPOTBYID: {
            let newState = Object.assign({}, state)
            newState[action.spotById.id] = action.spotById;
            return newState
        } 
        case CREATE_SPOT: {
            let newState = Object.assign({}, state)
            newState[action.spot.id] = action.spot
            return newState
        }
    default: 
        return state
    }
}

export default spotReducer;