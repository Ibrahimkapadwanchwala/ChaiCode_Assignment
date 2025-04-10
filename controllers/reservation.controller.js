const reservationModel=require('../models/reservation.model')
const customerModel=require('../models/customer.model')
const restaurantModel=require('../models/restaurant.model')
const jwt=require('jsonwebtoken')
const {sendConfirmationEmail,sendCancellationEmail}=require('../utils/mailer')
async function handleBookRestaurant(req,res){
    let{time,date}=req.body;
    let restaurantId=req.params.id;
    let token=req.cookies.token;
    let decode=jwt.verify(token,process.env.JWT_SECRET);
    let user=await customerModel.findOne({email:decode.email})
    let reservation=await reservationModel.create({
        restaurantId,
        customerId:user._id,
        date,
        time
    })
    
    let restaurants=await restaurantModel.find();
    let bookedRestaurant=await restaurantModel.findOne({_id:restaurantId});
    await sendConfirmationEmail(user.email, {
        restaurantName: bookedRestaurant.name,
        date,
        time,
       
      });
    
    
res.render("restaurants",{reservationSucessfull:true,restaurants})
}
async function handleDeleteReservations(req,res){
    let id=req.params.id

    let reservation=await reservationModel.findOneAndDelete({_id:id})
    let restaurantId=reservation.restaurantId
    let restaurant=await restaurantModel.findOne({_id:restaurantId});
    let token=req.cookies.token;
    let decode=jwt.verify(token,process.env.JWT_SECRET);
    let user=await customerModel.findOne({email:decode.email})
    await sendCancellationEmail(user.email, {
        restaurantName: restaurant.name,
       
      });
    res.redirect("/reservations")
}
async function handleGetRestaurants(req,res){
    let restaurants=await restaurantModel.find();
    

res.render("restaurants",{reservationSucessfull:false,restaurants})
}
module.exports={handleBookRestaurant,handleDeleteReservations,handleGetRestaurants}