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
    const userId = req.user.id
    const { startDate, endDate } = req.body
    if (!bookingById) {
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    const startDate2 = new Date(startDate);
    const endDate2 = new Date(endDate);
    
    if (endDate2 <= startDate2) {
        res.status(400)
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
              endDate: "endDate cannot be on or before startDate",
            },
          })
    }

    const bookings = await Booking.findAll({
        //! checking if bookings have dates that overlap with each other
        where: {
            spotId: req.params.bookingId,
            startDate: { [Op.lte]: endDate },
            endDate: { [Op.gte]: startDate}
        }
    })
    if (bookings) {
        res.status(403)
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }
          })
    }






    // bookings.forEach(booking => {
    //     if ((startDate >= booking.startDate && endDate >= booking.startDate) && (startDate <= booking.endDate && endDate <= booking.endDate)) {
    //         res.status(403)
    //         res.json({
    //             "message": "Sorry, this spot is already booked for the specified dates",
    //             "statusCode": 403,
    //             "errors": {
    //               "startDate": "Start date conflicts with an existing booking",
    //               "endDate": "End date conflicts with an existing booking"
    //             }
    //           })


    //     } else if (startDate <= booking.startDate && endDate >= booking.startDate) {
    //         res.status(403)
    //         res.json({
    //             "message": "Sorry, this spot is already booked for the specified dates",
    //             "statusCode": 403,
    //             "errors": {
    //               "startDate": "Start date conflicts with an existing booking",
    //               "endDate": "End date conflicts with an existing booking"
    //             }
    //           })


    //     } else if (startDate <= booking.endDate && endDate >= booking.endDate) {
    //         res.status(403)
    //         res.json({
    //             "message": "Sorry, this spot is already booked for the specified dates",
    //             "statusCode": 403,
    //             "errors": {
    //               "startDate": "Start date conflicts with an existing booking",
    //               "endDate": "End date conflicts with an existing booking"
    //             }
    //           })
    //     }
    // })
  

    if (bookingById) {
        if (startDate) bookingById.startDate = startDate
        if (endDate) bookingById.endDate = endDate
        await bookingById.save()
    
        return res.json(bookingById)
    }

    if (new Date() > endDate2) {
        res.status(403)
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
        
    }

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

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingById = await Booking.findByPk(req.params.bookingId)
    console.log(bookingById)

    if (!bookingById) {
        res.status(404)
        res.json({
            "message": "booking couldn't be found",
            "statusCode": 404
          })
    }


    if (bookingById) {
        await bookingById.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})


module.exports = router