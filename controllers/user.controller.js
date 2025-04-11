const customerModel = require("../models/customer.model");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const restaurantModel=require('../models/restaurant.model')
async function handleCreateCustomer(req, res) {
  let { username, email, password } = req.body;

  let user = await customerModel.findOne({ email });

  if (user) {
    console.log("User already exists");
    res.render("home", { message: "User already exists " });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdCustomer = await customerModel.create({
          username,
          email,
          password: hash,
        });
        let token=jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
        res.cookie('token',token)
        res.render("restaurants",{reservationSucessfull:false,restaurants:false});
      });
    });
  }
}
async function handleLoginCustomer(req,res){
  let{email,password}=req.body;

let user=await customerModel.findOne({email});
if(user){
  bcrypt.compare(password,user.password,async (err,result)=>{
    if(result){
      let token=jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
          res.cookie('token',token)
          let restaurants=await restaurantModel.find();
          
          
          res.render("restaurants",{restaurants,reservationSucessfull:false});
      
    }else{
     res.render('login',{message:"email or password is incorrect",loginFirst:false,userDoesNotExist:false})
    }
    
  })
}else{
  res.render('login',{userDoesNotExist:true,message:null,loginFirst:false})
}

 
}
async function handleLogoutCustomer(req,res){
  res.clearCookie('token');
  res.redirect('/');
}
module.exports = {
  handleCreateCustomer,
  handleLoginCustomer,
  handleLogoutCustomer
};
