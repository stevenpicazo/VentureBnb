const express = require('express')

const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const reviewImageById = await ReviewImage.findByPk(req.params.imageId)

    if (!reviewImageById) {
        res.status(404)
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
          })
    }

    const user = await User.findOne({
        where: {
            id: req.user.id,

        },
        include: [
            { model: Review, attributes: ['id'], where: { id: reviewImageById.reviewId }, 
            include: [
                { model: ReviewImage, attributes: ['id'], where: { id: req.params.imageId } }
            ]}
        ]
    })
    
    if (!user) {
        res.status(403)
        return res.json({
            "message": "Not authorized to delete image"
        })
    }

    if (reviewImageById) {
        await reviewImageById.destroy()
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})


module.exports = router;