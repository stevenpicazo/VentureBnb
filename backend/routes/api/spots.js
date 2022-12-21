const express = require('express')

const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

const validateSpotCreation = [
    check('address').exists({ checkFalsy: true }).withMessage("Street address is required"),
    check('city').exists({ checkFalsy: true }).withMessage("City is required"),
    check('state').exists({ checkFalsy: true }).withMessage("State is required"),
    check('country').exists({ checkFalsy: true }).withMessage("Country is required"),
    check('lat').exists({ checkFalsy: true }).withMessage("Latitude is not valid"),
    check('lng').exists({ checkFalsy: true }).withMessage("Longitude is not valid"),
    check('name').exists({ checkFalsy: true }).isLength({ max: 49 }).withMessage( "Name must be less than 50 characters"),
    check('description').exists({ checkFalsy: true }).withMessage("Description is required"),
    check('price').exists({ checkFalsy: true }).withMessage("Price per day is required"),
    handleValidationErrors
]

//! Create A Spot 
router.post('/', validateSpotCreation, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const ownerId = req.user.id

    const spot = await Spot.create({
        ownerId,
        ...req.body,
    })

    return res.json(spot)
    
})

//! Add an Image to a Spot based on the Spot's id
router.post('/:id/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id)
    const { url, preview } = req.body

    const image = await SpotImage.create({
        url,
        preview,
        spotId: spot.id 
    })
    console.log(image.id)
    
    const spotImageInfo = {
        image: image.id,
        url: image.url,
        preview: image.preview
    }

    console.log(spotImageInfo)

    return res.json(spotImageInfo)
})

//! Get all spots owned by current User
router.get('/current', async (req, res, next) => {
    const spots = await Spot.findAll()
    const finalSpotList = []
    for (let spot of spots) {
        const review = await spot.getReviews({
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        })
        const avgObject = review[0].toJSON()
        const avgRating = avgObject.avgRating



        const spots = await Spot.findAll({
            include: [
                {model: Review},
                {model: SpotImage}
            ]
        })
    
        let spotsList = []
        spots.forEach(spot => {
            spotsList.push(spot.toJSON())
        })
    
        spotsList.forEach(spot => {
            spot.SpotImages.forEach(image => {
                if (image.preview) {
                     spot.preview = image.url
                }
            })
            if (!spot.preview) {
                spot.preview = 'No preview image available.'
            }
            delete spot.SpotImages
                
            const info = {
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
                previewImage: spot.preview
            }
                finalSpotList.push(info)

            })
    }

    return res.json({
        Spots: finalSpotList
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
    const finalSpotList = []
    for (let spot of spots) {
        const review = await spot.getReviews({
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        })
        const avgObject = review[0].toJSON()
        const avgRating = avgObject.avgRating



        const spots = await Spot.findAll({
            include: [
                {model: Review},
                {model: SpotImage}
            ]
        })
    
        let spotsList = []
        spots.forEach(spot => {
            spotsList.push(spot.toJSON())
        })
    
        spotsList.forEach(spot => {
            spot.SpotImages.forEach(image => {
                if (image.preview) {
                     spot.preview = image.url
                }
            })
            if (!spot.preview) {
                spot.preview = 'No preview image available.'
            }
            delete spot.SpotImages
                
            const info = {
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
                previewImage: spot.preview
            }
                finalSpotList.push(info)

            })
    }

    return res.json({
        Spots: finalSpotList
    })

    //! Initial way I completed this route
    // const spots = await Spot.findAll()
    // const spotsList = []
    // for (let spot of spots) {
    //     const review = await spot.getReviews({
    //         attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
    //     })
    //     const avgObject = review[0].toJSON()
    //     const avgRating = avgObject.avgRating

    //     let spotImage = await SpotImage.findOne({
    //         where: {
    //             preview: true,
    //             spotId: spot.id
    //         }
    //     })

    //     if (spotImage) spotImage = spotImage.url
    //     else spotImage.preview = 'No image available'
        
    //     const spots = {
    //         id: spot.id,
    //         ownerId: spot.ownerId,
    //         address: spot.address,
    //         city: spot.city,
    //         state: spot.state,
    //         country: spot.country,
    //         lat: spot.lat,
    //         lng: spot.lng,
    //         name: spot.name,
    //         description: spot.description,
    //         price: spot.price,
    //         createdAt: spot.createdAt,
    //         updatedAt: spot.updatedAt,
    //         avgRating: avgRating,
    //         previewImage: spotImage
    //     }
    //     spotsList.push(spots)
    // }

    // return res.json({
    //     Spots: spotsList
    // })
})


module.exports = router