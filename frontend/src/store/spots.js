//! Imports
import { csrfFetch } from "./csrf"
// import { useHistory } from "react-router-dom"
const normalizeData = (data) => {
    const normalizedData = {}
    for (let spotData of data) {
        normalizedData[spotData.id] = spotData
    }
    return normalizedData
}

const READ_SPOTS = 'spots/READ'
const LOAD_SPOTBYID = 'spots/LOAD_SPOT_DETAILS'
const CREATE_SPOT = 'create/SPOT'
const LOAD_CURRENT_USER_SPOTS = 'currentUsers/LOAD_CURRENT_USER_SPOTS'
const UPDATE_SPOT = 'spots/UPDATE'
const DELETE_SPOTS = 'spots/DELETE'

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

export const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const actionEditSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

export const actionDeleteSpot = (spot) => {
    return {
        type: DELETE_SPOTS,
        spot
    }
}

export const actionGetCurrentUsersSpots = (usersSpotById) => {
    // console.log('user spots in the action -->', usersSpotById)
    return {
        type: LOAD_CURRENT_USER_SPOTS,
        usersSpotById
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
        // console.log('spotbyid thunk -->', spotById)
        dispatch((actionGetSpotById(spotById)))
    }
}

export const thunkCurrentUsersSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
    if (res.ok) {
        const spots = await res.json()
        // console.log('currentuser spots in da thunk -->', spots)
        dispatch(actionGetCurrentUsersSpots(spots))
        return spots
    }
}

export const creatThunk = (spots, previewImage) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spots)
    });
    if(res.ok){
        const spot = await res.json()
        dispatch(actionCreateSpot(spot))
        const imageRes = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: "POST",
            body: JSON.stringify(previewImage),
        });
        if (imageRes.ok) {
            return spot;
        }
    }
}

export const editThunk = (spot, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      body: JSON.stringify(spot),
    });
  
    if (res.ok) {
      const spot = await res.json();
      console.log('spot in the edit thunk --> ', spot)
      dispatch(actionEditSpot(spot));
      return spot
  };
}

export const deleteThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const spot = await res.json()
        dispatch(actionDeleteSpot(spot))
        return spot
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
        // case LOAD_SPOTBYID: {
        //     let newState = Object.assign({}, state)
        //     newState[action.spotById.id] = action.spotById;
        //     return newState
        // } 
        case LOAD_SPOTBYID: {
            let SpotDetails = Object.assign({}, state)
            let newState = Object.assign({}, state)
            newState.SpotDetails = action.spotById
            // newState[action.spotById.id] = action.spotById
            // newState['SpotDetails'] = newState[action.spotById.id]
            // console.log('newState', newState[action.spotById.id])
            return newState
        } 
        case LOAD_CURRENT_USER_SPOTS: {
            let newState = Object.assign({}, state)
            const usersSpots = normalizeData(action.usersSpotById.Spots)
            newState.CurrentUsersSpots = usersSpots
            // console.log('currentUsersNewState-->', newState)
            return newState
        }
        case CREATE_SPOT: {
            let newState = Object.assign({}, state)
            newState[action.spot.id] = action.spot
            return newState
        }
        case UPDATE_SPOT: {
            let newState = Object.assign({}, state)
            newState[action.spot.id] = action.spot
            return newState
        }
        case DELETE_SPOTS: {
            let newState = Object.assign({}, state)
            delete newState[action.spot.id]
            return newState
        }
        default: 
            return state
    }
}

export default spotReducer;