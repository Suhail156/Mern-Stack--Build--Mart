import Products from "../Models/productSchema.js"
import User from "../Models/userSchema.js"
import Wishlist from "../Models/wishlistSchem.js"



export const addToWishlist=async(req,res)=>{

      
        const userId=req.params.userid
        const productId=req.params.productid

        //find by user
        const user=await User.findById(userId)
        console.log(userId);
        if(!user){
          return  res.status(404).json({message:"user not found"})
        }
        //find by id product
        const product=await Products.findById(productId)
        if(!product){
          return   res.status(404).json({message:"product not found"})
        }

    //check already in the whishlist

    let wishListitem=await Wishlist.findOne({userId:user._id,productId:product._id})
    if(wishListitem){
      return  res.status(400).json({message:"already exist in whishlist"})
    }
    //create a new whishlist
   wishListitem=await Wishlist.create({
        userId:user._id,
        productId:product._id,
        quantity:1
    }) 
    console.log(wishListitem);
    //product add whishlist
    user.wishlist.push(wishListitem._id)
     await user.save()
  
     return  res.status(200).json({message:"successfully added to wishlist"})
       

}   
// view user wishlist
 export const viewWishlist=async(req,res,next)=>{
        const{id}=req.params
        const user=await User.findById(id).populate({
          path:"wishlist",
          populate:{path:"productId"}
        })
             if(!user){
               return  res.status(404).json({message:"user not found"})
             }
            if(!user.wishlist||user.wishlist.length===0){
              return res.status(200).json({message:"user empty",data:[]})
            } 
             return res.status(200).json({message:"success",data:user.wishlist})   
 
 }

export const removewishlist=async(req,res)=>{
    const userId=req.params.userid
    const productId=req.params.productid

    //find user id
    const user=await User.findById(userId)
    if(!user){
     return   res.status(404).json({message:"user not found"})
    }
    //find product id
    const product=await Products.findById(productId)
    if(!product){
       return res.status(404).json({message:"product not found"})
    }
  
     const wishlistItem=await Wishlist.findOneAndDelete({userId:user._id,productId:product._id})
     if(!wishlistItem){
       return res.status(404).json({message:"product not found in wishlist"})
     }
     const wishlistItemIndex= user.wishlist.find(item=>item.equals(wishlistItem._id)) 
    if(wishlistItem !==-1){
        user.wishlist.splice(wishlistItemIndex,1)
        await user.save()
      return  res.status(200).json({message:"successfully removed"})
    }
}