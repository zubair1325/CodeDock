import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


import User from "../models/userModel.js";
import ExpressError from "../utils/ExpressError.js";

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
};

const singUp = async (req, res) => {
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    repositories: [],
    followedUsers: [],
    starRepos: [],
  });
  const user = await newUser.save();
  console.log(user);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Account not found!" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({ message: "Wrong Password!" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
};

const getUserProfile = async (req, res) => {
  const currUser = await User.findById({ _id: id });
  if (!currUser) {
    return res.status(404).json({ message: "Account not found!" });
  }
  res.json({ currUser });
};

const updateUserProfile = (req, res) => {};

const deleteUserProfile = (req, res) => {};

export {
  getAllUsers,
  singUp,
  logIn,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
