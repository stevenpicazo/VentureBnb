const express = require('express')

const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

//! 

//! Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const userBooking = []
    const bookings = await Booking.findAll({
        where: { userId },
        include: [
            { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'], 
            include: [
                { model: SpotImage , attributes: ['preview', 'url'], 
                where: {
                    preview: true
                }}
            ]},
        ]
    })
    const bookingsInfo = []
    bookings.forEach(el => {
        bookingsInfo.push(el.toJSON())
    })
    bookingsInfo.forEach(info => {
        info.Spot.SpotImages.forEach(image => {
            if (!image.preview) {
                info.Spot.previewImage = 'No preview image available.'
            }

            if (image.preview) {
                info.Spot.previewImage = image.url
            }
        })

        delete info.Spot.SpotImages
        userBooking.push(info)
    })
    // console.log(userBooking)

    return res.json({
        Bookings: bookingsInfo
    })
})




module.exports = router