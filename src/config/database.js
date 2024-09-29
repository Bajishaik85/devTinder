const mongoose = require("mongoose");

const connectDB = async function main() {
  await mongoose.connect(
    "mongodb+srv://gofood:gofood2001@cluster0.736b5l3.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
