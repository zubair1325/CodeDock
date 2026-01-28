import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createRepository = async (req, res) => {};

const getAllRepository = async (req, res) => {};

const fetchRepositoryById = async (req, res) => {};

const fetchRepositoryByName = async (req, res) => {};

const fetchRepositoryForCurrentUser = async (req, res) => {};

const updateRepositoryById = async (req, res) => {};

const toggleVisibilityById = async (req, res) => {};

const deleteRepositoryById = async (req, res) => {};

export {
  createRepository,
  getAllRepository,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
