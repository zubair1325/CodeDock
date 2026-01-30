import express from "express";
const repoRouter = express.Router();

import wrapAsync from "../utils/wrapAsync.js";
import {
  createRepository,
  getAllRepository,
  fetchRepositoryById,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
} from "../controllers/repoController.js";

import {
  validateRepoForm,
  isRepositoryNameAvailable,
  validateMongooseId,
  isRepositoryExists,
} from "../middleware/createRepoMiddleware.js";

repoRouter.post(
  "/repo/create",
  validateRepoForm,
  isRepositoryNameAvailable,
  wrapAsync(createRepository),
);
repoRouter.get("/repo/all", wrapAsync(getAllRepository));
repoRouter.get(
  "/repo/:id",
  validateMongooseId,
  isRepositoryExists,
  wrapAsync(fetchRepositoryById),
);
repoRouter.get(
  "/repo/user/:userId",
  validateMongooseId,
  isUserAvailable,
  wrapAsync(fetchRepositoryForCurrentUser),
);
repoRouter.put(
  "/repo/update/:id",
  validateMongooseId,
  isRepositoryExists,
  wrapAsync(updateRepositoryById),
);
repoRouter.patch(
  "/repo/toggle/:id",
  validateMongooseId,
  isRepositoryExists,
  wrapAsync(toggleVisibilityById),
);
repoRouter.delete(
  "/repo/delete/:id",
  validateMongooseId,
  isRepositoryExists,
  wrapAsync(deleteRepositoryById),
);

export { repoRouter };
