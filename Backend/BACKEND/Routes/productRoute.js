import express from 'express'
import {verifytoken } from '../middlewares/authMiddleware.js'
import { productByCategory, productById, viewProduct } from '../Controller/productController.js'
import { addCartQuantity, addToCart, decremntQuantity, removeCart, viewCart } from '../Controller/cartController.js'
import { addToWishlist, removewishlist, viewWishlist } from '../Controller/wishlistController.js'
import { orderDetails, payment, success } from '../Controller/userPaymentController.js'
import TrycatchMiddleware from '../Middlewares/tryCatchMiddleware.js'

const router=express.Router()
//products 
router.use(verifytoken)

router.get("/products",TrycatchMiddleware(viewProduct))
router.get("/products/:id",TrycatchMiddleware(productById))
router.get("/products/category/:categoryname",TrycatchMiddleware(productByCategory))

 //cart 
 router.post("/:userid/cart/:productid",TrycatchMiddleware(addToCart))
 router.get("/:id/cart",TrycatchMiddleware(viewCart))   
 router.patch("/:userid/cart/:productid/increment",TrycatchMiddleware(addCartQuantity))
 router.patch("/:userid/cart/:productid/decrement",TrycatchMiddleware(decremntQuantity))
 router.delete("/:userId/cart/:productId/remove",TrycatchMiddleware(removeCart))
//whishlist
router.post("/:userid/wishlist/:productid",TrycatchMiddleware(addToWishlist))
router.get("/:id/wishlist",TrycatchMiddleware(viewWishlist))
router.delete("/:userid/wishlist/:productid/remove",TrycatchMiddleware(removewishlist))
export default router   

//payment
router.post("/:userid/payment",TrycatchMiddleware(payment))
router.get("/payment/success",TrycatchMiddleware(success))
router.get("/:userid/orderdetails",TrycatchMiddleware(orderDetails))