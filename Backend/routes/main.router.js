import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { userRouter } from "./user.router.js";
import { repoRouter } from "./repo.router.js";
import { issueRouter } from "./issue.router.js";

const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);

export { mainRouter };
