
const express = require("express");
const carController = require("../controllers/carController");

const router = express.Router();

router
    .route("/getAllCars")
    .get(carController.getAllCars)
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


















