const express = require("express");
const connectDb = require("./config/database");
const app = express();

const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added");
  } catch (err) {
    res.status(400).send("Error in saving the data:" + err.message);
  }
});
//Get user by Email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User Not FOund");
    } else {
      res.send(user);
    }

    // if (users.length === 0) {
    //   res.status(404).send("User Not FOund");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Error Occured" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const feedData = await User.find({});
    if (feedData.length === 0) {
      res.status(404).send("No Feed Found");
    } else {
      res.send(feedData);
    }
  } catch (err) {
    res.status(400).send("Error Occured" + err.message);
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    if (!userId) {
      res.status(404).send("No Id Found");
    } else {
      const user = await User.findByIdAndDelete({ _id: userId });
      if (!user) {
        // If no user is found to delete, return a 404 response
        res.status(404).send("User Not Found");
      } else {
        // If a user was found and deleted, send success response
        res.send("User Deleted");
      }
    }
  } catch (err) {
    res.status(400).send("Error Occured " + err.message);
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    if (data?.skills.lenght > 50) {
      throw new Error("Skills are more than 50");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User Updated");
  } catch (err) {
    res.status(400).send("Error Occured " + err.message);
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
