import express from "express";
const userRouter = express.Router();

import wrapAsync from "../utils/wrapAsync.js";
import {
  singUpFormValidation,
  isUserAvailable,
  loginFormValidation,
  validateMongooseId,
} from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  singUp,
  logIn,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";

userRouter.get("/allUsers", wrapAsync(getAllUsers));
userRouter.post(
  "/singUp",
  singUpFormValidation,
  isUserAvailable,
  wrapAsync(singUp),
);
userRouter.post("/login", loginFormValidation, wrapAsync(logIn));
userRouter.get(
  "/userProfile/:id",
  validateMongooseId,
  wrapAsync(getUserProfile),
);
userRouter.put("/updateProfile/:id", updateUserProfile);
userRouter.delete("/deleteProfile/:id", deleteUserProfile);

export { userRouter };
