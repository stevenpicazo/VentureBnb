import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useSearch = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const spots = useSelector(state => state.spots);
    const allSpots = Object.values(spots);

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        setSearch(inputValue);
        const results = allSpots?.filter(spot =>
            spot?.city.toLowerCase().includes(inputValue.toLowerCase()) ||
            spot?.state.toLowerCase().includes(inputValue.toLowerCase()) ||
            spot?.country.toLowerCase().includes(inputValue.toLowerCase()));
        if (inputValue === "") {
            setSearchResults([]);
        } else {
            setSearchResults(results);
        }
    };

    useEffect(() => {
        if (search !== "") {
            const results = allSpots?.filter(spot =>
                spot?.city.toLowerCase().includes(search.toLowerCase()) ||
                spot?.state.toLowerCase().includes(search.toLowerCase()) ||
                spot?.country.toLowerCase().includes(search.toLowerCase()));
            setSearchResults(results);
        }
    }, [allSpots, search]);

    return { search, setSearch, searchResults, setSearchResults, handleSearch }; 
};

export default useSearch;
