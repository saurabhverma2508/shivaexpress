const mongoose = require("mongoose")

const addTrackingSchema= new mongoose.Schema({
    trackingid:{type:String,unique:true},
    description:String
},
{
    collection:"trackings"
}
)


module.exports=mongoose.model("trackings",addTrackingSchema)
