const express=require('express');
const staticRouter=express.Router();
const{handleGetReservations}=require('../controllers/staticController')
staticRouter.get('/',(req,res)=>{
    res.render('home',{message:null});
})
staticRouter.get('/reservations',handleGetReservations)

module.exports=staticRouter;