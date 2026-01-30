import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createRepository = async (req, res) => {
  const { owner, name, issues, content, description, visibility } = req.body;
  const newRepository = new Repository({
    name,
    description,
    content,
    visibility,
    owner,
    issues,
  });

  const result = await newRepository.save();
  res
    .status(201)
    .json({ message: "New Repository created", repositoryId: result.id });
};

const getAllRepository = async (req, res) => {
  const allRepository = await Repository.find({})
    .populate("owner")
    .populate("issues");
  res.json(allRepository);
};

const fetchRepositoryById = async (req, res) => {
  const { id } = req.params;
  const repository = await Repository.findById(id)
    .populate("owner")
    .populate("issues");
  res.json(repository);
};

const fetchRepositoryForCurrentUser = async (req, res) => {
  const userId = req.user;
  const repository = await Repository.findOne({ owner: userId });
  if (!repository || repository.length == 0) {
    return res.status(404).json({ error: "No repository found!" });
  }
  res.json({ message: "Repository found!", repository });
};

const updateRepositoryById = async (req, res) => {
  const { id } = req.params;
  const { content, description } = req.body;
  const updatedRepo = await Repository.findByIdAndUpdate(
    id,
    {
      content,
      description,
    },
    { new: true, runValidators: true },
  );
  res.json(updatedRepo);
};

const toggleVisibilityById = async (req, res) => {
  const { id } = req.params;
  const updateVisibility = await Repository.findByIdAndUpdate(
    id,
    [{ $set: { visibility: { $not: "$visibility" } } }],
    { new: true },
  );
  res.json({ message: "Visibility Changes", updateVisibility });
};

const deleteRepositoryById = async (req, res) => {
  const { id } = req.params;
  const repository = await findByIdAndDelete(id);
  res.json({ message: "Repository deleted successfully", updateVisibility });
};

export {
  createRepository,
  getAllRepository,
  fetchRepositoryById,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
