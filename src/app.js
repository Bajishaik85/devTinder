const express = require("express");
console.log("Starting New Project!");
const app = express();
app.use("/", (req, res) => {
  res.send("Hello From Server");
});
app.use("/test", (req, res) => {
  res.send("Hello From Test");
});

app.listen(5000, () => console.log("Server Running On Port 5000"));
