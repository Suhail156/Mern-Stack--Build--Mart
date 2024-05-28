import Cart from "../Models/cartSchema.js";
import Products from "../Models/productSchema.js";
import User from "../Models/userSchema.js";



 // product addToCart
export const addToCart = async (req, res) => {

    const userId = req.params.userid;
    const productId = req.params.productid;
       console.log(userId);
       console.log(productId);
    // Find user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find product by id
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // already existing
    let cartItem = await Cart.findOne({ userId: user._id, productId: product._id });
    if (cartItem) {
      //increment
      cartItem.quantity++;
      await cartItem.save();
      return res.status(200).json({ message: "Product incremented in the cart" ,data:cartItem});
    } else {
      // new cart
      cartItem = await Cart.create({
        userId: user._id,
        productId: product._id,
        quantity: 1
      });
      // add to cart array
      user.cart.push(cartItem._id);
      await user.save();
      return res.status(200).json({ message: "Product added to the cart",data:cartItem });
    }
 
};

// view cart

export const viewCart=async(req,res,next)=>{
    
        const{id}=req.params
        const user=await User.findById(id)
        .populate({
            path:"cart",
            populate:{path:"productId"}
        })
        if(!user){
         return   res.status(404).json({meassage:"user not found"})
        }
          return res.status(200).json(user.cart)
    
}


// add cart quantity

export const addCartQuantity=async(req,res,next)=>{
  
        const userId=req.params.userid
        const productId=req.params.productid
        // const{quantityIncrement}=req.body

        //find user by id
        const user=await User.findById(userId)
        console.log(user);
        if(!user){
         return  res.status(404).json({message:"user not found"})
        }
        // find product by id
        const product=await Products.findById(productId)
        console.log(product);
        if(!product){
         return res.status(404).json({message:"product not found"})
        }
        //find or create item
        const cartItem =await Cart.findOne({userId:user._id,productId:product._id})
        console.log(cartItem);
        if(cartItem){
          if(product){
            cartItem.quantity ++
            await cartItem.save()
          
          }else{
           return res.status(500).json({ status: "error"}) 
          }
        }
          return res.status(201).json({message:"quantity incremented",data:cartItem})
}

export const decremntQuantity=async(req,res)=>{

    const userId=req.params.userid
    const productId=req.params.productid
    // const{quantityDecrement}=req.body  

    //find user by id
    const user=await User.findById(userId)
    // console.log(user);
    if(!user){
      res.status(404).json({message:"user not found"})
    }
    // find product by id
    const product=await Products.findById(productId)
    console.log(product);
    if(!product){
      return res.status(404).json({message:"product not found"})
    }
    //find or create item
    let cartItem = await Cart.findOne({ userId: user._id, productId: product._id });
    if (cartItem) {
        // If the product already exists, decrement the quantity
        if(!cartItem.quantity>1){
            return res.status(400).json({message: "item not found"})
        }
        cartItem.quantity--;
        await cartItem.save();
        }
        else{
            cartItem.quantity = 1
            await cartItem.save();
        }
   
     return res.status(201).json({ message: "Quantity decremented" });
}

export const removeCart=async(req,res)=>{
  
    const{userId,productId}=req.params

   //find by user
 const user=await User.findById(userId)
 console.log(userId);
 if(!user){
   return res.status(404).json({message:"user not found"})
 }

 //find by product
 const product=await Products.findById(productId)
 if(!product){
   return res.status(404).json({message:"product not found"})
 }
 const cartItem=await Cart.findOneAndDelete({userId:user._id,productId:product._id})
  if(!cartItem){
    return res.status(404).json({message:"product not found in the user cart"})
  }
  //ind the index of the cart item in the user's cartItems array
  const cartItemIndex=user.cart.findIndex(item=>item.equals(cartItem._id))

   //cart item found,remove from cartitems array

   if(cartItemIndex !== -1){
    user.cart.splice(cartItemIndex,1)
    await user.save()
    return res.status(200).json({message:"product removed successfully",data:cartItem})
   }
   
}