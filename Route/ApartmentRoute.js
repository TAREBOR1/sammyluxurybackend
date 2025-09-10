const express= require('express')
const { addApartment } = require('../Controller/ApartmentController')

const apartmentRoute= express.Router()


apartmentRoute.post('/addApartment',addApartment)

module.exports=apartmentRoute
