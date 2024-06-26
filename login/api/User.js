const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('./../models/User');

router.post('/signup', (req,res) =>{
    let { name, email, password } = req.body;
    name = name.trim(); // .trim() removes whitespace
    email = email.trim();
    password = password.trim();

    if(name == " " || email == "" || password == ""){// chceking for empty fields
        res.json({
            status: "FAILED",
            message: "Input field is empty!"
        });
    }else if(!/^[a-zA-Z ]*$/.test(name)){//validates username
        res.json({
            status: "FAILED",
            message: "Invalid name entry!"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){//validates email address input
        res.json({
            status: "FAILED",
            message: "Invalid email entry!"
        })
    }else if (password.length < 8){//validates password length
        res.json({
            status: "FAILED",
            message: "Password needs a minimum of 8 characters!"
        })
    }else {
        User.find({ email }).then(result =>{
            if(result.length){
                res.json({
                    status: "FAILED",
                    message: "Invalid email, email already exists!"
                })
            }else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword =>{
                    const newUser = new User({
                        name, 
                        email,
                        password: hashedPassword
                    });
                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "Signup successful!",
                            data: result,
                        })
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occured while trying to save user!"
                        })
                    })
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Error occured while trying to hash password!"
                    })
                })
            }
        }).catch(err =>{
            console.log(err)
            res.json({
                status: "FAILED",
                message: "Error occured while checking for user!"
            })
        })
    }
})
router.post('/signin', (req,res) =>{
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if(email =="" || password == ""){
        res.json({
            status: "FAILED",
            message:"No entry provided!"
        })
    }else {
        User.find({email})
        .then(data => {
            if (data.length){
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result){
                        res.json({//Checks if password matches saved user password
                            status: "SUCCESS",
                            message: "Signed in successfully!",
                            data: data
                        })
                    }else {
                        res.json({
                            status: "FAILED",
                            message: "Incorrect password"
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Error occured while validating password"
                    })
                })
            }else {
                res.json({
                    status: "FAILED",
                    message: "invalid credentials"
                })
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "Error occured while checking for existing user"
            })
        })
    }
})

module.exports =router;