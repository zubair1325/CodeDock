import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createIssue = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params; //repository id it is
  const newIssue = new Issue({
    title,
    description,
    repository: id,
  });

  const finalData = await newIssue.save();
  res.status(201).json({ message: "New issue created", finalData });
};

const updateIssueById = async (req, res) => {
  const { id } = req.params; //issue id it is
  const { title, description, status } = req.body;
  const issueData = await Issue.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true, runValidators: true },
  );
  res.json({ message: "Issue Updated", issueData });
};

const deleteIssueById = async (req, res) => {
  const { id } = req.params; //issue id it is
  const issue = await Issue.findByIdAndDelete(id);
  res.json({ message: "Issue deleted successfully", issue });
};

const getAllIssue = async (req, res) => {
  const { id } = req.params; //Repository id it is
  const allIssues = await Issue.find({ repository: id });
  if (!allIssues || allIssues.length == 0) {
    return res.status(404).json({ message: "Now Issue for this Repository" });
  }
  res.json(allIssues);
};

const getIssueById = async (req, res) => {
  const { id } = req.params; //issue id it is
  const issue = Issue.findById(id);
  if (!issue) {
    return res.status(404).json({ message: " Issue not found" });
  }
  res.json(issue);
};

export {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssue,
  getIssueById,
};
