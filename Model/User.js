const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({
     username:{
        type:String,
        unique:true,
        required:true
     },
     email:{
        type:String,
        unique:true,
        required:true
     },
     image:{
        type:String,
        default:"Y"
     },
     password:{
        type:String,
        required:true
     },
     role:{
        type:String,
       default:'user'
     },
     recentSearchedApartment:[{
        type:String,
        required:true
     },],
},{timestamps:true})


const User= mongoose.model('User',UserSchema)

module.exports=User;