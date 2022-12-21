const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

//! Get all spots(flawed)
// router.get('/', async (req, res, next) => {
//     const spots = await Spot.findAll({
//         include: [
//             {model: Review},
//             {model: SpotImage}
//         ]
//     })

    // let spotsList = []
    // spots.forEach(spot => {
    //     spotsList.push(spot.toJSON())
    // })

    // spotsList.forEach(spot => {
    //     spot.SpotImages.forEach(image => {
    //         if (image.preview) {
    //              spot.preview = image.url
    //         }
    //     })
    //     if (!spot.preview) {
    //         spot.preview = 'No preview image available.'
    //     }
    //     // console.log(spot.SpotImages)
    //     delete spot.SpotImages
    // })

//     spotsList.forEach(reviews => {
//         reviews.Reviews.forEach(el => {
//             // console.log(el)
//             reviews.stars = [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
//         })
//         delete reviews.Reviews
//     })


//     return res.json(spotsList)

// })

//! GET ALL SPOTS
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        // include: [
        //     {model: SpotImage},
        //     {model: Review}
        // ]
    })

    const spotsList = []
    for (let spot of spots) {
        const review = await spot.getReviews({
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        })
        const avgObject = review[0].toJSON()
        const avgRating = avgObject.avgRating

        let spotImage = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: spot.id
            }
        })

        if (spotImage) spotImage = spotImage.url
        else spotImage.preview = 'No image available'
        



        const spotInfo = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: avgRating,
            previewImage: spotImage
        }
        spotsList.push(spotInfo)
    }

    return res.json(spotsList)
})


//! Get all spots owned by current User
// router.get('/current', async (req, res, next) => {
//     const currentUserSpots = await Spot.findOne({

//     })
//     if (currentUserSpots) return res.json(currentUserSpots)
// })



module.exports = router