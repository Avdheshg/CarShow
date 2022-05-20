const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// getting Mongoose Model and Schema for NEW CARS
const Cars = require("../models/carModel");

// console.log(process.env);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

// read the NEW CARS FILE
const newCars = JSON.parse(
  fs.readFileSync(`${__dirname}/cars.json`, "utf-8")
);

// ========  set the data to MDB ========
// new cars
const importData = async () => {
  try {
    await Cars.create(newCars);
    console.log("Data successfully loaded ***********");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete the data
const deleteData = async () => {
  try {
    await NewCars.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// console.log(process.argv);
// For Executing
//  node dev-data/data/import-dev-data.js --import
