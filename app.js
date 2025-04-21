const express = require("express");
// const mongoose = require("mongoosee");
const path = require("path");
const ejsMate = require("ejs-mate");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  // res.send("Welcome to the root route!");
  res.render("index.ejs");
});

app.get("/courses", (req, res) => {
  // res.send("Welcome to the course route!");
  res.render("course.ejs");
});

app.listen(PORT, () => {
  console.log(`App is listening at PORT: ${PORT}`);
});
