const bcrypt = require('bcryptjs');
const User = require('../Model/User');
const jwt= require('jsonwebtoken')


const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      !username ||
      !email ||
      !password
    ) {
      return res.json({
        message: "details must be filled",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "User already exist with the same email, please try again",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashPassword,
      email,
    });

    await newUser.save();

    return res.status(200).json({
      message: "registration successful",
      success: true,
    });

  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        message: "details must be filled",
        success: false,
      });
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.json({
        message: "User does not exist,Please register first",
        success: false,
      });
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.json({
        message: "incorrect password! Please try again",
        success: false,
      });
    }
    const token = jwt.sign(
      { id: validUser._id,  userName:validUser.username, role: validUser.role, email: validUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    // return res.json({
    //   message: "User Logged in successfully",
    //   success: true,
      // user: {
      //   id: validUser._id,
      //   role: validUser.role,
      //   Email: validUser.Email,
      //   userName:validUser.username,
      // },
    // });
    return res.status(200).json({
      success:true,
      message:'User Logged in successfully',
      token,
      user: {
        id: validUser._id,
        role: validUser.role,
        Email: validUser.email,
        userName:validUser.username,
      },
      
    })
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    return res.json({
      message: "User Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};





const checkAuth=async(req,res)=>{
  const user=req.User
  return res.json({
    success:true,
    message:'authorised user',
    user
  })
}


module.exports={RegisterUser,LoginUser,LogoutUser,checkAuth}