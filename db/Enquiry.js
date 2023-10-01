const mongoose=require("mongoose")


const enquirySchema = mongoose.Schema({
   name:String,
   email:String,
   phone:String,
   message:String
})

module.exports=mongoose.model("enquiry",enquirySchema)
