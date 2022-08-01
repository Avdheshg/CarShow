

const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const {promisify} = require('util');

exports.signup = async (req,res, next) => {
    
    try {
        // const newUser = await User.create(req.body);
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })

       const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}); 

        res.status(201).json({
            status: "success",
            token,    // here V have send the above created token to the client
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            err
        })
    }
};

/* Logging user in */
exports.login = async (req, res, next) => {
    const {email, password} = req.body;   // using object desctructuring

    // *******  1. check if the user and password exists     *******
    if (!email || !password) {
        return res.status(400).json({
            message: "please provide email and password"
        })
    }

    //  *******   2. check if the user exists and the password is correct    *******
    const user = await User.findOne({email}).select('+password');
    console.log(user);    

    // console.log(user.password);

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            message: "Incorrect email and password"
        })  
    }

    // ******* 3. If everything is ok, send token to the client     *******
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});   // V can also define a function which will be used to creating a new token
    res.status(200).json({
        status: "success",
        token  
    })

}





exports.protect = async (req, res, next) => {

    // ============= 1. Getting token and checking if it exists   =============
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1]; 
    }
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            message: "You are not logged in! Please log in to get access."
        })
    }
    
    //  ============= 2. Verifying the token by using JWT algo    =============
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded); 

    //  ============= 3. If the token varification is successfull, then V need to check if the user trying to access the route still exists    =============

    //  ============= 4. Check if the user changed the pass after the token issued   =============
    next();
}











































