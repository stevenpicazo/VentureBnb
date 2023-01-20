// import React from "react";
// import { useDispatch, useSelector } from "react-redux";

// function Reviews({review}) {
//     const reviewsObj = useSelector((state) => state.reviews.Reviews)
    
//     useEffect(() => {
//         dispatch(thunkGetSpotById(spotId))
//         .then(() => {
//             setIsLoaded(true)
//             dispatch(reviewBySpotIdThunk(spotId))
//         }).catch(async (res) => {
//             const spotData = await res.json()
//             if (spotData && spotData.validationErrors) setValidationErrors(spotData.validationErrors);
//         })
//     }, [dispatch, hasSubmitted ,spotId])

//     return (
//         <div className="reviews-list">
//         <h2>Reviews</h2>
//         {reviewsObj && Object.values(reviewsObj).map(review => (
            
//             <div className={"reviewInfo"} key={review.id} review={review}>
            
//                 {console.log('reviewwwww -->', review)}
//                 {review.User.firstName} {review.User.lastName} {review.stars}
//                 {sessionUser.id === review.userId && ( 
//                 <button 
//                     className="delete-review-button"
//                     onClick={(e) => deleteReview(e, review.id)}>
//                     Delete
//                 </button> 
//                 )}
//             </div>
//         ))}
//         </div>
//     )
// }

// // useEffect(() => {
// //     dispatch()
// // })

// export default Reviews