const reservationModel=require('../models/reservation.model')
const customerModel=require('../models/customer.model')
const jwt=require('jsonwebtoken')
async function handleGetReservations(req,res){
    let token=req.cookies.token;
    let decode=jwt.verify(token,process.env.JWT_SECRET);
    let user=await customerModel.findOne({email:decode.email});
    let reservations=await reservationModel.find({customerId:user._id})
                            .populate("restaurantId");
    
   
    res.render("reservations",{reservations})
    
}
module.exports={handleGetReservations}