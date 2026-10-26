import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First name must be atleast 3 Characters"]
        },
        lastName: {
            type: String,
            required: false,
            minLength: [3, "Last name must be atleast 3 Characters"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must be atleast 5 Characters"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, process.env.HASH_COUNT);
}

const userModel = mongoose.model("user", userSchema);

export default userModel;