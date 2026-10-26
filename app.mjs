import express from 'express';
import cors from 'cors';
import connectToDb from './db/db.mjs';
import userRouter from './routes/user.routes.mjs';
import cookieParses from "cookie-parser";

const app = express();

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParses());

app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send({
        message: "Server health check !!!"
    });
});

export default app;