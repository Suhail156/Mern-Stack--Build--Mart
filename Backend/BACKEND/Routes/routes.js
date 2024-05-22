import express from 'express'
import { signup,login } from '../Controller/userController.js'
import imageUpload from '../Middlewares/imageUpload/imageUpload.js'
import TrycatchMiddleware from '../Middlewares/tryCatchMiddleware.js'



const router=express.Router()

router.post("/signup",imageUpload,TrycatchMiddleware(signup))
router.post("/login",TrycatchMiddleware(login))

export default router