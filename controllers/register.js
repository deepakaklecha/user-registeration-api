const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

require("dotenv").config();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const register = async (req, res) => {
  try {
    const { name, email, password, profilePicture } = req.body;

    // input required validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    // Validation checks for image
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"]; // Specifying the allowed file formats
    const maxSize = 2 * 1024 * 1024; // Specifying the maximum file size (2MB)

    if (!allowedFormats.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file format" });
    }

    if (req.file.size > maxSize) {
      return res.status(400).json({ error: "File size exceeds the limit" });
    }

    // checking user already registered or not
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(401)
        .send({ success: false, message: "User already exist" });
    }

    // hashing user's pswd
    const hashPassword = await bcrypt.hash(password, 10);

    // creating user
    const newUser = await new userModel({
      name,
      email,
      password: hashPassword,
      profilePicture,
    });

    // uploading image
    newUser.profilePicture = `uploads/${req.file.filename}`;

    await newUser.save();

    // Send email confirmation
    const verificationLink = `http://localhost:3000/verify?email=${encodeURIComponent(
      email
    )}`;
    const mailOptions = {
      from: "deepakaklecha2020@gmail.com",
      to: email,
      subject: "Email Confirmation",
      html: `<p>Thank you for registering!</p><p>Please click the following link to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).send({
      success: true,
      message: "User registered successfully",
      result: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `error in register ${error.message}` });
  }
};

module.exports = register;
