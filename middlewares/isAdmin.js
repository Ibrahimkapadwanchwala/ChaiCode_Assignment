const jwt=require('jsonwebtoken')
const customerModel=require('../models/customer.model')

async function isAdmin(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.render('login',{loginFirst:true,message:null,userDoesNotExist:false})
    }
    try {
        let decode=jwt.verify(token,process.env.JWT_SECRET)
        let user=await customerModel.findOne({email:decode.email});
        if(user.role==='admin' && user){
            req.user=user;
            next();
        }else{
            res.status(403).send("Admin access only");
        }
        console.log(user);
    } catch (error) {
        res.status(400).send("Invalid token")
    }
}
module.exports=isAdmin;