const express = require("express");
console.log("Starting New Project!");
const app = express();

//This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Baji Shaik", Course: "Node JS" });
});
app.post("/user", (req, res) => {
  res.send("Data Saved Succesfully to the Database");
});

app.delete("/user", (req, res) => {
  res.send("User Deleted!");
});

//this will match all the HTTP method API calls
app.use("/test", (req, res) => {
  res.send("Hello From Test");
});

app.use("/", (req, res) => {
  res.send("Hello From Server");
});
app.listen(5000, () => console.log("Server Running On Port 5000"));
