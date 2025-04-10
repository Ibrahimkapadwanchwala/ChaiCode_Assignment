const express=require('express');
const userRouter=express.Router();
const {handleCreateCustomer,handleLoginCustomer,handleLogoutCustomer}=require('../controllers/user.controller')
userRouter.post('/create',handleCreateCustomer);
userRouter.get('/create',(req,res)=>{
    res.render('home',{message:null})
});
userRouter.get("/login",(req,res)=>{
    res.render('login',{message:null,userDoesNotExist:null,loginFirst:false})
})
userRouter.post('/login',handleLoginCustomer);
userRouter.get('/logout',handleLogoutCustomer)
module.exports=userRouter;