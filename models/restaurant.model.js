const mongoose=require('mongoose');
const restaurantSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true,
        min:1
    }
},{timestamps:true});
const restaurantModel=mongoose.model("restaurant",restaurantSchema);
module.exports=restaurantModel;