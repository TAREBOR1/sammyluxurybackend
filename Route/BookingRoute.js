const express = require('express')
const { checkAvailabilityApi, getBookingForUser, createBooking, getBookingForDashBoard } = require('../Controller/BookingController')

const bookingRoute = express.Router()



bookingRoute.post('/checkAvailability',checkAvailabilityApi)
bookingRoute.get('/fetch/:userId',getBookingForUser)
bookingRoute.post('/create/:UserId',createBooking)
bookingRoute.get('/fetchAdmin/:userId',getBookingForDashBoard)

module.exports=bookingRoute