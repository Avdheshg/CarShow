
// define the router handler functions here and export them all 

const { listIndexes } = require("../models/carModel");
const Car = require("../models/carModel");

// alias top cheap cars MW
exports.aliasTopCheapCars = (req, res, next) => {
    req.query.limit = "5";
    // req.query.sort = "price,rating";
    req.query.sort = "price";
    req.query.fields = "brand,name,price,rating";
    next();
}

// Alias route for Luxury Cars
exports.luxuryCarMW = (req, res, next) => {
    req.query.limit = "5";
    req.query.sort = "-price";
    req.query.fields = "brand,name,price";
    next();  
} 

// Alias route for efficient cars
exports.efficientCarsMW = (req, res, next) => {
    req.query.limit = "5";
    req.query.sort = "-mileage";
    req.query.fields = "brand, name, mileage";
    next();
}

// get All cars
exports.getAllCars = async (req, res) => {
    console.log("******* Inside Car Controller.js *******");

    /* ===============    Build the query          =============================== */
    /* 14: Making API filtering better: Filtering */
    let queryObj = {...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    /* 15: Advanced Filtering */
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    queryObj = JSON.parse(queryStr);

    let query = Car.find(queryObj);
    // let query = Car.find(queryObj, {name: 1, brand: 1, price: 1});

    /* 16: SORTING */
    if (req.query.sort) {
        // queryStr => getAllCars?brand=Maruti%20Suzuki&sort=price,mileage
        // console.log(req.query.sort);
        // console.log(typeof req.query.sort);
        let sortBy = req.query.sort.split(',').join();
        console.log(sortBy);
        console.log(typeof sortBy);

        query = query.sort(sortBy);

        // const allCarsSorted = await Car.find().sort("price").select("brand name price");
        // console.log(allCarsSorted);

    } else {
        query = query.sort("price");
    }

    /* 17: Fields Limiting: PROJECTION */
    if (req.query.fields) {
        // queryStr = getAllCars?brand=Tata&fields=price,name,brand
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
    } else {
        query.select("-__v");
    }

    /* 18: PAGINATION */
   const page = req.query.page * 1 || 1;  
   const limit = req.query.limit * 1 || 100;   
   const skip = (page-1) * limit;   // (X)

   query = query.skip(skip).limit(limit);
  
   if (req.query.page) {
        const numCars = await Car.countDocuments();
        if (skip >= numCars) {
            return res.status(400).json({
                status: "fail",
                message: "This page doesn't exists"
            })
        }
    }

    /* 19: Route Aliasing */
    /*
        A route which is frequently visited => top 5 cars with best rating and cheapest price
            queryStr = allCars?limit=5&sort=-rating,price (M)
        top 5 cars with cheapest price and best rating 
            queryStr = allCars?limit=5&sort=price&rating (N)

        To implement this:
            define  a new route, "top-5-cheap-cars"
            on this route create a queryStr manually
            use this queryStr and call getAllCars

        Basically what V R doing here is that V R creatig the query string manually(as used M and N) and provide this hard coded string to "getAllCars" route handler
    */
    


    /* ===============    Execute the query          =============================== */
    const allCars = await query;
    
    // Send  response
    res.status(200).json({
        status: "success",
        results: allCars.length,
        allCars
    })
}

// get a Car by brands
exports.getCarByBrand = async (req, res) => {
    // console.log(req.query);
    const carByBrand = await Car.find({brand: req.query.brand})

    res.status(200).json({
        status: "success",
        results: carByBrand.length,
        carByBrand
    })
}

// get by name
exports.getCarByName = async (req, res) => {
    const carByName = await Car.find({name: req.query.name});

    res.status(200).json({
        status: "success",
        carByName
    })
}

// Creating a new Car
exports.createCar = async (req, res) => {
    console.log(req.body);
    const newCar = await Car.create(req.body);

    res.status(201).json({
        status: "success",
        newCar
    })
}

// Update car
exports.updateCar = async (req, res) => {
    console.log(req.params);
    const updatedCar = await Car.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});

    console.log(updatedCar);
    res.status(200).json({
        status: "success",
        updatedCar
    })
}

exports.deleteCar = async (req, res) => {
    console.log(req.params);
    await Car.findByIdAndDelete({_id: req.params.id});

    res.status(204).json({
        status: "success"
    })
}

























