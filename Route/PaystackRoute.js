  const express= require('express')

  const {initializePayment,verifyPayment,paystackWebhook}=require('../Controller/PaystackController')
  const paystackRoute= express.Router()





 paystackRoute.post("/initialize",initializePayment )
 paystackRoute.get("/verify/:reference",verifyPayment );
paystackRoute.post("/webhook", express.raw({ type: "*/*" }), paystackWebhook);



  module.exports=paystackRoute