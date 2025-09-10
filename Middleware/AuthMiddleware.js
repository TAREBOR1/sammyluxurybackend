const jwt=require('jsonwebtoken')

// const Authentication=async(req,res,next)=>{
//     const token=req.cookies.token;
//     if(!token){
//         return res.status(401).json({
//             message:'unauthorised user',
//             success:false
//         })
//     }
// try {

//     const tokenDecode=jwt.verify(token,process.env.SECRET_KEY)
//     req.User=tokenDecode
//     next()
    
// } catch (error) {
//     return res.json({
//         message:error.message,
//         success:false
//     })
// }
// }

// FOR FREE HOSTING

const Authentication=async(req,res,next)=>{
    const authHeaders=req.headers['authorization'];
    const token=authHeaders && authHeaders.split(' ')[1]
    if(!token){
        return res.json({
            message:'unauthorised user',
            success:false
        })
    }
try {

    const tokenDecode=jwt.verify(token,process.env.SECRET_KEY)
    req.User=tokenDecode
    next()
    
} catch (error) {
    return res.json({
        message:error.message,
        success:false
    })
}
}

module.exports= {Authentication}