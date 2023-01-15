//! Imports
import { csrfFetch } from "./csrf"

const CREATE_SPOTS = 'spots/CREATE'
const LOAD_SPOTBYID = 'spots/LOAD_SPOT_DETAILS'
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

export const actionGetSpotById = (spotById) => {
    return {
        type: LOAD_SPOTBYID,
        spotById
    }
}

export const actionCreateSpots = (spots) => {
    return {
        type: CREATE_SPOTS,
        spots
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
    const res = await fetch(`/api/spots/${spotId}`)
    if (res.ok) {
        const spotById = await res.json()
        dispatch((actionGetSpotById(spotById)))
    }
}


export const creatThunk = (spots) => async (dispatch) => {
    const res = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spots)
    })

    if (res.ok) {
        const spots = await res.json()
        dispatch(actionCreateSpots(spots))
        // return spots
    }
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



    default: 
        return state
    }
}

export default spotReducer;