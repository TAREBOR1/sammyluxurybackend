const axios = require('axios');
const crypto = require('crypto');
const Booking = require("../Model/Booking");
const Room = require("../Model/Room");
const User = require('../Model/User')

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_TEST_SECRET_KEY;

/**
 * @desc Initialize a transaction
 * @route POST /api/paystack/initialize
 */



 const initializePayment = async (req, res) => {
  try {
    // const { email, amount } = req.body;

      const {bookingId, userId}=req.body;
      console.log('oy aooooh',bookingId, userId)
    const user = await User.findById(userId);
    if (!user){
         return res.status(404).json({ error: "User not found" });
    } 
     const booking= await Booking.findById(bookingId)
     const roomData= await Room.findById(booking.room);
     const totalPrice=booking.totalPrice;
     const {origin}= req.headers;

    const paymentData={
  email: user.email,
  amount: totalPrice*100,
  currency: "NGN", // Default is NGN
  callback_url: `${origin}/payment-success`,
  metadata: {
    userId,
    bookingId,
    custom_fields: [
      {
        display_name: "Full Name",
        variable_name: "full_name",
        value: user.username
      },
      {
        display_name: "Booking ID",
        variable_name: "booking_id",
        value: bookingId
      },
      {
        display_name: "Room Type",
        variable_name: "room_type",
        value: roomData.roomType
      }
    ]
  }
}

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
    paymentData,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};

/**
 * @desc Verify a transaction
 * @route GET /api/paystack/verify/:reference
 */
const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    // TODO: Update your DB payment status here
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
 
/**
 * @desc Handle Paystack Webhooks
 * @route POST /api/paystack/webhook
 */
  const paystackWebhook = async (req, res) => {
  try {
  
    const signature = req.headers["x-paystack-signature"];

    // Verify signature
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== signature) {
      console.log("❌ Invalid Paystack signature");
      return res.status(401).send("Invalid signature");
    }

    const event = req.body;

    console.log("✅ Paystack Event Received:", event.event);

    if (event.event === "charge.success") {
      const { reference, amount, customer } = event.data;

      console.log("💰 Payment Success:", reference, amount, customer.email);

      // Get booking & user IDs from metadata (best practice)
      const { bookingId, userId } = event.data.metadata || {};

      if (bookingId && userId) {
        const user = await User.findById(userId);

        if (user) {
          await Booking.findByIdAndUpdate(bookingId, {
            $set: { paymentMethod: "paystack", isPaid: true },
          });
          console.log("✅ Booking updated successfully");
        } else {
          console.log("⚠️ User not found for webhook event");
        }
      } else {
        console.log("⚠️ Metadata missing, cannot update booking");
      }
    }

    // Always acknowledge receipt to stop retries
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.sendStatus(200); // still respond 200 so Paystack doesn’t keep retrying
  }
};

  module.exports={initializePayment,verifyPayment,paystackWebhook};