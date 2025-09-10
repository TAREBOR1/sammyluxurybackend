const express=require('express')
const { RegisterUser, LoginUser, LogoutUser, checkAuth } = require('../Controller/AuthController')
const { Authentication } = require('../Middleware/AuthMiddleware')

const authRoute=express.Router()



authRoute.post('/register',RegisterUser)
authRoute.post('/login',LoginUser)
authRoute.post('/logout',LogoutUser)
authRoute.get('/checkAuth',Authentication,checkAuth)

module.exports=authRoute