import mongoose from "mongoose";

import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";

const validateRepoForm = (req, res, next) => {
  const { name, owner } = req.body;
  if (!name || name.length == 0) {
    return res.status(404).json({ error: "Repository name is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(404).json({ error: "Invalid User Information!" });
  }
  next();
};

const isRepositoryNameAvailable = async (req, res, next) => {
  const { name, owner } = req.body;
  const repo = await Repository.exists({
    name,
    owner,
  });
  if (repo) {
    return res.status(404).json({ error: "Repository  name already exists" });
  }
  next();
};

const validateMongooseId = async (req, res, next) => {
  const { id } = req.params;
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !(await Repository.findById(id))
  ) {
    return res.status(404).json({ error: "Repository not found!" });
  }
  console.log("middleware working fine");
  next();
};

const isUserAvailable = async (req, res, next) => {
  const userId = req.user;
  if (!(await User.findById(userId))) {
    res.json({ error: "User not Found!" });
  }
  next();
};

const isRepositoryExists = async (req, res, next) => {
  const { id } = req.params;
  if (!(await Repository.findById(id))) {
    res.status(404).json({ error: "Repository does not exists" });
  }
};

export {
  validateRepoForm,
  isRepositoryNameAvailable,
  validateMongooseId,
  isUserAvailable,
  isRepositoryExists,
};
