import express from "express";
const repoRouter = express.Router();
import {
  createRepository,
  getAllRepository,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
} from "../controllers/repoController.js";

repoRouter.post("/repo/create", createRepository);
repoRouter.get("/repo/all", getAllRepository);
repoRouter.get("/repo/:id", fetchRepositoryById);
repoRouter.get("/repo/:name", fetchRepositoryByName);
repoRouter.get("/repo/:userId", fetchRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id", updateRepositoryById);
repoRouter.patch("/repo/toggle/:id", toggleVisibilityById);
repoRouter.delete("/repo/delete/:id", deleteRepositoryById);

export { repoRouter };
