import mongoose from "mongoose";

const wishlistSchema=new  mongoose.Schema({
    userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true},

   productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
    quantity:{
        type:Number,
        default:1
    }
})
const Wishlist=mongoose.model("Wishlist",wishlistSchema)
export default Wishlist