import express from 'express'
import { adminUpdateProduct, createProducts, deleteProduct, getByIdProduct, viewProducts} from '../Controller/adminProductController.js'
import imageUpload from '../Middlewares/imageUpload/imageUpload.js'
import { adminLogin, blockUserById, unBlockUserById, userGetById, viewAllusers } from '../Controller/adminController.js'
import { adminToken} from '../Middlewares/adminMiddleware.js'
import { productByCategory } from '../Controller/productController.js'
import TrycatchMiddleware from '../Middlewares/tryCatchMiddleware.js'
import { allOrders, status } from '../Controller/adminOrders.js'

const router=express.Router()
//login
router.post("/login",TrycatchMiddleware(adminLogin))

router.use(adminToken)
//admin
router.get("/viewalluser",TrycatchMiddleware(viewAllusers))
router.get("/users/:id",TrycatchMiddleware(userGetById))
router.delete("/:userId/block",TrycatchMiddleware(blockUserById))
router.delete("/:userId/unblock",TrycatchMiddleware(unBlockUserById))


//product
router.post("/createProducts",imageUpload,TrycatchMiddleware(createProducts))
router.get("/:productid/product",TrycatchMiddleware(getByIdProduct))  
router.get("/:categoryname/products",TrycatchMiddleware(productByCategory))
router.get("/allproducts",TrycatchMiddleware(viewProducts))
router.patch("/:id/update",imageUpload,adminUpdateProduct) 
router.delete("/:productid/delete",TrycatchMiddleware(deleteProduct))

//order
router.get("/allorders",TrycatchMiddleware(allOrders))
router.get("/status",TrycatchMiddleware(status))
export default router