import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readThunk } from "../../store/spots";
import SpotsList from "./SpotsList";
import './Spots.css'

const Spots = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)
    console.log('spots', spotsArr)
    
    useEffect(() => {
        dispatch(readThunk())
    }, [dispatch])
    
    // if (!spots.length) {
    //     return null
    // }
    return (
        <div className="spot-list">
            {spotsArr.map(spot => (
                <SpotsList key={`spot-${spot.id}`} spot={spot}/>
            ))}
        </div>
    )
}

export default Spots

        