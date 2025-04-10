const express=require('express')
const adminRouter=express.Router();
const isAdmin=require('../middlewares/isAdmin')
const{handleAdminLogin,handleCreateRestaurant,handleAdminLogout}=require('../controllers/adminController')
adminRouter.get('/login',(req,res)=>{
    res.render('adminLogin',{wrongInfo:false})
})
adminRouter.post('/login',handleAdminLogin);
adminRouter.get('/addRestaurant',(req,res)=>{
    
    res.render('addRestaurant')
})
adminRouter.post("/logout",handleAdminLogout)
adminRouter.post('/addRestaurant',handleCreateRestaurant)
module.exports=adminRouter;