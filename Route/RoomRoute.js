 const express = require('express')
const { upload } = require('../config/cloudinary')
const { handleImageUpload, addRoom, getRoom, toggleRoomAvailability } = require('../Controller/RoomController')
  
 const roomRoute = express.Router()


 roomRoute.post('/uploadImages',upload.array("my_file",4),handleImageUpload)
 roomRoute.post('/addRoom',addRoom)
 roomRoute.get('/getRoom',getRoom)
 roomRoute.post('/toggle',toggleRoomAvailability)

 module.exports=roomRoute