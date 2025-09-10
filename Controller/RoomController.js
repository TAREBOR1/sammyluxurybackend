const { ImageUploadUtil } = require("../config/cloudinary");
const Room = require("../Model/Room");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.json({ success: false, message: "No files received" });
    }
    const results = [];

    for (const file of req.files) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataUrl = `data:${file.mimetype};base64,${b64}`;
      const uploadRes =await ImageUploadUtil(dataUrl)
      console.log(uploadRes)
      results.push(uploadRes.secure_url);
    }

    res.json({
      success: true,
      results,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const addRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, images, isAvailable, amenities } =
      req.body;

    // const existingRoom = await Room.findOne({ roomType });
    // if (!existingRoom) {
    //   return res.json({
    //     success: false,
    //     message: "room not found",
    //   });
    // }

    const newRoom = new Room({
      roomType,
      pricePerNight: +pricePerNight,
      images,
      isAvailable,
      amenities,
    });

    await newRoom.save();

    res.json({
      success: true,
      message: "room created successfully",
      data: newRoom,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getRoom = async (req, res) => {

  try {
     const rooms = await Room.find().sort({createdAt:-1})
     res.json({
      success:true,
      data:rooms
     })
  } catch (error) {
     res.json({
      success: false,
      message: error.message,
    });
  }
};

const toggleRoomAvailability = async (req, res) => {
  try {
       const {roomId} = req.body
       console.log(roomId)
       const roomData = await Room.findById(roomId)
       roomData.isAvailable=!roomData.isAvailable

       await roomData.save()

       res.json({
        success:true,
        message:'room availabilty Updated'
       })
  } catch (error) {
      res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addRoom,
  getRoom,
  toggleRoomAvailability,
  handleImageUpload,
};
