const path = require("path");
const express = require("express");
const { connectMongo } = require("./connection");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middlewares/auth");

const app = express();
const port = 8000;

// Routers
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const Blog = require("./models/blogs");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectMongo("mongodb://localhost:27017/blogs", () => {
  console.log("Mongodb connected");
});

// routes
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find();
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
  console.log(req.user);
});
app.use("/user", userRouter);
app.use("/blogs", blogRouter);

app.listen(port, () => {
  console.log("Server started. http://localhost:" + port);
});
