import express from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import User from "../modules/User.js";
import { Router } from "express";

const router=Router();

router.post("/register",async(req, res)=>
{
    try{
        const{username,password}=req.body;
    const hash=await bcrypt.hash(password,10);
    const user=new User({username,password:hash});
    await user.save();

    res.status(201).json({
        Message:"User registered Successfully"
    })
    }
    catch(err)
    {
        res.status(400).json({
            err:err.message
        })
    }
})

router.post("/login",async(req,res)=>
{
    try{
        const{username,password}=req.body;
        const user=User.findOne({username});
        if(!user) return res.status(404).json({
            Message:"User not found",
        })
        const isMatch=await bcrypt.verify(password,req.user.password);
        if(!isMatch)
            return res.status(400).json({
        Message:"Invalid Password",
        err:err.message
    })

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.json({
        Messgae:"Logged in Successfully",
        token
    })
    }
    catch(err)
    {
        res.status(400).json({
            err:err.message
        })
    }
})

router.get("/users",async(req,res)=>
{
    const users=await User.find();
    res.status(200).json({
        Rsults:users.length,
        users
    })
})

export default router;