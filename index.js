const express = require("express");
const http = require("http");
const path = require("path");
const { data } = require("./test");
const expressLayout = require("express-ejs-layouts");
const homeRoute = require("./routes/home.routes");
const productRoute = require("./routes/product.routes");
const userRoute = require('./routes/users.routes');
const mongoose = require("mongoose");

// console.log(http.STATUS_CODES);

//initialized app
const app = express();

app.use(expressLayout);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/upload", express.static(path.join(__dirname, "upload")));

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/Eccomerce", {
    UseNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//initialized route middleware
app.use("/", homeRoute);
app.use("/api/product", productRoute);
app.use('/api/user', userRoute);

// let index1 = path.join(__dirname, "views/index.html");
// let index3 = path.join(__dirname, "views/about.html");
// let index2 = path.join(__dirname, "views/contact.html");
// let index4 = path.join(__dirname, "views/post.html");

app.get("/api/names", (req, res) => {
  res.status(201).json({
    success: "success",
    data,
  });
});


const PORT = process.env.PORT || 1100;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost${PORT}`);
});
