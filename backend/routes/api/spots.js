const express = require('express')

const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, spotValidator, reviewValidator, queryValidator } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');

const router = express.Router();


//! Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', reviewValidator, requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { review, stars } = req.body
    const userId = req.user.id
    const spotId = req.params.spotId
    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const singleReview = await Review.findOne({
        where: {
            userId,
            spotId: req.params.spotId
        }
    })

    // if there is already a review in place
    if (singleReview) {
        const error = new Error('Review already exists')
        error.errors = ['Review already exists']
        error.status = 403
        return next(error);
    }
    // otherwise create a new review
    else {
        const officialReview = await Review.create({
            userId,
            spotId: spot.id,
            review,
            stars
        })

        res.status(201)
        return res.json(officialReview)
    }
})

//! Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const spotById = await Spot.findByPk(req.params.spotId)
    const userId = req.user.id

    if (!startDate || !endDate) {
        res.status(400);
        return res.json({
            "message": "Start date and end date are required",
            "statusCode": 400,
            "errors": {
                "startDate": "Start date and end date are required",
            }
        });
    }

    if (!spotById) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const user = await User.findOne({
        where: {
            id: req.user.id,

        },
        include: [
            { model: Spot, attributes: ['id'], where: { id: req.params.spotId } }
        ]
    })
    if (user) {
        res.status(403)
        return res.json({
            "message": "Not authorized to create a booking"
        })
    }

    const startDate2 = new Date(startDate);
    const endDate2 = new Date(endDate);

    const bookings = await Booking.findOne({
        //! checking if bookings have dates that overlap with each other
        where: {
            spotId: req.params.spotId,
            startDate: { [Op.lte]: endDate },
            endDate: { [Op.gte]: startDate }
        }
    })
    //! if there are overlapping bookings this error is thrown
    if (bookings) {
        res.status(403)
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    } else if (endDate2 <= startDate2) {
        res.status(400)
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "End date cannot be on or before start date",
            }
        })
    } else {
        const newBooking = await Booking.create({
            spotId: req.params.spotId,
            userId,
            startDate,
            endDate
        })
        return res.json(newBooking)
    }
})

//! Create A Spot 
router.post('/', spotValidator, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const ownerId = req.user.id

    const spot = await Spot.create({
        ownerId,
        ...req.body,
    })

    res.status(201)
    return res.json(spot)
})

//! Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { url, preview } = req.body

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const user = await User.findOne({
        where: {
            id: req.user.id,

        },
        include: [
            { model: Spot, attributes: ['id'], where: { id: req.params.spotId } }
        ]
    })
    if (!user) {
        res.status(403)
        return res.json({
            "message": "Not authorized to add an image"
        })
    }

    const image = await SpotImage.create({
        url,
        preview,
        spotId: spot.id
    })

    const spotImageInfo = {
        id: image.id,
        url: image.url,
        preview: image.preview,
        // spotId: image.spotId
    }

    return res.json(spotImageInfo)
})

//! Edit a Spot
router.put('/:spotId', spotValidator, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const updatedSpot = await Spot.findByPk(req.params.spotId)

    if (!updatedSpot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const user = await User.findOne({
        where: {
            id: req.user.id,

        },
        include: [
            { model: Spot, attributes: ['id'], where: { id: req.params.spotId } }
        ]
    })

    if (!user) {
        res.status(403)
        return res.json({
            "message": "Not authorized to edit spot"
        })
    }

    await updatedSpot.set({
        ...req.body
    })
    await updatedSpot.save()

    return res.json(updatedSpot)
})

//! Get all spots owned by current User
router.get('/current', async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            { model: SpotImage },
            { model: Review }
        ]
    })

    const currentUserSpots = []

    for (let spot of spots) {
        const avgRating = spot.Reviews.reduce((acc, el) => {
            return acc + el.stars / spot.Reviews.length
        }, 0)

        let previewImage;
        spot.SpotImages.forEach(image => {
            if (image.preview) previewImage = image.url
        })

        if (!previewImage) {
            previewImage = 'No preview image available.'
        }

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
            avgRating,
            previewImage
        }
        currentUserSpots.push(spotsInfo)
    }


    return res.json({
        Spots: currentUserSpots
    })
})

//! Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const review = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },

        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    })

    return res.json({
        Reviews: review
    })
})

//! Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const ownerId = req.user.id

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const usersBooking = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['spotId', 'startDate', 'endDate']
    })
    const ownersBooking = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] }
        ]
    })


    if (ownerId !== spot.ownerId) {
        return res.json({
            Bookings: usersBooking
        })
    } else {
        return res.json({
            Bookings: ownersBooking
        })
    }
})

//! Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotById = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'], as: 'Owner' }
        ]
    })
    if (!spotById) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const reviewCount = await Review.count({ where: { spotId: spotById.id } })
    const spotImage = await SpotImage.findAll({
        where: { spotId: spotById.id },
        attributes: ['id', 'url', 'preview']
    })
    // const user = await User.findOne({
    //     attributes: ['id', 'firstName', 'lastName']
    // })

    let avgRating = await Review.findOne({
        attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']],
        where: { spotId: spotById.id }
    })
    avgRating = avgRating.toJSON()
    const avgStars = avgRating.avgStarRating

    const spotIdInfo = {
        id: spotById.id,
        ownerId: spotById.ownerId,
        address: spotById.address,
        city: spotById.city,
        state: spotById.state,
        country: spotById.country,
        lat: spotById.lat,
        lng: spotById.lng,
        name: spotById.name,
        description: spotById.description,
        price: spotById.price,
        createdAt: spotById.createdAt,
        updatedAt: spotById.updatedAt,
        numReviews: reviewCount,
        avgStarRating: avgStars,
        SpotImages: spotImage,
        Owner: spotById.Owner
    }
    return res.json(spotIdInfo)
})

//! GET ALL SPOTS 
router.get('/', queryValidator, async (req, res, next) => {

    let { page, size } = req.query;

    if (!page || page <= 1 || isNaN(page)) page = 1
    if (!size || size <= 1 || isNaN(size)) size = 20

    if (size > 20) size = 20;

    page = parseInt(page)
    size = parseInt(size)

    let pagination = {}

    if (size >= 1 && page >= 1) {
        pagination.limit = size
        pagination.offset = size * (page - 1) // figures out what page to start at
    }

    const spots = await Spot.findAll({
        include: [
            { model: SpotImage },
            { model: Review }
        ],
        ...pagination
    })

    const allSpots = []

    for (let spot of spots) {
        const avgRating = spot.Reviews.reduce((acc, el) => {
            return acc + el.stars / spot.Reviews.length
        }, 0)

        let previewImage;
        spot.SpotImages.forEach(image => {
            if (image.preview) previewImage = image.url
        })

        if (!previewImage) {
            previewImage = 'No preview image available.'
        }
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
            avgRating,
            previewImage
        }
        allSpots.push(spotsInfo)
    }

    return res.json({
        Spots: allSpots,
        page,
        size
    })
})

//! Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const user = await User.findOne({
        where: {
            id: req.user.id,

        },
        include: [
            { model: Spot, attributes: ['id'], where: { id: req.params.spotId } }
        ]
    })
    if (!user) {
        res.status(403)
        return res.json({
            "message": "Not authorized to delete spot"
        })
    }

    if (spot) {
        await spot.destroy()
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})

module.exports = router