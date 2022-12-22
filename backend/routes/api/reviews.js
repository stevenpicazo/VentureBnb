const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();

//! Add an Image to a Review based on the Review's id 
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)
    const { url } = req.body
    
    if (!review) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    const image = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url,
    })
    const reviewImageInfo = {
        id: image.id,
        url: image.url
    }
    // console.log(reviewImageInfo)
    res.json(reviewImageInfo)

})



//! Get all Reviews of the Current User
router.get('/current', requireAuth, async(req, res, next) => {
    const userId = req.user.id
    const allReviews = []
    const reviews = await Review.findAll({
        where: { userId },
        include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'], 
        include: [
            { model: SpotImage , attributes: ['preview', 'url'], 
            where: {
                preview: true
            }}
        ]},
        
        { model: ReviewImage, attributes: ['id', 'url']},
      ]
    })

    const reviewInfo = []
    reviews.forEach(el => {
        reviewInfo.push(el.toJSON())
    })
    reviewInfo.forEach(info => {
        // console.log(info)
        info.Spot.SpotImages.forEach(image => {
            // console.log(image)
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
    // console.log(allReviews)

    return res.json({
        Reviews: allReviews
    })
})

module.exports = router