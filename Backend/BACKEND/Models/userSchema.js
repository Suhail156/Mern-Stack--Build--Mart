import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true 
    },
    image:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    accountCreatedDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wishlist"
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Orders"
    }]
})

const User=mongoose.model("User",userSchema)
export default User