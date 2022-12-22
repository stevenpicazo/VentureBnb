const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();

//! Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { review, stars } = req.body

    if (!spot) {
        res.status = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    const newReview = await Review.create({
        review,
        stars,
        spotId: spot.id
    })

    const spotReview = {
        id: newReview.review,
        stars: newReview.stars
    }

    // console.log(spotReview)

    return res.json(spotReview)

})


//! Get all Reviews of the Current User
router.get('/current', requireAuth, async(req, res, next) => {
    
    const userId = req.user.id

    const image = await SpotImage.findAll({
        attributes: ['url']
    })
    const allReviews = []
    const reviews = await Review.findAll({
        where: { userId },
        include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'], 
        include: [
            { model: SpotImage , attributes: ['preview', 'url'] }
        ]},
        { model: ReviewImage, attributes: ['id', 'url']},
      ]
    })

    const reviewInfo = []
    reviews.forEach(el => {
        reviewInfo.push(el.toJSON())
    })
    // console.log(reviewInfo)
    reviewInfo.forEach(info => {
        // console.log(info.preview)
        info.Spot.SpotImages.forEach(image => {

            if (!image.preview) {
                info.Spot.previewImage = 'No preview image available.'
            }

            if (image.preview) {
                info.Spot.previewImage = image.url
            }
        })

        delete info.Spot.SpotImages
        allReviews.push(info)
    })

    

    return res.json({
        Reviews: allReviews
    })

})





module.exports = router