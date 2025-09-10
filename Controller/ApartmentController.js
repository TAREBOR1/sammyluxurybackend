const Apartment = require("../Model/Apartment")


const addApartment=async(req,res)=>{
          
    try {
        const {name,address,contact,city,owner}=req.body
        if(!name||!address||!contact||!city||!owner|| owner===''||city===''||name===''||address===''||contact===''){
          return  res.json({
                success:false,
                message:'form should be filled'
            })
        }
       const apartment= await Apartment.findOne({name})
       if(apartment){
        return res.json({
               success:false,
                message:'apartment already added'
        })
       }
       const addApartment = new Apartment({
        name,
        address,
        contact,
        city,
        owner
       })
      await addApartment.save();

      res.json({
        success:true,
        message:"apartment added successfully",
        data:addApartment
      })
      
    } catch (error) {
         res.json({
            success:false,
            message:error.message
         }) 
    }
}

module.exports={addApartment}