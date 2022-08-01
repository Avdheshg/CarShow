
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        // required: [true, "A car must have a brand"]
    },
    name: {
        type: String,
        unique: true,
        trim: true,
        // required: [true, "A car must have a name"]
    },
    price: {
        type: Number,
        // required: [true, "A car must have a price"]
    },
    rating: Number,
    bodyType: {
        type: String,
        // required: [true, "A car must have a body type"]
    }, 
    mileage: {
        type: String,
        // required: [true, "A car must have a mileage"]
    },
    engine: {
        type: Number,
        // required: [true, "A car must have a engine"]
    },
    transmission: {
        type: String,
        default: "Automatic"
        // required: [true, "A car must have a transmission"]
    },
    fuelType: {
        type: String,
        select: false,   // now this will not be sent to the client or V will not see if V make any request to the route
        // required: [true, "A car must have a fuelType"]
    },
    seatingCapacity: {
        type: Number, 
        // required: [true, "A car must have a seatingCapacity"],
    },
    summary: {
        type: String,
        trim: true,
    },
    good: [String],
    bad: [String],
    images: [String],
    secretCar: {
        type: Boolean,
        default: false
    }
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;












































