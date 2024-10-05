const express = require("express");
const connectDb = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const User = require("./models/user");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //Validation of Data
    validateSignUpData(req);
    //Hash the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //Creating a new User instance of User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added");
  } catch (err) {
    res.status(400).send("Error in saving the data:" + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    //Hash the password
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email not present in the DB");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      const cookie = res.cookie("token", token, {
        expires: new Date(Date.now() + 52 * 3600000),
      });
      res.send("User LoggedIn Successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error in saving the data:" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
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

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log(user.firstName + " Sent you a request");
});

connectDb()
  .then(() => {
    app.listen(5000, () => console.log("Server Running On Port 5000"));
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Error in Connection");
  });
