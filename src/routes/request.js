const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log(user.firstName + " Sent you a request");
});
module.exports = requestRouter;
