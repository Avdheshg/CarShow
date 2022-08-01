// define the router handler functions here and export them all

const { listIndexes } = require("../models/carModel");
const Car = require("../models/carModel");
const APIFeatures = require("../utils/apiFeatures");

// alias top cheap cars MW
exports.aliasTopCheapCars = (req, res, next) => {
  req.query.limit = "5";
  // req.query.sort = "price,rating";
  req.query.sort = "price";
  req.query.fields = "brand,name,price,rating";
  next();
};

// Alias route for Luxury Cars
exports.luxuryCarMW = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-price";
  req.query.fields = "brand,name,price";
  next();
};

// Alias route for efficient cars
exports.efficientCarsMW = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-mileage";
  req.query.fields = "brand, name, mileage";
  next();
};


// get All cars
exports.getAllCars = async (req, res) => {
  console.log("******* Inside Car Controller.js *******");

  /* ===============    Execute the query          =============================== */
  // const allCars = await query;
  const features = new APIFeatures(Car.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const allCars = await features.query;

  // Send  response
  res.status(200).json({
    status: "success",
    results: allCars.length,
    allCars,
  });
};

// get a Car by brands
exports.getCarByBrand = async (req, res) => {
  // console.log(req.query);
  const carByBrand = await Car.find({ brand: req.query.brand });

  res.status(200).json({
    status: "success",
    results: carByBrand.length,
    carByBrand,
  });
};

// get by name
exports.getCarByName = async (req, res) => {
  const carByName = await Car.find({ name: req.query.name });

  res.status(200).json({
    status: "success",
    carByName,
  });
};

// Creating a new Car
exports.createCar = async (req, res) => {
  console.log(req.body);
  const newCar = await Car.create(req.body);

  res.status(201).json({
    status: "success",
    newCar,
  });
};

// Update car
exports.updateCar = async (req, res) => {
  console.log(req.params);
  const updatedCar = await Car.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  console.log(updatedCar);
  res.status(200).json({
    status: "success",
    updatedCar,
  });
};

exports.deleteCar = async (req, res) => {
  console.log(req.params);
  await Car.findByIdAndDelete({ _id: req.params.id });

  res.status(204).json({
    status: "success",
  });
};
