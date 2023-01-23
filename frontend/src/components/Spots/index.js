import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readThunk } from "../../store/spots";
import SpotsList from "./SpotsList";
import './Spots.css'

const Spots = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)
    // console.log('spots', spotsArr)
    const [loaded, setLoaded] = useState('')

    
    useEffect(() => {
        dispatch(readThunk())
    }, [dispatch])
    
    if (!spotsArr.length) return null
    
    return (
        <div className="spot-list-container">
            {spotsArr.map(spot => (
                <SpotsList key={`spot-${spot.id}`} spot={spot}/>
            ))}
        </div>
    )
}

export default Spots

        