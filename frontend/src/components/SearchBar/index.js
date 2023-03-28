import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import './SearchBar.css'

const SearchBar = () => {
    const history = useHistory();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const spots = useSelector(state => state.spots)
    const allSpots = Object.values(spots)

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        setSearch(inputValue);
        const results = allSpots.filter(spot =>
            spot.city.toLowerCase().includes(inputValue.toLowerCase()) ||
            spot.state.toLowerCase().includes(inputValue.toLowerCase()) ||
            spot.country.toLowerCase().includes(inputValue.toLowerCase()))
        if (inputValue === "") {
            setSearchResults([])
        } else {
            setSearchResults(results)
        }
    }

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
                    />

                    {search === "" ?
                        <i className="fa-solid fa-magnifying-glass nav-search-icon"></i> :
                        <i className="fa-solid fa-xmark nav-search-x"
                            onClick={() => {
                                setSearch("")
                                setSearchResults([])
                            }}></i>
                    }
                </div>

                {searchResults.length > 0 && (
                    <div className="search-results-container">
                        {searchResults?.slice(0, 7).map((spot) => (
                            <div className="search-result"
                                onClick={() => {
                                    setSearchResults([]);
                                    setSearch("");
                                    history.push(`/spots/${spot.id}`);
                                }}                               >
                                <img className="search-result-image" src={spot.images[0].url} />
                                <div className="search-result-info">
                                    <div className="search-result-name">{spot.name}</div>
                                    <div className="search-result-location">in {spot.city}, {spot.state}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!searchResults.length && search !== "" && (
                    <div className="no-search-results">
                        <div className="no-results-text">No results found</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;