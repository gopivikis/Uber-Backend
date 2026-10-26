import express from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controllers.mjs";
import authMiddleware from "../middleware/auth.middleware.mjs";

const userRouter = express.Router();

userRouter.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be atleast 3 characters."),
    body("password").isLength({ min: 6 }).withMessage("Password must be min 6 characters long.")
], userController.registerUser);

userRouter.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be min 6 characters long.")
], userController.loginUser);

userRouter.get("/profile", authMiddleware.authUser, userController.getUserProfile);

userRouter.get("/logout", authMiddleware.authUser, userController.logoutUser);

export default userRouter;