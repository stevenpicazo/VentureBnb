
const SET_SEARCH_RESULTS = 'search/SET_SEARCH_RESULTS';

export const actionSetSearchResults = (searchResults) => {
    return {
        type: SET_SEARCH_RESULTS,
        searchResults
    };
};


export const thunkSetSearchResults = (search) => async (dispatch, getState) => {
    const allSpots = Object.values(getState().spots);
    if (search !== "") {
        const results = allSpots.filter((spot) =>
            spot?.city.toLowerCase().includes(search.toLowerCase()) ||
            spot?.state.toLowerCase().includes(search.toLowerCase()) ||
            spot?.country.toLowerCase().includes(search.toLowerCase())
        );
        dispatch(actionSetSearchResults(results));
    } else {
        dispatch(actionSetSearchResults([]));
    }
};

const initialState = {
    searchResults: [],
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULTS: {
            const newState = { ...state };
            newState.searchResults = action.searchResults;
            return newState;
        }
        default:
            return state;
    }
};

export default searchReducer;