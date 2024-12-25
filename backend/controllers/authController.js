const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// SIGNUP ROUTE
 
const signup = async (req, res) => {
  // all the email passwored username should be same like frontend
  const { email, password,  username } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: "Please Login" });
    }

    // Hash the password
    const securePassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    user = await User.create({
      // name,
      username,
      email,
      password: securePassword,
    });

    return res
      .status(201)
      .json({ success: true, message: "Signup Successful" });

  } catch (error) {
    console.error("Signup Error:", error); // Log detailed error
    return res.status(500).json({ success: false, message: "Signup error: " + error.message });
  }
};








// LOGIN ROUTE
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Please Signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id },'yJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFk', {
      expiresIn: "1h",
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ success: true, message: "Login Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGOUT ROUTE
const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER ROUTE
const getUser = async (req, res) => {
  const reqId = req.id;

  try {
    let user = await User.findById(reqId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user, message: "User found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

 
// forgotpassword route

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email + " forgetpassword");

  try {
    const generateOtp = Math.floor(Math.random() * 10000); // Generate a 4 digit OTP

    // Await the result of the find query to get the user
    let user = await User.findOne({ email }); 
    console.log("line 157");

    // Check if the user exists
    if (!user) {
      console.log("line 160");
      return res.status(400).json({ success: false, message: "Please Signup" });
    }

    // Create a transporter for sending email
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "231161df0a3ea6",
        pass: "27dfea0e227003",
      },
    });

    // Send email with OTP
    const info = await transporter.sendMail({
      from: "mauryaaaryan188@yourdomain.com", // Replace with a valid sender email
      to: email, // List of receivers
      subject: "New Otp has been generated", // Subject line
      html: `<h3>Your Generated Otp is : <i>${generateOtp}</i></h3>`, // HTML body
    });

    // Check if the email was sent successfully
    if (info.messageId) {
      console.log("Email sent successfully!");

      // Update the user's OTP in the database
      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            otp: generateOtp, // Set OTP for the user
          },
        }
      );

      // Log and send the success response
      console.log("Otp has been sent to your email");
      return res.status(200).json({ success: true, message: "Otp has been sent to your email" });
    } else {
      console.log("Failed to send email.");
      return res.status(500).json({ success: false, message: "Failed to send OTP email" });
    }
  } catch (error) {
    console.log("Error in forgotPassword function");
    console.error(error); // Log the actual error message for debugging
    return res.status(500).json({ success: false, message: error.message });
  }
};


const verifyOtp = async (req, res) => {
  const { otp, newPassword } = req.body;

  try {
    const securePassword = await bcrypt.hash(newPassword, 10);

    let user = await User.findOneAndUpdate(
      { otp },
      {
        $set: {
          password: securePassword,
          otp: 0,
        },
      }
    );

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Otp" });
    }

    return res.status(200).json({ success: true, message: "Password Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {signup, login, logout, getUser,forgotPassword, verifyOtp}


