import userjoi from "../Validation/joivalidation.js";
import User from "../Models/userSchema.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
 
    const { value, error } = userjoi.validate(req.body);

    if (error) {
      return res.status(400).json({status: "error"});
    }

    const { username, image, email, password } = value;
    // console.log(value);

    // Check username already exists
    const existingUser = await User.findOne({ email:email });
    if (existingUser) {
    return res.status(400).json({
     status: "error",message: "email already taken!"});
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      image:image,
      email: email,
      password: hashedPassword,
    });

    // Save new user to database
    await newUser.save();

    return res.status(201).json({ status: "success",message: "User registered successfully",
      data:newUser
    });
};

//user login
export const login=async(req,res)=>{
  
    const{email,password}=req.body
    // console.log(req.body);
    //find user
    const uservalid=await User.findOne({email})
    // console.log(uservalid);
    if(!uservalid) {
     return res.status(404).json({error:"user not found"})
    }
  //password checking
   const validpass=bcrypt.compareSync(password,uservalid.password)
  //  console.log(validpass);
   if(!validpass){
   return res.status(401).json({error:"Wrong credential"})
   }
   //jwt
   const token=Jwt.sign({id:uservalid._id},process.env.USER_SECRET_TOKEN,{expiresIn:"25m"})
   const{password:hashedPassword, ...rest}=uservalid._doc
  //  const expirydate=new Date(Date.now() +60 * 20)
  const refreshToken=Jwt.sign({id:uservalid._id},process.env.REFRESH_ACCESS_TOKEN)
   //cookie
   res.cookie("access_token",token,{httpOnly:true})
   res.cookie("refresh_token",refreshToken,{httpOnly:true})  
   return res.status(200).json({ message: "successfully login", data: rest });
}