import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.mjs";
import blackListedModel from "../models/blacklistedToken.model.mjs";

const authMiddleware = { authUser };

export default authMiddleware;

async function authUser(req, res, next) {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: "Unauthorized." });
    }
    
    const blackListed = await blackListedModel.findOne({token});

    if(blackListed) {
        return res.status(401).json({ message: "Unauthorized." });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode._id);

        req.user = user;

        return next();
    } catch(err) {
        return res.status(401).json({ message: "Unauthorized." });
    }
}