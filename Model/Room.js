 const mongoose=require('mongoose')
 
 const RoomSchema= new mongoose.Schema({
   // apartment:{
   //    type:String,
   //    ref:'Apartment',
   //    required:true
   // },
    roomType:{
         type:String,
         required:true
      },
      pricePerNight:{
         type:String,
         required:true
      },
      amenities:{
         type:Array,
         required:true
      },
      images:[{
         type:String,
         required:true
      }],
      isAvailable:{
     type:Boolean,
     default:true
      }
 },{timestamps:true})
 
 
 const Room= mongoose.model('Room',RoomSchema)
 
 module.exports=Room;