import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log("Connected to Mongo Db");
    }).catch((err) => { 
        console.log("Error connecting to db: ", err); 
    })
}

export default connectToDb;