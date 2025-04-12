const express = require("express");
// const mongoose = require("mongoosee");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the root route!");
});

app.listen(PORT, () => {
  console.log(`App is listening at PORT; ${PORT}`);
});
