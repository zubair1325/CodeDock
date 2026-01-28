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
  const newUser = new User({
    username,
    email,
    password,
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
  const { id } = req.params;
  const currUser = await User.findById({ _id: id });
  if (!currUser) {
    return res.status(404).json({ message: "Account not found!" });
  }
  res.json(currUser);
};

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  let updateFields = { email };
  if (password) {
    updateFields.password = password;
  }
  const result = await User.findByIdAndUpdate(id, updateFields);
  res.json(result);
};

const deleteUserProfile = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const currUser = await User.findById({ _id: id });
  if (!currUser) {
    return res.status(404).json({ message: "Account not Found" });
  }
  const isMatch = await bcrypt.compare(password, currUser.password);
  if (currUser.email == email && isMatch) {
    const deleteUser = await User.findByIdAndDelete(id);
    console.log(deleteUser);
    return res.json({ message: "Account deleted successfully" });
  }
  res.status(404).json({ message: "Provide valid credentials!" });
};

export {
  getAllUsers,
  singUp,
  logIn,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
