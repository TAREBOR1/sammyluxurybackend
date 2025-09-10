const express = require('express')
const app=express();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./Route/AuthRoute');
const apartmentRoute = require('./Route/ApartmentRoute');
const roomRoute = require('./Route/RoomRoute');
const bookingRoute = require('./Route/BookingRoute');
const userRoute = require('./Route/UserRoute');
const paystackRoute = require('./Route/PaystackRoute');

app.use(express.json())



app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],credentials:true
}))
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/apartment',apartmentRoute)
app.use('/api/room',roomRoute)
app.use('/api/booking',bookingRoute)
app.use('/api/user',userRoute)



//pay stack api

app.use('/api/paystack',paystackRoute)



module.exports=app