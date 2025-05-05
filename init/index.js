const mongoose = require("mongoose");
const { data } = require("./data.js");
const Course = require("../model/course.js");

const MongoURL = "mongodb://127.0.0.1:27017/alhaseebinstitute";

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
    console.log(`Something happend whie initilization of data.`);
  });

async function initilizeData() {
  await Course.deleteMany();
  const insertedData = await Course.insertMany(data);
  console.log(insertedData);
}
