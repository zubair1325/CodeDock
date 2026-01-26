import express from "express";
const issueRouter = express.Router();
import {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssue,
  getIssueById,
} from "../controllers/issueController.js";

issueRouter.post("/issue/create", createIssue);
issueRouter.put("/issue/update/:id", updateIssueById);
issueRouter.delete("/issue/delete/:id", deleteIssueById);
issueRouter.get("/issue/all", getAllIssue);
issueRouter.get("/issue/:id", getIssueById);

export { issueRouter };
