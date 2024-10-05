const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRoute = express.Router();

profileRoute.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error Occured:" + err.message);
  }
});

profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName}, Your Profile Updated Successfully`);
  } catch (err) {
    res.status(400).send("Error Occured:" + err.message);
  }
});
profileRoute.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const strongPassword = validator.isStrongPassword(req.body.password);

    if (!strongPassword) {
      throw new Error("Please enter a strong password");
    } else {
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      const user = req.user;
      user.password = passwordHash;
      await user.save();

      res.send(`${user.firstName}, Your Password changed Successfully`);
    }
  } catch (err) {
    res.status(400).send("Error Occured:" + err.message);
  }
});

module.exports = profileRoute;
