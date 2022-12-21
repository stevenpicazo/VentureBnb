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


//! Get all spots owned by current User
router.get('/current', async (req, res, next) => {
    const spots = await Spot.findAll()
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
        
        const spots = {
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
        spotsList.push(spots)
    }
    return res.json({
        Spots: spotsList
    })
    
})

//! Get details of a Spot from an id
router.get('/:id', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id)
    
    const spotsList = []
    const review = await spot.getReviews({
        attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
    })
    const avgObject = review[0].toJSON()
    const avgRating = avgObject.avgRating

    const image = await SpotImage.findAll()

    const user = await User.findOne({
        attributes: ['id', 'firstName', 'lastName']
    })

    let filteredSpotImage = await SpotImage.findOne({
        where: {
            preview: true,
            spotId: spot.id
        }
    })

    if (filteredSpotImage) filteredSpotImage = filteredSpotImage.url
    else filteredSpotImage.preview = 'No image available'
    
    const spotsInfo = {
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
        previewImage: filteredSpotImage,
        SpotImages: image,
        Owner: user
    }
    spotsList.push(spotsInfo)

    if (!spot) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
    if (spot) {
        res.json(spotsList)
    }
})

//! GET ALL SPOTS
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll()
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
        
        const spots = {
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
        spotsList.push(spots)
    }

    return res.json({
        Spots: spotsList
    })
})


module.exports = router