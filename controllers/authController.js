const express = require("express");
const User = require("../models/User");
require("dotenv").config();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxe15a11fda9ff4607a824ecd67ec307ae.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN})


// const {ApiError, ApiSuccess} = require('../util/errorHandler');

// console.log(process.env);

/**
 *
 * @param {*} id
 */

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname, role } = req.body;
    const emailExist = await User.findOne({ email: email });
    if (!email || !password || !firstname || !lastname) {
      return next(new Error("please fill all fields"));
    }
    if (emailExist) {
      return next(`${email} exist`);
    }
    if (password.length < 6 || password.length > 12) {
      return next(
        new Error(
          "Passowrd should not be less than 6 character or greater than than 12"
        )
      );
    }
    // const hashPassword =await bcryptjs.hash(password, 10);

    // const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password,
      firstname,
      lastname,
      role,
    });
    await user.save();
    user.password = undefined;
} catch (error) {
    return next(new Error(error));
}
};

// exports.getAllUser = async(req, res, next)=>{
    //     try {
//         const allUser = await User.find();
//         res.status(200).json({
    //             status: 'success',
    //             allUser
    //         })
    //     } catch (error) {
        //         return next(new Error(error))
//     }
// }

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const checkingUser = await User.findOne({ email: email });
        const passWord = await User.findOne({passowrd: password})
        // const comparePassword = await bcryptjs.compare(password, checkingUser.password )
        if (!password || !email) {
            return next(new Error("Please fill all fields"));
        }
        if (!checkingUser) {
            return next(new Error("User does not exist"));
        }
        if (!passWord) {
            return next(new Error("Incorrect credentials"));
        }   
        let token = signToken(checkingUser._id);
        console.log(token);
        res.status(200).json({
          status: "success",
          data: checkingUser,
          token,
        });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.authorization = async (req, res, next) => {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
  
      if (!token) {
        return res.status(400).json({
            status: false,
            message: "please login to view this resource"
        })
      }
  
      let decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await User.findById({ _id: decoded.id });
  
      if (!currentUser) {
        return next(new Error("user does not exist"));
      }
  
      req.user = currentUser;
      return next();
    } catch (error) {
      return res.status(400).json({
          status: false,
          message: ""
      })
    }
  };


  // exports.forgotPassword = async(req, res, next)=>{
  //     try {
  //       const {email} = req.body;
  //       // emailChecking = await User.findOne({email: email});
  //       const user = await User.findOne({email: email});
  //       if(!user) {
  //         return res.status(400).json({
  //           error: 'User with this email already exist'
  //         })
  //       }

  //       const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '2m'});
  //       const data = {
  //         from: "davidsonjos43@gmail.com",
  //         to: email,
  //         subject: 'Reset password link',
  //         html: `
  //               <h2>Please click on this given link to reset your password</h2>
  //               <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>

  //         ` 
  //       }
  //       return user.updateOne({resetLink: token}, function(err, success) {
  //         if (err) {
  //           return res.status(400).json({error: "reset password link error"});
  //         }else{
  //           mg.messages().send(data, function (error, body) {
  //             return res.json({message: "Email has been sent, kindly follow the instructions"})
  //           });
  //         }
  //       })
  //     } catch (error) {
  //       return next(new Error(error));
  //     }
  // }
  exports.forgotPassword = (req, res, next)=>{
    const {email} = req.body;

    User.findOne({email}, (err, user) =>{
      if (err || !user) {
        return res.status(400).json({error: "User with this email does not exists."});
      }

      const token =jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '2m'});
      const data = {
        from: 'davidsonjosee313@gmail.com',
        to: email,
        subject: 'Reset Password Link',
        html: `
            <h2>Please click on this given link to reset your password</h2>
            <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
        `
      };
      return user.updateOne({resetLink: token}, function(err, success){
        if (err) {
          return res.status(400).json({error: 'reset password link error'});
        }
        else{
          mg.messages().send(data, function (error, body) {
            if(error){
              return res.json({
                error: "Invalid request"
              })
            }
            return res.json({message: "Email has already been sent, kindly follow the instructions"})
          });
        }
      })
    })
  }