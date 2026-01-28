import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import ExpressError from "../utils/ExpressError.js";

// while user login check both email address and password, if not exit
const loginFormValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.length == 0) {
    return next(new ExpressError("Email is required", 422));
  } else if (!password || password.length == 0) {
    return next(new ExpressError("Password is required", 422));
  }
  next();
};
//while user creating a new account check if user provide all required information
const singUpFormValidation = (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || username.length == 0) {
    return next(new ExpressError("Username is required", 422));
  } else if (!password || password.length == 0) {
    return next(new ExpressError("Password is required", 422));
  } else if (!email || email.length == 0) {
    return next(new ExpressError("Email is required", 422));
  }
  next();
};
//while creating a new account check weather with the same credentials an account already exists, if yes stop here
const isUserAvailable = async (req, res, next) => {
  const { username, email } = req.body;
  if (username && username.length != 0 && (await User.findOne({ username }))) {
    return next(new ExpressError("Username not available", 409));
  } else if (email && email.length != 0 && (await User.findOne({ email }))) {
    return next(new ExpressError("This email has already an account", 409));
  }
  next();
};

//while visiting any particular account check if the mongoose id length matched and others types
const validateMongooseId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Account not found!" });
  }
  console.log("middleware working fine");
  next();
};
// encrypt user password using bcrypt
const encryptUserPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password && password.length != 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
  }
  next();
};

export {
  isUserAvailable,
  singUpFormValidation,
  loginFormValidation,
  validateMongooseId,
  encryptUserPassword,
};
