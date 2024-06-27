const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectId;

const app = express();
app.use(express.json());
mongoose.set("strictQuery", false);
app.use(cors());

//************mongodb connect */
mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewURLParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

var conn = mongoose.connection;

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

//**************insert data to database */
app.post("/ins", function (req, res) {
  const fdata = req.body.fdata;
  conn.collection("form_data").insertOne(fdata, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("inserted");
      res.status(202).send("success");
    }
  });
});
app.listen(4000, () => {
  console.log("server running at 4000");
});

//***************get data from database  */
app.get("/", (req, res) => {
  conn
    .collection("form_data")
    .find({})
    .toArray((err, result) => {
      if (err) res.status(400).send("error fetching data");
      res.json(result);
    });
});

// *********** delete data ***********
app.post("/delete", (req, res) => {
  console.log(req.body.id);
  let id = req.body.id;
  conn
    .collection("form_data")
    .deleteOne({ _id: ObjectId(id) })
    .then((result) => {
      if (result.deletedCount === 0) {
        console.log("record not deleted");
        res.status(404).send("No record found");
      } else {
        console.log("deleted");
        res.status(204).send("success");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

// get data for updated
app.post("/get", (req, res) => {
  let id = req.body.id;
  console.log(id);
  conn
    .collection("form_data")
    .find({ _id: ObjectId(id) })
    .toArray((err, result) => {
      if (err) res.status(400).send("error fetching data");
      res.json(result);
      console.log(result);
    });
});

//******update data *********************/
app.post("/update", (req, res) => {
  console.log(req.body);
  let id = req.body._id;
  let title = req.body.title;
  let content = req.body.content;
  let vediolink = req.body.vediolink;
  let author = req.body.author;
  console.log(id);
  console.log(title);
  console.log(content);
  console.log(vediolink);
  console.log(author);
  conn
    .collection("form_data")
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { title: title, content: content, vediolink: vediolink, author: author } }
    )
    .then((result) => {
      if (result.modifiedCount === 0) {
        console.log("record not updated");
        res.status(404).send("No record found or no changes made");
      } else {
        console.log("updated");
        res.status(204).send("success");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

// Register User
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user");
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid username or password");
    }

    const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error logging in user");
  }
});
