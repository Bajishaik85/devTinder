const express = require("express");
const connectDb = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("../src/routes/auth");
const profileRoute = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRoute);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDb()
  .then(() => {
    app.listen(5000, () => console.log("Server Running On Port 5000"));
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Error in Connection");
  });
