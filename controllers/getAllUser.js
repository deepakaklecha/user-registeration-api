const userModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users) {
      return res
        .status(200)
        .send({ success: true, message: "No user in database" });
    }
    res.status(200).send({
      success: true,
      message: "users fetched successfully",
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `error.message` });
  }
};

module.exports = getAllUsers;
