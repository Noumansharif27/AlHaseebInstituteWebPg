const mongoose = require("mongoose");
const { data } = require("./data.js");
const Course = require("../model/course.js");

const MongoURL = "mongodb://127.0.0.1:27017/alhaseebinstitute";
// "mongodb+srv://noumansharifgul27:ZNOyvcs1YApA2TkE@nouman.laq4ja9.mongodb.net/?retryWrites=true&w=majority&appName=nouman";

main()
  .then(() => {
    console.log("connected to db.");
  })
  .catch((err) => {
    console.log(`DB-ERR ------- ${err}`);
  });

async function main() {
  await mongoose.connect(MongoURL);
}

initilizeData()
  .then(() => {
    console.log("Data was Initilized.");
  })
  .catch((err) => {
    console.log(`The following Error occure while performing the task: ${err}`);
  });

async function initilizeData() {
  await Course.deleteMany();
  const insertedData = await Course.insertMany(data);
  console.log(insertedData);
}
