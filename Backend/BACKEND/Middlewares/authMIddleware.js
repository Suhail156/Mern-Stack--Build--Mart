import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const verifytoken = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        console.log(token ,"ffff");
        if (!token) {
            return res.status(404).json({ error: "User not found" });
        }

        Jwt.verify(token, process.env.USER_SECRET_TOKEN, (err, decoded) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    console.log(err.message);
                    const refreshToken = req.headers['refresh_token'];
                    if (!refreshToken) {
                        return res.status(401).json('Refresh token is required');
                    }
                
                    Jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, decoded) => {
                        if (err) {
                            return res.status(404).json({ message: "Invalid refresh token" });
                        }

                        // Assuming uservalid is defined and represents the user data
                        const newToken = Jwt.sign({ id: decoded.id }, process.env.USER_SECRET_TOKEN, { expiresIn: "10m" });
                        res.cookie("authorization", newToken);
                        req.id = decoded.id;
                        return next();
                    });
                } else {
                    return res.status(404).json({ error: "Unauthorized" });
                }
            } else {
                req.id = decoded.id;
                next();
            }
        });
    } catch (error) {
        return next(error);
    }
};























// import Jwt from "jsonwebtoken";
// import dotenv from 'dotenv'
  
// dotenv.config()
// export const verifytoken=(req,res,next)=>{
//     try {
//         const token=req.headers["authorization"]
//     if(!token){
//         res.status(404).json({error:"user not found"})
//     }
//     Jwt.verify(token,process.env.USER_SECRET_TOKEN,(err,decoded)=>{
//         if(err){
//             if(err.message==='jwt expired'){
//                 const refreshToken = req.headers['refresh_token']
//               console.log("hii",token);
//             if(!refreshToken){
//                 return res.status(401).json('Refresh token is required')
//               }
//               Jwt.verify(refreshToken,process.env.REFRESH_ACCESS_TOKEN,(err,decoded)=>{
//                 if(err){
//                 res.status(404).json({message:"invalid refresh token"})
//                 }
//                 const refreshToken=Jwt.sign({id:uservalid._id},process.env.REFRESH_ACCESS_TOKEN,{expiresIn:"10m"})
//                 req.email=decoded.email
//                  res.cookies("authorization",refreshToken)
//                  next()
//                  return
//               })
//             }
//             res.status(404).json({error:"unauthorized"})
//         }
//         req.email=decoded.email
//         next()
//     })
//     } catch (error) {
//       return next(error)  
//     } 
// }