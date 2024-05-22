import User from "../Models/userSchema.js";
import dotenv from "dotenv"
dotenv.config()
import stripe from 'stripe'
import Orders from "../Models/orderSchema.js";
import Cart from "../Models/cartSchema.js"



const stripeInstance = stripe(process.env.STRIPE_SECURITY_KEY);

 let Svalue={}
export const payment = async (req, res) => {
  
    const userId = req.params.userid;
    const user = await User.findById(userId).populate({
      path: "cart",
      populate: { path: "productId" },
    });
    console.log(userId);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const cartProduct=user.cart
    if (cartProduct.length === 0) {
      res.status(200).json({ message: "user cart is empty" });
    }
    let totalAmount = 0;
    let totalQuantity = 0;
  
    const lineItems = cartProduct.map((item) => {
      totalAmount += item.productId.price * item.quantity;
      totalQuantity += item.quantity;
  
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.title,
            description: item.productId.description,
          },
          unit_amount: Math.round(item.productId.price * 100),
        },
        quantity: item.quantity,
      };
  });
  const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://example.com/success", // Replace with actual success URL
      cancel_url: "https://example.com/cancel", // Replace with actual cancel URL
    });
  
    if (!session) {
      return res
        .status(500)
        .json({ message: "Error occurred while creating session" });
    }
  
    Svalue = {
      userId,
      user,
      session,
    };
  
    //  await Cart.findByIdAndDelete(user.cart._id)    
  
  
   return res.status(200).json({
      message: "Stripe payment session created successfully",
      url: session.url,
      totalAmount,
      totalQuantity,
    });
} 

export const success = async (req, res) => {

    const { userId, user, session } = Svalue;

    const cartItems= user.cart

    console.log(cartItems,"jkbekjr");

    const productItems = cartItems.map((item) => item.productId._id.toString());

    const order = await Orders.create({
      userId: userId,
      productId: productItems,
      orderId: session.id,
      paymentId: `demo ${Date.now()}`,
      totalPrice: session.amount_total / 100,
    });

    const orderId = order._id;

    const userUpdate = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { orders: orderId },
        $set: { cart: [] },
      },
      { new: true }
    );

    if (!userUpdate) {
      return res.status(500).json({ message: "Failed to update user data" });
    }

    // Remove all items from user's cart after successful payment
    await Cart.deleteMany({ _id: { $in: cartItems.map(item => item._id) } });

   return res.status(200).json({ message: "Payment successful" });
 
};


export const orderDetails=async(req,res)=>{
  const userId=req.params.userid

  const user=await User.findById(userId).populate({
       path:"orders",
       populate:{path:"productId"}
  })
  if(!user){
    return res.status(404).json({message:"user not found"})
  }
  if(!user.orders||user.orders.length===0){
    return res.status(200).json({message:"user order is empty",data:[]})
  }
    return res.status(200).json(user.orders)
}