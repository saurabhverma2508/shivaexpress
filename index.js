const express = require("express");
const cors = require("cors");
require("./db/config");
const Login = require("./db/Login");
const Tracking = require("./db/Tracking");
const app = express();
app.use(express.json());
app.use(cors());

// ****Login Api**** //
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await Login.findOne(req.body);
    if (user) {
      res.send({
        userEmail: user.email,
        message: "Api run successfully",
        status_code: 200,
      });
    } else {
      res.send({
        message: "No user found",

        status_code: 300,
      });
    }
  } else {
    res.send({ message: "Something went wrong", status_code: 400 });
  }
});

//******* Add Tracking Api ******//
app.post("/addtracking", async (req, res) => {
  const { trackingid, description } = req.body;
  try {
    const already = await Tracking.findOne({ trackingid });
    if (already) {
      res.send({
        message: "Tracking id is already exist",
        status_code: 300,
      });
    } else {
      await Tracking.create({
        trackingid,
        description,
      });
      res.send({
        result: req.body,

        message: "Api run successfully",
        status_code: 200,
      });
    }
  } catch (error) {
    res.send("error");
  }
});

//******* All Tracking Api ******//
app.get("/alltracking", async (req, res) => {
  try {
    const alldata = await Tracking.find({});
    res.send({
      results: alldata,

      message: "Api run successfully",
      status_code: 200,
    });
  } catch (error) {
    console.log(error);
  }
});

//******* View Tracking Api ******//
app.post("/viewtracking", async (req, res) => {
  try {
    let viewData = await Tracking.findOne(req.body);
    if (viewData) {
      res.send({
        result: [viewData],
        message: "Api run successfully",
        status_code: 200,
      });
    } else {
      res.send({
        result: (viewData = []),
        message: "Data Not Found",
        status_code: 300,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//******* Delete Tracking Api ******//
app.post("/deletetracking", async (req, res) => {
  const { trackingid } = req.body;

  try {
    let getdata = await Tracking.findOne({trackingid})
    if(getdata){
      let deleteddata = await Tracking.deleteOne({ trackingid: trackingid });
      if (deleteddata.body !== "undefined") {
        res.send({
          message: "Data deleted successfully",
          status_code: 200,
        });
        
      } else {
        res.send({
          message: "Data Not Found",
          status_code: 300,
        });
      }
    }else{
      res.send({
        message: "Data Not Found",
        status_code: 300,
      });
    }
    
  } catch (error) {
    console.log(error);
  }
});

//******* Update Tracking Api ******//
// app.put("/updatetracking",async (req,res)=>{
// const {trackingid}=req.body
//   try{
//     let updatedata= await Tracking.findOneAndUpdate({trackingid:req.params.id},{
//       $set:{
//         description:req.body.description
//       }
//     })
//     if(updatedata){
//       res.send({
    
//           message: "Data Updated Successfully",
//           status_code: 200,
  
//       })
//     }
    
 
//   }
// catch(error){
// console.log(error)
// }
// })




app.listen(5000, () => {
  console.log("server started at 5000");
});
