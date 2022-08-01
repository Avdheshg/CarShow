
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

const carRouter = require("./routes/carRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// console.log(process.env.DATABASE);

app.use((req, res, next) => {
    // console.log(req.headers);
    next();
})
 

// Connecting to the DB
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
    // useUnifiedTopology: true,
}).then(con => {
    console.log("DATABASE connection successfull");
})

app.use("/", carRouter);
app.use("/user", userRouter);

// Defining a MW for undefined routes   
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail", 
        messgae: `Can't find ${req.originalUrl} on this server`
    });
});




// const port = 4000;
// app.listen(port, () => {
//     console.log(`Cars App is running on the port: ${port}`);
// })

module.exports = app;


// Start with 12. Note down all the queries 












































