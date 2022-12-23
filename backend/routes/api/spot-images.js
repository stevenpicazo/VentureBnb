const express = require('express')

const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageById = await SpotImage.findByPk(req.params.imageId)
    
    if (!imageById) {
        res.status(404)
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    }

    if (imageById) {
        await imageById.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})


module.exports = router