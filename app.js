const express = require("express");
// const mongoose = require("mongoosee");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // res.send("Welcome to the root route!");
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`App is listening at PORT; ${PORT}`);
});
