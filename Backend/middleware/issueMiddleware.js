import mongoose from "mongoose";

import Repository from "../models/repoModel.js";
import Issue from "../models/issueModel.js";

const validateIssueForm = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || title.length == 0) {
    return res.status(404).json({ error: "Title is required" });
  }
  if (!description || description.length == 0) {
    return res.status(404).json({ error: "Description is required" });
  }
  next();
};

const validateMongooseId = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Repository not found!" });
  }
  console.log("middleware working fine");
  next();
};
const isRepositoryExists = async (req, res, next) => {
  const { id } = req.params;
  if (!(await Repository.findById(id))) {
    res.status(404).json({ error: "Repository does not exists" });
  }
  next();
};
const isIssueExists = async (req, res, next) => {
  const { id } = req.params;
  if (!(await Issue.findById(id))) {
    res.status(404).json({ error: "Issue does not exists" });
  }
  next();
};

export {
  validateIssueForm,
  validateMongooseId,
  isRepositoryExists,
  isIssueExists,
};
