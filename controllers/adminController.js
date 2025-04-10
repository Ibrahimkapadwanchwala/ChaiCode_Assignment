const restaurantModel=require('../models/restaurant.model')
async function handleAdminLogin(req,res){
    let{username,password}=req.body;
    if(username===process.env.ADMIN_USERNAME && password===process.env.ADMIN_PASSWORD){
       res.render('admin',{added:false})
    }else{
        res.render('adminLogin',{wrongInfo:true})
    }
}
async function handleCreateRestaurant(req,res){
    let{name,location,cuisine,capacity}=req.body;
    console.log(name,location,cuisine,capacity);
    let addedRestaurant=await restaurantModel.create({
        name,
        location,
        cuisine,
        capacity
    })
    res.render("admin",{added:true})
}
module.exports={handleAdminLogin,handleCreateRestaurant}