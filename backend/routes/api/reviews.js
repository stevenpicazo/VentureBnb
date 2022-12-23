const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();

const reviewValidator = [
    check('review').exists({ checkFalsy: true }).withMessage("Review text is required"),
    check('stars').exists({ checkFalsy: true }).isLength({ min: 1, max: 5 }).withMessage( "Name must be less than 50 characters"),
    handleValidationErrors
]

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

    if (url > 10) {
        res.status(403)
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    }

    const reviewImageInfo = {
        id: image.id,
        url: image.url
    }
    console.log(reviewImageInfo)
    res.json(reviewImageInfo)

})

//! Update and return an existing review.
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewById = await Review.findByPk(req.params.reviewId)
    const { review, stars } = req.body
    
    if (!reviewById) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
      }
    
    if (reviewById) {
        if (review) reviewById.review = review
        if (stars) reviewById.stars = stars

        await reviewById.save()
        return res.json(reviewById)
    }
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

//! Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewById = await Review.findByPk(req.params.reviewId)
    console.log(reviewById)

    if (!reviewById) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if (reviewById) {
        await reviewById.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})

module.exports = router