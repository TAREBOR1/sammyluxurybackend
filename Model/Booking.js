const mongoose=require('mongoose')

const BookingSchema= new mongoose.Schema({
     user:{
        type:String,
        ref:'User',
        required:true
     },
     room:{
        type:String,
        ref:'Room',
        required:true
     },
   //   apartment:{
   //      type:String,
   //      ref:'Apartment',
   //      required:true
   //   },
     checkInDate:{
      type:Date,
      required:true
     },
     checkOutDate:{
      type:Date,
      required:true
     },
     totalPrice:{
      type:Number,
        required:true
     },
     guests:{
       type:Number,
        required:true
     },
     status:{
       type:String,
       enum:["pending","confirmed","cancelled"],
       default:"pending",
     },
     paymentMethod:{
       type:String,
       default:"Pay at Apartment",
           required:true
     },
     isPaid:{
      type:Boolean,
      default:false
     }
},{timestamps:true})


const Booking= mongoose.model('Booking',BookingSchema)

module.exports=Booking;