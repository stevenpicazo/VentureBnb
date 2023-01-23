const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();

const reviewsValidate = [
    check('review')
    .not().isEmpty()
    .withMessage('Review text is required')
    .isLength({ min: 0 })
    .isLength({ max: 100 })
    .withMessage("Max character limit off 100 reached"),
    check('stars').isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

//! Add an Image to a Review based on the Review's id 
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)
    const { url } = req.body
    
    if (!review) {
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if (req.user.id !== review.userId) {
        res.status(403)
        return res.json({
            "message": "Not authorized add an image to review"
        })
    }

    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })
    if (reviewImages.length >= 10) {
        res.status(403)
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    } else {
        const image = await ReviewImage.create({
            reviewId: req.params.reviewId,
            url,
        })
    
        const reviewImageInfo = {
            id: image.id,
            url: image.url
        }
        return res.json(reviewImageInfo)
    }
})

//! Update and return an existing review.
router.put('/:reviewId', reviewsValidate, requireAuth, async (req, res, next) => {
    const reviewById = await Review.findByPk(req.params.reviewId)
    const { review, stars } = req.body
    
    if (!reviewById) {
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
      }

    if (req.user.id !== reviewById.userId) {
        res.status(403)
        return res.json({
            "message": "Not authorized to edit review"
        })
    }
    
    if (reviewById) {
        if (review) reviewById.review = review
        if (stars) reviewById.stars = stars

        await reviewById.save()
        return res.json(reviewById)
    }
})

// //! Get all Reviews of the Current User
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
    for (let info of reviewInfo) {
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
    }

    return res.json({
        Reviews: allReviews
    })
})


//! Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewById = await Review.findByPk(req.params.reviewId)

    if (!reviewById) {
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if (req.user.id !== reviewById.userId) {
        res.status(403)
        res.json({
            "message": "Not authorized to delete review"
        })
    }

    if (reviewById) {
        await reviewById.destroy()
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})

module.exports = router