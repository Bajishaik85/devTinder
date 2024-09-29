const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  emailId: String,
  password: String,
  age: { type: Number },
  gender: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
