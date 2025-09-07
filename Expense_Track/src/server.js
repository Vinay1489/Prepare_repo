import express from "express";

import dotenv from "dotenv";

import morgan from "morgan";

import rateLimit from 'express-rate-limit';

import cors from "cors";

import { connectDB } from "./db.js";

import authRouter from "./routes/auth.js";
import expenseRouter from "./routes/expense.js";
dotenv.config();

const app=express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use(rateLimit({windowMs:60*1000,max:100}));

app.use("/",authRouter);
app.use("/",expenseRouter);
app.get("/check",(req,res)=>
{
    res.status(200).json({
        Message:"Server is running fine"
    })
})

const PORT=4000;

app.listen(PORT,async (req,res)=>
{
    await connectDB();
    console.log(`App is running on port ${PORT}`);
})

