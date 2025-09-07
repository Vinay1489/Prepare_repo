import { Router } from "express";
import Expense from "../modules/Expense.js";
import { authMiddleware } from "../middlewares/auth.js";
const router=Router();

router.post("/create",authMiddleware,async(req,res)=>
{
    try{
        const expense=new Expense({...req.body,userId:req.user.id});
    await expense.save();
    res.status(200).json({
        Message:"Success",
        expense,
    })
    }
    catch(err)
    {
        res.status(400).json({
            error:err.message
        })
    }
})

router.get("/",authMiddleware,async(req,res)=>
{
    try{
        const expenses=await Expense.find({userId:req.user.id});
        res.status(200).json({
            Results:expenses.length,
            expenses
        })
    }
    catch(err)
    {
        res.status(400).json({
            error:err.message
        })
    }
})

router.put("/update/:id",authMiddleware,async(req,res)=>
{
   try{
     const expense=await Expense.findOneAndUpdate({_id:req.params.id,userId:req.user.id},req.body,{new:true});
    if(!expense) res.status(400).json({
        error:"No expense found with this id",
    })
    res.status(200).json({
        expense,
    })
   }
   catch(err)
   {
    res.status(400).json({
        error:err.message
    })
   }
})

router.delete("/delete/:id",authMiddleware,async(req,res)=>
{
   try{
     const expense=await Expense.findOneAndDelete({_id:req.params.id,userId:req.user.id});
    res.json(
        {
            Message:"Deleted Expense",
        }
    )
   }
   catch(err)
   {
    res.status(400).json({
        error:err.message
    })
   }
})

export default router;