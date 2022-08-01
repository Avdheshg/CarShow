
const express = require("express");
const carController = require("../controllers/carController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Alias routing  => Top cheap cars
router
    .route("/getAllCars/top-5-cheap-cars")
    .get(carController.aliasTopCheapCars, carController.getAllCars);

// top 5 luxury cars(expensive)
router
    .route("/getAllCars/top-5-luxury-cars")
    .get(carController.luxuryCarMW, carController.getAllCars);

// top 5 fuel efficient cars
router
    .route("/getAllCars/top-5-efficient-cars")
    .get(carController.efficientCarsMW, carController.getAllCars);


router
    .route("/getAllCars")
    .get(authController.protect, carController.getAllCars)
    // .get(carController.getAllCars)
    .post(carController.createCar)

router
    .route("/getByBrand")
    .get(carController.getCarByBrand)

router
    .route("/getByName")
    .get(carController.getCarByName)

// ******* Using IDs **************  
router
    .route("/:id")
    .patch(carController.updateCar)
    .delete(carController.deleteCar)


module.exports = router;


















