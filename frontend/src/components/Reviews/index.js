import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Reviews() {
    const dispatch = useDispatch()
    const review = useSelector((state) => state.reviews)
    console.log('reviews -->', review)


    return (
        <div>
            
        </div>)
}

// useEffect(() => {
//     dispatch()
// })

export default Reviews