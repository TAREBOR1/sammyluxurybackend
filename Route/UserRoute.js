const express= require('express');
const { getUserById } = require('../Controller/UserController');


const userRoute= express.Router()


userRoute.get('/userDetail/:userId',getUserById)

module.exports=userRoute
