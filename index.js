const path = require("path");
const express = require("express");
const userRouter = require("./routes/user");
const { connectMongo } = require("./connection");

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectMongo("mongodb://localhost:27017/blogs", () => {
  console.log("Mongodb connected");
});

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/user", userRouter);

app.listen(port, () => {
  console.log("Server started. http://localhost:" + port);
});
