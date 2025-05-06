const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const Course = require("./model/course.js");

const app = express();
const PORT = 3000;

const MongoURL = "mongodb://127.0.0.1:27017/alhaseebinstitute";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`DB_Error ----- ${err}`);
  });

async function main() {
  await mongoose.connect(MongoURL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);

app.get("/", async (req, res) => {
  // res.send("Welcome to the root route!");
  const courses = await Course.find();

  // console.log(courses);
  res.render("index.ejs", { courses });
});

app.get("/courses/:id", async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  const allCourses = await Course.find();
  // res.send("Welcome to the course route!");
  res.render("course.ejs", { course, allCourses });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/new", async (req, res) => {
  const newCourse = Course.insertOne(req.body.course);

  await newCourse.save;
  console.log(newCourse);
  res.redirect("/");
});

app.get("/courses/:id/edit", async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  res.render("edit.ejs", { course });
});

app.post("/courses/:id", async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(id, req.body.course);
  await course.save;
  res.redirect(`/courses/${id}`);
});

// Plans route
app.get("/plans", (req, res) => {
  res.render("plans.ejs");
});

app.listen(PORT, () => {
  console.log(`App is listening at PORT: ${PORT}`);
});
