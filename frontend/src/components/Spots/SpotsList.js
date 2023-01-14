// import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"


function SpotsList ({spot}) {
    // const spots = useSelector((state) => state.spots);
    // console.log('SPOTTTTT ', spots)
    // const { id } = useParams()
    return (
        <div key={spot.id} className="spot-card">
            <img src={spot.previewImage} className="spot-image"/>
            <div className="spot-info">
                Spot Info goes here
            </div>
        </div>
    )
}

export default SpotsList
