const {  BOOKING_CONFIRMATION_TEMPLATE } = require("../config/emailtemplate");
const transporter = require('../config/nodemailer');
const Apartment = require("../Model/Apartment");
const Booking = require("../Model/Booking");
const Room = require("../Model/Room");
const User = require('../Model/User');


const checkAvailability = async ({ room, checkInDate, checkOutDate }) => {
  try {
    const booking = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    const isAvailable = booking.length === 0;

    return isAvailable;
  } catch (error) {
    console.log(error.message);
  }
};

const checkAvailabilityApi = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      room,
      checkInDate,
      checkOutDate,
    });
    res.json({
      success: true,
      isAvailable,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    //   const User = req.user._id   don't forget to fix your authentication
    const { UserId } = req.params;
     const user = await User.findById(UserId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const email = user.email;
    const isAvailable = await checkAvailability({
      room,
      checkInDate,
      checkOutDate,
    });
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Room not available",
      });
    }
// 
    // const roomData = await Room.findById(room).populate("apartment");
      const roomData = await Room.findById(room)
    let totalPrice = roomData.pricePerNight;

    //    to get the number of days spent in the room
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (24 * 3600 * 1000));

    totalPrice *= nights;

    const booking = new Booking({
      user: UserId,
      room,
      // apartment: roomData.apartment._id,
      checkInDate,
      checkOutDate,
      totalPrice,
      guests: +guests,
    });

const mailOptions = {
  from: process.env.MAIL_USER,
  to: email,
  subject: "Booking Confirmation",
  html: BOOKING_CONFIRMATION_TEMPLATE
    .replace("{{user}}", user.username)
    .replace("{{booking}}", booking._id || "N/A")
    .replace("{{roomType}}", roomData?.roomType || "N/A")
    .replace("{{checkIn}}", checkInDate)
    .replace("{{checkOut}}", checkOutDate)
    .replace("{{guests}}", guests)
    .replace("{{totalPrice}}", totalPrice)
    .replace("{{year}}", new Date().getFullYear()),
};

  

    await transporter.sendMail(mailOptions);
    await booking.save();

    res.json({
      success: true,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

const getBookingForUser = async (req, res) => {
  try {
    // don't forget to add apartment
    const { userId } = req.params;

    const bookings = await Booking.find({user:userId}).sort({createdAt:-1})
      .populate("room")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};

const getBookingForDashBoard = async (req, res) => {
      const { userId } = req.params;
      const apartmentee= await Apartment.findOne({owner:userId})
      console.log('oyoy',apartmentee)
  try {
    if(!apartmentee){
      return res.json({
        success:false,
        message:'No apartment found'
      })
    }
    const bookings = await Booking.find({apartment:apartmentee?._id})
      .populate("room user apartment")
      .sort({ createdAt: -1 });
    if (!bookings) {
      res.json({
        success: false,
        message: "no record found",
      });
    }
    const totalBooking = bookings.length;
    const totalRevenue = Booking.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      dashBoardData: { totalBooking, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};

// const paystackPayment = async(req,res)=>{
//   try {
//      const {bookingId}=req.params;
//      const booking= await Booking.findById(bookingId)
//      const roomData= await Room.findById(booking.room);
//      const totalPrice=booking.totalPrice;

//      const {origin}= req.header

    
//   } catch (error) {
    
//   }

// };

module.exports = {
  checkAvailabilityApi,
  createBooking,
  getBookingForUser,
  getBookingForDashBoard,
};
