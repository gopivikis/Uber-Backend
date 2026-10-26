import mongoose from "mongoose";

const blackListedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true
    },
    createdTime: {
        type: Date,
        default: new Date(),
        expires: process.env.TOKEN_EXPIRY_MS
    }
});

const blackListedModel = mongoose.model("blackListToken", blackListedTokenSchema)

export default blackListedModel;