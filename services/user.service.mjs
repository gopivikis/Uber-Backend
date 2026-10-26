import userModel from "../models/user.model.mjs";

async function createUser({
    firstName, lastName, email, password
}) {
    if(!firstName || !email || !password) {
        throw new Error("All fields are required.");
    }

    const user = userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    });

    return user;
}

const userService = { createUser }

export default userService;