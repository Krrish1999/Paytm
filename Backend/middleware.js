const JWT_SECRET = require('./config');
const jwt = require('jsonwebtoken');


function authMiddleware(req,res,next){
    const authHeader= req.headers.authorization;
    console.log("authHeader",authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({message:" Auth header Unauthorized"})   
    }

    const token = authHeader.split(" ")[1];
    console.log("token",token)

        console.log("JWT_SECRET",JWT_SECRET.JWT_SECRET)
        const decoded = jwt.verify(token,JWT_SECRET.JWT_SECRET);
        console.log("decode",decoded)
        console.log("userId", decoded.userId)// Verifying the token, decoded will contain the decoded token

      if(decoded.userId){
        req.userId = decoded.userId; // Adding the userId to the request object

        next();
       }else{
        return res.status(403).json({message:"Unauthorized"})
       
       }

   
};

module.exports= {authMiddleware};  // Exporting the middleware