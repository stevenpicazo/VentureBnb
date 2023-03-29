import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { readThunk, thunkGetSpotById } from "../../store/spots";
import useSearch from "./useSearch";
import './SearchBar.css'

const SearchBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { search, setSearch, searchResults, setSearchResults, handleSearch } = useSearch();
    const [resultsVisible, setResultsVisible] = useState(false);
    const spots = useSelector(state => state.spots)
    const allSpots = Object.values(spots)

    useEffect(() => {
        dispatch(readThunk());
        dispatch(thunkGetSpotById());
    }, [dispatch]);

    const handleSearchOnFocus = () => {
        setResultsVisible(true);
    };

    const handleSearchOnBlur = () => {
        setTimeout(() => setResultsVisible(false), 150);
    };

    return (
        <div className="search-wrapper">
            <div className="search-container">
                <div className="search-bar-container">
                    
                    <input
                        className="search-bar-input"
                        type="text"
                        placeholder="Start your search"
                        value={search}
                        onChange={handleSearch}
                        onFocus={handleSearchOnFocus}
                        onBlur={handleSearchOnBlur}
                    />

                    {search === "" ?
                        <i className="fa-solid fa-magnifying-glass nav-search-icon"></i> :
                        <i className="fa-solid fa-xmark nav-search-x"
                            onClick={() => {
                                setSearch("");
                                setSearchResults([]);
                            }}></i>
                    }
                </div>

                {searchResults.length > 0 && resultsVisible && (
                    <div className="search-results-container">
                        {searchResults?.slice(0, 7).map((spot) => (
                            <>
                                {spot && spot?.images && spot?.images[0] &&
                                    <div className="search-result"
                                        onClick={() => {
                                            setSearchResults([]);
                                            setSearch("");
                                            history.push(`/spots/${spot.id}`);
                                        }}                               >
                                        <img className="search-result-image" src={spot?.images[0].url} />
                                        <div className="search-result-info">
                                            <div className="search-result-name">{spot?.name}</div>
                                            <div className="search-result-location">in {spot?.city}, {spot?.state}</div>
                                        </div>
                                    </div>
                                }
                            </>
                        ))}
                    </div>
                )}

                {!searchResults.length && search !== "" && resultsVisible && (
                    <div className="no-search-results">
                        <div className="no-results-text">No results found</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
