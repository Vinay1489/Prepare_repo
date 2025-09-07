import mongoose from "mongoose";

const expenseSchema=new mongoose.Schema({
    title:
    {
        type:String,
        required:true,
    },
    amount:
    {
        type:String,
        required:true
    },
    category:
    {
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:
    {
        type:Date,
        default:Date.now,
    }
})

export default mongoose.model("Expense",expenseSchema);

