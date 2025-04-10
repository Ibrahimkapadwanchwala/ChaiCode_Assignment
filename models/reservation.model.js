const mongoose=require('mongoose');
const reservationSchema=mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restaurant',
        required:true

    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer',
        required:true
        
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
        
    }
})
const reservationModel=mongoose.model('reservation',reservationSchema)
module.exports=reservationModel;