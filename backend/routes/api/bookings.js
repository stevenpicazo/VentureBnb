const express = require('express')

const { User, Spot, SpotImage, Session, Booking, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');

const router = express.Router();

//! Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingById = await Booking.findByPk(req.params.bookingId)
    
    if (!bookingById) {
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    if (req.user.id !== bookingById.userId) {
        res.status(403)
        return res.json({
            "message": "Not authorized to edit booking."
        })
    }

    const { startDate, endDate } = req.body
    const newStartingDate = new Date(startDate)
    const newEndingDate = new Date(endDate)
        
    if (newEndingDate <= newStartingDate) {
        res.status(400)
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
              endDate: "endDate cannot be on or before startDate",
            },
          })
    }

    const booking = await Booking.findOne({
        //! checking if bookings have dates that overlap with each other
        where: {
            spotId: bookingById.spotId,
            startDate: { [Op.lte]: newEndingDate },
            endDate: { [Op.gte]: newStartingDate },
            id: { [Op.not]: bookingById.id }, // allows for current user bookings to be edited (excludes current booking by id)
            id: { [Op.ne]: req.params.bookingId } // allows for current booking to be edited without receiving a conflicting error 
          }
    })

    let conflictingDatesErrors = {}
    if (booking) {
        res.status(403)
        if (booking.startDate >= newStartingDate && booking.startDate < newEndingDate) {
            conflictingDatesErrors.startDate = "Start date conflicts with an existing booking"

        } 
        if (booking.endDate > newStartingDate && booking.endDate <= newEndingDate) {
            conflictingDatesErrors.endDate = "End date conflicts with an existing booking"

        } else {
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                  }
            })
        }

        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": conflictingDatesErrors
        })

    }
    
    if (new Date() > newEndingDate) {
        res.status(403)
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    }
 
    if (startDate) bookingById.startDate = startDate
    if (endDate) bookingById.endDate = endDate
    await bookingById.save()

    return res.json(bookingById)
    
})

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
    for (let info of bookingsInfo) {
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
    }

    return res.json({
        Bookings: bookingsInfo
    })
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingById = await Booking.findByPk(req.params.bookingId)

    if (!bookingById) {
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    if (req.user.id !== bookingById.userId && req.user.id !== bookingById.spotId) {
        res.status(403)
        return res.json({
            "message": "Not authorized to delete booking."
        })
    }

    if (new Date(bookingById.startDate).getTime() <= new Date().getTime() 
        && new Date(bookingById.endDate).getTime() >= new Date().getTime()) {
        
        res.status(403)
        return res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    }

    if (bookingById) {
        await bookingById.destroy()
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})


module.exports = router