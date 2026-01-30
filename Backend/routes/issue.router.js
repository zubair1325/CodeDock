import express from "express";
const issueRouter = express.Router();

import wrapAsync from "../utils/wrapAsync.js";
import {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssue,
  getIssueById,
} from "../controllers/issueController.js";
import {
  validateIssueForm,
  validateMongooseId,
  isRepositoryExists,
  isIssueExists,
} from "../middleware/issueMiddleware.js";

issueRouter.post(
  "/issue/create",
  validateIssueForm,
  validateMongooseId,
  isRepositoryExists,
  wrapAsync(createIssue),
);
issueRouter.put(
  "/issue/update/:id",
  validateIssueForm,
  validateMongooseId,
  isIssueExists,
  wrapAsync(updateIssueById),
);
issueRouter.delete(
  "/issue/delete/:id",
  validateMongooseId,
  isIssueExists,
  wrapAsync(deleteIssueById),
);
issueRouter.get(
  "/issue/all",
  validateMongooseId,
  isRepositoryExists,
  wrapAsync(getAllIssue),
);
issueRouter.get("/issue/:id", validateMongooseId, wrapAsync(getIssueById));

export { issueRouter };
