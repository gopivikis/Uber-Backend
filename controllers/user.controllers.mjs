import userModel from "../models/user.model.mjs";
import userService from "../services/user.service.mjs";
import { validationResult } from "express-validator";

const userController = { registerUser, loginUser, getUserProfile, logoutUser };

async function registerUser(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if(existingUser) {
        return res.status(401).json({ message: "User already exists." });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    return res.status(201).json({ token, user });
}

async function loginUser(req, res, nxt) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if(!user) {
        return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    return res.status(201).json({ token, user, message: "Logged in successfully." });
}

async function getUserProfile(req, res, next) {
    const { email } = req.user;

    if(!email) {
        return res.status(401).json({ message: "No user found." })
    }

    const user = await userModel.findOne({ email });

    if(!user) {
        return res.status(200).json({ user });
    }

    return res.status(200).json({ user });
}

async function logoutUser(req, res, next) {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out." });
}

export default userController;