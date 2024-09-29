const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Baji",
    lastName: "Shaik",
    emailId: "baji@shaik.com",
    age: 22,
    gender: "Male",
  });

  try {
    await user.save();
    res.send("User Added");
  } catch (error) {
    res.status(400).send("Error in saving the data:" + err.message);
  }
});

connectDb()
  .then(() => {
    app.listen(5000, () => console.log("Server Running On Port 5000"));
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Error in Connection");
  });
