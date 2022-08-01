
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 8, 
        select: false     
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please provide a password"],
        validate: {
            validator: function(el) {  // here V can't use arrow function bcoz V need the "this" keyword, as this function will be executed on the object which will initiate this function
                return el === this.password
            },
            message: "Passwords are not the same"
        }
    }
})



/*
Encrypting the passwords
*/
userSchema.pre('save', async function(next) {

   if (!this.isModified('password')) return next();  

   this.password = await bcrypt.hash(this.password, 12);
   this.passwordConfirm = undefined;

   next();
 
})

// Verifying the password entered by the user and present in the DB
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}


const User = mongoose.model("User", userSchema);

module.exports = User;











































