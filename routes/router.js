const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const { upload } = require("../middleware/multer");
const getAllUsers = require("../controllers/getAllUser");

//user register
// endpoint- localhost:8000/api/register
router.post("/register", upload.single("profilePicture"), register);

// get all users
// endpoint- localhost:8000/api/getAllUsers
router.get("/getAllUsers", getAllUsers);

module.exports = router;
