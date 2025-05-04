const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = Schema({
  name: {
    type: String,
    requied: true,
  },
  image: {
    type: String,
    default: "deamo-img.png",
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tutor: {
    type: String,
    requied: true,
  },
});

const Course = mongoose.model("course", CourseSchema);

module.exports = Course;
